import { runHandler } from '../server/mailer.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const result = await runHandler('order', body)
  return res.status(result.status).json(result.body)
}
