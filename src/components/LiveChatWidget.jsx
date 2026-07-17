import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { brand } from '../data/brand'

const cannedReplies = [
  'Thanks for reaching out! Share your subject, level, and deadline and I can outline next steps.',
  'You can get an instant estimate on our Order page — prices adjust by academic level and urgency.',
  'A coordinator can match you with a subject specialist within 15 minutes during business hours.',
  'Yes — revisions are included within the policy window when they align with the original brief.',
]

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'agent', text: `Hi — how can ${brand.name} help with your assignment today?` },
  ])
  const [input, setInput] = useState('')
  const [replyIndex, setReplyIndex] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('as-open-chat', handler)
    return () => window.removeEventListener('as-open-chat', handler)
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, open])

  const send = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    const reply = cannedReplies[replyIndex % cannedReplies.length]
    setReplyIndex((i) => i + 1)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'agent', text: reply }])
    }, 700)
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-xl shadow-violet-600/30 transition-colors hover:bg-violet-700 lg:flex"
        aria-label="Open live chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 left-6 z-40 hidden w-[340px] flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_64px_-16px_rgba(0,0,0,0.25)] lg:flex"
          >
            <div className="flex items-center gap-3 bg-neutral-900 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <img src="/logo-mark-white.png" alt="" className="h-5 w-auto" />
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-tight text-white">{brand.name}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Typically replies in minutes
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex max-h-80 flex-col gap-3 overflow-y-auto bg-neutral-50 px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.from === 'user'
                        ? 'rounded-br-md bg-neutral-900 text-white'
                        : 'rounded-bl-md border border-neutral-200 bg-white text-neutral-700'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t border-neutral-100 bg-white p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-full bg-neutral-100 px-4 py-2.5 text-[13px] text-neutral-800 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-200"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white transition-colors hover:bg-violet-700"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
