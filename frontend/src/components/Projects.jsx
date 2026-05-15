import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'

const PROJECTS = [
  {
    category: 'AI Fashion Platform',
    name: 'SmartWear',
    desc: 'Personalized outfit suggestions based on user preferences, wardrobe data, and current trends using AI/ML.',
    tags: ['Python', 'FastAPI', 'React', 'AI/ML', 'SQLite'],
    github: '#',
  },
  {
    category: 'Healthcare System',
    name: 'Kidney Allocation System',
    desc: 'Donor-recipient matching platform designed to improve allocation efficiency with prioritization and tracking.',
    tags: ['Python', 'Django', 'REST API', 'SQL'],
    github: '#',
  },
  {
    category: 'Accommodation Management',
    name: 'Hostel Allocation System',
    desc: 'Web application for room allocation, vacancy tracking, and student accommodation management.',
    tags: ['Python', 'Django', 'HTML/CSS', 'SQLite'],
    github: '#',
  },
  {
    category: 'Restaurant Ordering',
    name: 'i-Dine',
    desc: 'Full-stack ordering system with menu management, cart, real-time order tracking, and REST API backend.',
    tags: ['React', 'FastAPI', 'REST API', 'JavaScript'],
    github: '#',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24" style={{ background: '#080807' }}>
      <div className="mx-auto max-w-5xl px-5">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="mb-5 inline-block rounded-full px-4 py-2 text-xs font-black uppercase" style={{ background: 'rgba(216,199,157,0.1)', color: '#D8C79D', border: '1px solid rgba(216,199,157,0.18)' }}>
            Projects
          </span>

        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#10100F', border: '1px solid rgba(216,199,157,0.14)' }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 text-xs font-black uppercase" style={{ color: '#D8C79D' }}>{p.category}</div>
                  <h3 className="text-2xl font-black" style={{ color: '#F4EBDD' }}>{p.name}</h3>
                </div>
                <ArrowUpRight className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} style={{ color: '#D8C79D' }} />
              </div>

              <p className="mb-5 text-sm leading-relaxed" style={{ color: '#B8AD9A' }}>{p.desc}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(216,199,157,0.08)', color: '#D8C79D' }}>
                    {t}
                  </span>
                ))}
              </div>

              <a href={p.github} className="inline-flex items-center gap-2 text-xs font-bold" style={{ color: '#8E8578' }}>
                <Github size={14} /> View on GitHub
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
