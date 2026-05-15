import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageCircle, Send, X } from 'lucide-react'

const SUGGESTIONS = [
  'What are your skills?',
  'Tell me about SmartWear',
  'Are you available for hire?',
  "What's your tech stack?",
]

export default function Chatbot({ externalOpen, onClose }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hey! I'm Fasal's AI assistant. Ask me about his projects, skills, or availability." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    if (externalOpen) setOpen(true)
  }, [externalOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function closeChat() {
    setOpen(false)
    onClose?.()
  }

  async function send(text) {
    const msg = (text || input).trim()
    if (!msg || loading) return

    setInput('')
    setMessages(m => [...m, { role: 'user', text: msg }])
    setLoading(true)

    const newHistory = [...history, { role: 'user', content: msg }]

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || `Backend error: ${res.status}`)
      }

      const reply = data.reply || 'Sorry, something went wrong.'
      setMessages(m => [...m, { role: 'assistant', text: reply }])
      setHistory([...newHistory, { role: 'assistant', content: reply }])
    } catch (error) {
      setMessages(m => [...m, { role: 'assistant', text: error.message || "Couldn't reach the backend. Make sure it's running." }])
    }

    setLoading(false)
  }

  return (
    <>
      <button
        onClick={() => { setOpen(o => !o); if (open) onClose?.() }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all hover:scale-105"
        style={{ background: '#D8C79D', color: '#050505', boxShadow: '0 0 34px rgba(216,199,157,0.28)' }}
        aria-label="Open AI assistant"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-50 flex w-[390px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl shadow-2xl sm:right-6"
            style={{ background: '#0D0D0C', border: '1px solid rgba(216,199,157,0.22)', maxHeight: '560px' }}
          >
            <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: '1px solid rgba(216,199,157,0.16)' }}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: '#D8C79D', color: '#050505' }}>
                  <Bot size={17} />
                </div>
                <div>
                  <div className="text-sm font-black" style={{ color: '#F4EBDD' }}>Fasal's AI Assistant</div>
                  <div className="text-xs" style={{ color: '#67D391' }}>Online</div>
                </div>
              </div>
              <button onClick={closeChat} className="rounded-full p-1" style={{ color: '#8E8578' }} aria-label="Close chat">
                <X size={17} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 px-3 py-3" style={{ borderBottom: '1px solid rgba(216,199,157,0.16)' }}>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full px-3 py-1.5 text-xs transition-all hover:-translate-y-0.5"
                  style={{ background: 'rgba(216,199,157,0.08)', color: '#B8AD9A', border: '1px solid rgba(216,199,157,0.15)' }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex min-h-[220px] flex-1 flex-col gap-3 overflow-y-auto px-3 py-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'self-end' : 'self-start'}`}
                  style={m.role === 'user'
                    ? { background: '#D8C79D', color: '#050505', borderBottomRightRadius: 6 }
                    : { background: '#151513', color: '#F4EBDD', border: '1px solid rgba(216,199,157,0.12)', borderBottomLeftRadius: 6 }
                  }
                >
                  {m.text}
                </motion.div>
              ))}

              {loading && (
                <div className="flex items-center gap-1 self-start rounded-2xl px-4 py-3" style={{ background: '#151513', border: '1px solid rgba(216,199,157,0.12)' }}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: '#D8C79D' }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="flex items-center gap-2 px-3 py-3" style={{ borderTop: '1px solid rgba(216,199,157,0.16)' }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask a question..."
                className="min-w-0 flex-1 rounded-xl px-3 py-2 text-sm outline-none"
                style={{ background: '#151513', border: '1px solid rgba(216,199,157,0.16)', color: '#F4EBDD' }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-opacity"
                style={{ background: '#D8C79D', color: '#050505', opacity: (!input.trim() || loading) ? 0.5 : 1 }}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
