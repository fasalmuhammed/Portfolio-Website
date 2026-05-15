import { useState, useEffect } from 'react'
import { Download, Menu, MessageCircle, X } from 'lucide-react'
import resumeFile from '../assets/Muhammed Fasal Resume.pdf'

const LINKS = [
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar({ onOpenChat }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Projects')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      for (const id of ['contact', 'skills', 'projects']) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id.charAt(0).toUpperCase() + id.slice(1))
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleMobileLink() {
    setMobileOpen(false)
  }

  function handleMobileChat() {
    setMobileOpen(false)
    onOpenChat?.()
  }

  return (
    <div className="fixed left-0 right-0 top-5 z-50 w-screen max-w-full px-4">
      <nav
        className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full px-5 py-3 transition-all duration-300 md:px-6"
        style={{
          background: scrolled ? 'rgba(8,8,8,0.86)' : 'rgba(8,8,8,0.68)',
          border: '1px solid rgba(216,199,157,0.16)',
          boxShadow: scrolled ? '0 18px 50px rgba(0,0,0,0.34)' : '0 10px 40px rgba(0,0,0,0.22)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <a href="#about" className="shrink-0 text-xl font-black" style={{ color: '#F4EBDD' }}>
          MF<span style={{ color: '#D8C79D' }}></span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
              style={{
                color: active === link.label ? '#050505' : '#B8AD9A',
                background: active === link.label ? '#D8C79D' : 'transparent',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={resumeFile}
            download="Muhammed Fasal Resume.pdf"
            className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5 sm:flex"
            style={{ background: '#D8C79D', color: '#050505', boxShadow: '0 0 28px rgba(216,199,157,0.22)' }}
          >
            CV <Download size={14} />
          </a>
          <button
            onClick={onOpenChat}
            className="hidden h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 sm:flex md:w-auto md:px-4"
            style={{ background: 'rgba(216,199,157,0.1)', color: '#F4EBDD', border: '1px solid rgba(216,199,157,0.22)' }}
            aria-label="Chat with AI"
          >
            <MessageCircle size={16} />
            <span className="ml-2 hidden text-sm font-semibold md:inline">AI Chat</span>
          </button>
          <button
            onClick={() => setMobileOpen(open => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 sm:hidden"
            style={{ background: 'rgba(216,199,157,0.1)', color: '#F4EBDD', border: '1px solid rgba(216,199,157,0.22)' }}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="mx-auto mt-3 w-full max-w-5xl overflow-hidden rounded-3xl p-3 shadow-2xl sm:hidden"
          style={{
            background: 'rgba(8,8,8,0.94)',
            border: '1px solid rgba(216,199,157,0.16)',
            boxShadow: '0 18px 50px rgba(0,0,0,0.34)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <div className="grid gap-2">
            {LINKS.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleMobileLink}
                className="rounded-2xl px-4 py-3 text-sm font-semibold"
                style={{
                  color: active === link.label ? '#050505' : '#F4EBDD',
                  background: active === link.label ? '#D8C79D' : 'rgba(216,199,157,0.08)',
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={resumeFile}
                download="Muhammed Fasal Resume.pdf"
                onClick={handleMobileLink}
                className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold"
                style={{ background: '#D8C79D', color: '#050505' }}
              >
                CV <Download size={14} />
              </a>
              <button
                onClick={handleMobileChat}
                className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold"
                style={{ background: 'rgba(216,199,157,0.1)', color: '#F4EBDD', border: '1px solid rgba(216,199,157,0.22)' }}
              >
                <MessageCircle size={15} /> AI Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
