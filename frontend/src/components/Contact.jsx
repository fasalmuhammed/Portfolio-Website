import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'

const SOCIALS = [
  { icon: Github, label: 'GitHub', sub: 'See my projects', href: 'https://github.com/fasalmuhammed' },
  { icon: Linkedin, label: 'LinkedIn', sub: "Let's connect", href: 'https://www.linkedin.com/in/muhammed-fasal-v-4389b6267/' },
  { icon: Mail, label: 'Email', sub: 'fasalmuhammed387@gmail.com', href: 'mailto:fasalmuhammed387@gmail.com' },
]

export default function Contact({ onOpenChat }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-24" style={{ background: '#080807' }}>
      <div ref={ref} className="mx-auto max-w-5xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center"
        >
          <span className="mb-5 inline-block rounded-full px-4 py-2 text-xs font-black uppercase" style={{ background: 'rgba(216,199,157,0.1)', color: '#D8C79D', border: '1px solid rgba(216,199,157,0.18)' }}>
            Contact
          </span>
          <h2 className="text-4xl font-black leading-tight md:text-6xl" style={{ color: '#F4EBDD' }}>
            Let's build something.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed" style={{ color: '#B8AD9A' }}>
            I'm actively looking for  Software engineer, Full-stack developer or AI/ML fresher roles.
            Reach out directly or ask the AI assistant about my projects and availability.
          </p>
        </motion.div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl p-6 text-center no-underline transition-all hover:-translate-y-1"
              style={{ background: '#10100F', border: '1px solid rgba(216,199,157,0.14)' }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'rgba(216,199,157,0.1)', color: '#D8C79D' }}>
                <s.icon size={21} />
              </div>
              <div className="font-black" style={{ color: '#F4EBDD' }}>{s.label}</div>
              <div className="mt-1 text-xs" style={{ color: '#8E8578' }}>{s.sub}</div>
              <ArrowRight className="mx-auto mt-4 transition-transform group-hover:translate-x-1" size={15} style={{ color: '#D8C79D' }} />
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onOpenChat}
            className="inline-flex items-center gap-3 rounded-lg px-8 py-4 font-black transition-all hover:-translate-y-0.5"
            style={{ background: '#D8C79D', color: '#050505', boxShadow: '0 0 36px rgba(216,199,157,0.22)' }}
          >
            <MessageCircle size={18} />
            Chat with my AI Assistant
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
