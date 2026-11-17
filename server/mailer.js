// Shared email logic for the contact and order forms.
// Used by the Vercel functions in /api and by the Vite dev middleware.
import nodemailer from 'nodemailer'

const BRAND = 'Assignment Solution'
const MAX_FIELD = 5000

function env(name, fallback = '') {
  return (process.env[name] || fallback).trim()
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function clean(value) {
  return String(value ?? '').slice(0, MAX_FIELD).trim()
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

let transporter
function getTransporter() {
  const user = env('SMTP_USER')
  const pass = env('SMTP_PASS').replace(/\s+/g, '') // Gmail app passwords are shown with spaces
  if (!user || !pass) {
    throw Object.assign(new Error('Email is not configured on the server (SMTP_USER / SMTP_PASS missing).'), {
      status: 500,
    })
  }
  if (!transporter) {
    const host = env('SMTP_HOST', 'smtp.gmail.com')
    const port = Number(env('SMTP_PORT', '465'))
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })
  }
  return transporter
}

function table(rows) {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e4ebf0;color:#4d7089;font-size:13px;width:170px;vertical-align:top">${escapeHtml(k)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e4ebf0;color:#0c1620;font-size:14px;white-space:pre-wrap">${escapeHtml(v)}</td>
        </tr>`,
    )
    .join('')
  return `<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e4ebf0;border-radius:12px;overflow:hidden">${body}</table>`
}

function layout(title, intro, inner) {
  return `<!doctype html><html><body style="margin:0;background:#f3f6f8;font-family:Segoe UI,Arial,sans-serif">
  <div style="max-width:640px;margin:0 auto;padding:28px 16px">
    <div style="background:#0c1620;border-radius:14px 14px 0 0;padding:22px 26px">
      <div style="color:#ccae7f;font-size:12px;letter-spacing:2px;text-transform:uppercase">${BRAND}</div>
      <div style="color:#fff;font-size:20px;font-weight:600;margin-top:6px">${escapeHtml(title)}</div>
    </div>
    <div style="background:#f7f8f7;border-radius:0 0 14px 14px;padding:22px 26px">
      <p style="color:#324859;font-size:14px;line-height:1.6;margin:0 0 18px">${intro}</p>
      ${inner}
    </div>
  </div></body></html>`
}

function textVersion(rows) {
  return rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
}

function validateCommon(data) {
  if (clean(data.website)) {
    // Honeypot filled in: silently accept so bots learn nothing.
    return { spam: true }
  }
  const name = clean(data.name)
  const email = clean(data.email)
  if (!name) return { error: 'Please enter your name.' }
  if (!EMAIL_RE.test(email)) return { error: 'Please enter a valid email address.' }
  return { name, email }
}

async function deliver({ subject, title, rows, replyTo, customer }) {
  const t = getTransporter()
  const from = `"${env('MAIL_FROM_NAME', BRAND)}" <${env('SMTP_USER')}>`
  const to = env('MAIL_TO', env('SMTP_USER'))

  await t.sendMail({
    from,
    to,
    replyTo,
    subject,
    text: textVersion(rows),
    html: layout(title, 'A new submission arrived from the website. Reply to this email to answer the student directly.', table(rows)),
  })

  if (customer && env('AUTO_REPLY', 'true') !== 'false') {
    try {
      await t.sendMail({
        from,
        to: customer.email,
        replyTo: to,
        subject: customer.subject,
        text: customer.text,
        html: layout(customer.title, escapeHtml(customer.text), table(customer.rows || [])),
      })
    } catch (err) {
      // The team copy already went out; a failed confirmation must not fail the request.
      console.error('[mailer] auto-reply failed:', err.message)
    }
  }
}

export async function handleContact(data = {}) {
  const v = validateCommon(data)
  if (v.spam) return { status: 200, body: { success: true, message: 'Thanks! We will be in touch shortly.' } }
  if (v.error) return { status: 400, body: { success: false, message: v.error } }

  const detail = clean(data.detail || data.message)
  if (detail.length < 10) {
    return { status: 400, body: { success: false, message: 'Please add a little more detail to your message.' } }
  }
  const subjectLine = clean(data.subject) || 'General enquiry'
  const rows = [
    ['Name', v.name],
    ['Email', v.email],
    ['Phone', clean(data.phone)],
    ['Subject', subjectLine],
    ['Message', detail],
    ['Page', clean(data.page)],
  ]

  await deliver({
    subject: `New enquiry: ${subjectLine} — ${v.name}`,
    title: 'New contact enquiry',
    rows,
    replyTo: `"${v.name.replace(/"/g, '')}" <${v.email}>`,
    customer: {
      email: v.email,
      subject: `We received your message — ${BRAND}`,
      title: 'Thanks for reaching out',
      text: `Hi ${v.name}, thanks for contacting ${BRAND}. Our desk has your message and will reply shortly. Here is a copy of what you sent:`,
      rows: [
        ['Subject', subjectLine],
        ['Message', detail],
      ],
    },
  })

  return {
    status: 200,
    body: { success: true, message: 'Message sent! Our team will reply shortly — check your inbox for a confirmation.' },
  }
}

export async function handleOrder(data = {}) {
  const v = validateCommon(data)
  if (v.spam) return { status: 200, body: { success: true, message: 'Order received.' } }
  if (v.error) return { status: 400, body: { success: false, message: v.error } }

  const topic = clean(data.paperTopic)
  if (!topic) return { status: 400, body: { success: false, message: 'Please add a topic or title.' } }

  const orderId = `AS-${Date.now().toString().slice(-8)}`
  const rows = [
    ['Order ID', orderId],
    ['Name', v.name],
    ['Email', v.email],
    ['Phone', clean(data.phone)],
    ['Country', clean(data.country)],
    ['Paper type', clean(data.paperType)],
    ['Academic level', clean(data.academicLevelLabel || data.academicLevel)],
    ['Subject', clean(data.subject)],
    ['Referencing', clean(data.referenceStyle)],
    ['Deadline', clean(data.deadlineLabel || data.deadline)],
    ['Length', data.words ? `${clean(data.words)} words (${clean(data.pages)} pages)` : ''],
    ['Topic', topic],
    ['Instructions', clean(data.instructions)],
    ['Quoted total', data.amountUSD ? `$${clean(data.amountUSD)} USD${data.currency && data.currency !== 'USD' ? ` (viewed in ${clean(data.currency)})` : ''}` : ''],
  ]

  await deliver({
    subject: `New order ${orderId}: ${clean(data.paperType) || 'Paper'} — ${v.name}`,
    title: `New order ${orderId}`,
    rows,
    replyTo: `"${v.name.replace(/"/g, '')}" <${v.email}>`,
    customer: {
      email: v.email,
      subject: `Order ${orderId} received — ${BRAND}`,
      title: `Order ${orderId} received`,
      text: `Hi ${v.name}, thanks for your order with ${BRAND}. A coordinator will review your brief and confirm pricing and next steps shortly. Your order summary:`,
      rows: rows.filter(([k]) => !['Email', 'Phone', 'Name'].includes(k)),
    },
  })

  return {
    status: 200,
    body: {
      success: true,
      orderId,
      message: `Order ${orderId} received. A coordinator will confirm shortly — check your inbox.`,
    },
  }
}

export async function runHandler(kind, data) {
  try {
    return kind === 'order' ? await handleOrder(data) : await handleContact(data)
  } catch (err) {
    console.error(`[mailer] ${kind} failed:`, err.message)
    return {
      status: err.status || 502,
      body: {
        success: false,
        message: 'We could not send your message right now. Please try WhatsApp or email us directly.',
      },
    }
  }
}
