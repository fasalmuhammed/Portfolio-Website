import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const SKILLS = [
  { title: 'Languages', items: ['Python', 'JavaScript', 'HTML/CSS', 'SQL', 'Java', 'C', 'C++'] },
  { title: 'Frameworks', items: ['Django', 'FastAPI', 'React', 'REST API'] },
  { title: 'Databases', items: ['SQLite', 'MySQL', 'PostgreSQL'] },
  { title: 'AI / ML', items: ['Machine Learning', 'AI Concepts', 'Prompt Engineering'] },
  { title: 'Tools', items: ['Git & GitHub', 'VS Code', 'Postman'] },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24" style={{ background: '#050505' }}>
      <div className="mx-auto max-w-5xl px-5">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center"
        >
          <span className="mb-5 inline-block rounded-full px-4 py-2 text-xs font-black uppercase" style={{ background: 'rgba(216,199,157,0.1)', color: '#D8C79D', border: '1px solid rgba(216,199,157,0.18)' }}>
            Skills
          </span>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              className="rounded-xl p-6"
              style={{ background: '#10100F', border: '1px solid rgba(216,199,157,0.14)' }}
            >
              <h3 className="mb-5 text-lg font-black" style={{ color: '#F4EBDD' }}>{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(216,199,157,0.08)', color: '#D8C79D', border: '1px solid rgba(216,199,157,0.1)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
