import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: '#050505' }}>
      <Navbar onOpenChat={() => setChatOpen(true)} />
      <Hero onOpenChat={() => setChatOpen(true)} />
      <Projects />
      <Skills />
      <Contact onOpenChat={() => setChatOpen(true)} />
      <Footer />
      <Chatbot externalOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
