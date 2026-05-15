import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, GraduationCap, MapPin } from 'lucide-react'

const INTERESTS = ['Backend Development', 'Artificial Intelligence', 'Full Stack Development', 'Scalable Systems', 'Problem Solving', 'New Technologies']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about-detail" className="py-24" style={{ background: '#050505' }}>
      <div ref={ref} className="mx-auto grid max-w-5xl gap-10 px-5 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="mb-5 inline-block rounded-full px-4 py-2 text-xs font-black uppercase" style={{ background: 'rgba(216,199,157,0.1)', color: '#D8C79D', border: '1px solid rgba(216,199,157,0.18)' }}>
            About
          </span>
          <h2 className="text-4xl font-black leading-tight md:text-5xl" style={{ color: '#F4EBDD' }}>
            Building useful systems with backend depth.
          </h2>

          <div className="mt-7 space-y-4 text-base leading-relaxed" style={{ color: '#B8AD9A' }}>
            <p>
              Hi, I'm <strong style={{ color: '#F4EBDD' }}>Muhammed Fasal</strong>, a software engineer focused on backend development,
              APIs, databases, and AI-powered applications.
            </p>
            <p>
              I work with Python, Django, FastAPI, REST APIs, SQL, and React. I like clean implementation,
              practical architecture, and projects that solve real problems.
            </p>
            <p>
              I recently completed my MCA and I am open to backend developer, software engineer, and AI/ML fresher roles.
            </p>
          </div>

          <div className="mt-7 flex items-center gap-2 text-sm" style={{ color: '#8E8578' }}>
            <MapPin size={16} />
            Kozhikode, Kerala, India
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          {[
            { icon: Code2, label: '4+ Projects Built', sub: 'Full-stack, backend, and AI-integrated applications' },
            { icon: GraduationCap, label: 'MCA Graduate', sub: 'Master of Computer Applications, 2025' },
          ].map(card => (
            <div key={card.label} className="flex items-center gap-4 rounded-xl p-5" style={{ background: '#10100F', border: '1px solid rgba(216,199,157,0.14)' }}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(216,199,157,0.12)', color: '#D8C79D' }}>
                <card.icon size={22} />
              </div>
              <div>
                <div className="font-black" style={{ color: '#F4EBDD' }}>{card.label}</div>
                <div className="text-sm" style={{ color: '#8E8578' }}>{card.sub}</div>
              </div>
            </div>
          ))}

          <div className="rounded-xl p-5" style={{ background: '#10100F', border: '1px solid rgba(216,199,157,0.14)' }}>
            <div className="mb-4 text-xs font-black uppercase" style={{ color: '#8E8578' }}>Interests</div>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(i => (
                <span key={i} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(216,199,157,0.08)', color: '#D8C79D', border: '1px solid rgba(216,199,157,0.13)' }}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
