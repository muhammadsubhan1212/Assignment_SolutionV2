const RULES = [
  {
    test: /\b(hi|hello|hey|good\s?(morning|afternoon|evening))\b/i,
    reply: () => `Hi there! Tell me your subject, academic level, and deadline, and I'll point you in the right direction.`,
  },
  {
    test: /\b(price|cost|quote|charge|rate|cheap|expensive|budget|how much)\b/i,
    reply: () => `Pricing depends on academic level, page count, and deadline. Use the calculator on the Order page for an instant quote — rush jobs carry a small urgency fee, everything else is billed per page.`,
  },
  {
    test: /\b(deadline|urgent|asap|rush|fast|few hours|today|tonight|tomorrow)\b/i,
    reply: () => `We can move fast — some writers accept work with just a few hours' notice. Add your exact deadline to the order form and we'll confirm availability right away.`,
  },
  {
    test: /\b(revision|revise|redo|refund|money\s?back|not happy|complaint|dissatisfied)\b/i,
    reply: (brand) => `You're covered. Free revisions are available within our Revision Policy window, and refunds follow the Refund Policy if the brief wasn't met. Want the links, or should I connect you with support at ${brand.email}?`,
  },
  {
    test: /\b(plagiarism|original|turnitin|ai\s?detect|copied|unique|authentic)\b/i,
    reply: () => `Every order is written from scratch and screened for originality before delivery — you'll get a plagiarism-free, human-written paper with a report on request.`,
  },
  {
    test: /\b(writer|expert|qualif|phd|degree|native speaker|who writes)\b/i,
    reply: () => `Our writers are subject-matter specialists — many hold master's or PhD degrees — and every order is matched to someone qualified in your exact field.`,
  },
  {
    test: /\b(pay|payment|card|paypal|stripe|checkout|currency|exchange rate)\b/i,
    reply: () => `Payments run securely in USD, and the amount shown converts automatically to your local currency at checkout — no surprises before you confirm.`,
  },
  {
    test: /\b(thesis|dissertation|essay|coursework|research paper|term paper|case study|personal statement|\bcv\b|ghost\s?writ|proposal|assignment)\b/i,
    reply: () => `We cover that. Check the Services page for the full breakdown, or tell me your topic here and I'll flag the right specialist for it.`,
  },
  {
    test: /\b(human|agent|real person|talk to someone|call me|whatsapp|phone number)\b/i,
    reply: (brand) => `Of course — reach a coordinator directly on WhatsApp or call ${brand.phone} / ${brand.phone2}. I can also keep helping right here if that's easier.`,
  },
  {
    test: /\b(thank|thanks|appreciate|cheers|great)\b/i,
    reply: () => `You're very welcome! Let me know if there's anything else before you go.`,
  },
]

const FALLBACKS = [
  () => `Got it — could you share a bit more detail (subject, academic level, deadline) so I can give you a precise answer?`,
  () => `Good question. A coordinator can dig into specifics, but meanwhile the Order page gives an instant price and delivery estimate.`,
  () => `I want to get this right for you — could you tell me a little more about what you're trying to get done (an order, pricing, a policy question)?`,
]

let fallbackCursor = 0

export function getSmartReply(message, brand) {
  const text = String(message || '').toLowerCase()
  for (const rule of RULES) {
    if (rule.test.test(text)) return rule.reply(brand)
  }
  const reply = FALLBACKS[fallbackCursor % FALLBACKS.length](brand)
  fallbackCursor += 1
  return reply
}
