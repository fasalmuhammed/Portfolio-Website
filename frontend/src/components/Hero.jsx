import { motion } from 'framer-motion'
import profilePhoto from '../assets/profile.jpg'

export default function Hero({ onOpenChat }) {
  return (
    <section id="about" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-5">
            <h1 className="text-[2.4rem] font-black leading-[0.94] tracking-normal min-[430px]:text-[3.2rem] sm:text-[4.2rem] lg:text-[5.5rem]" style={{ color: '#F4EBDD' }}>
              Hi, I'm
              <span className="block" style={{ color: '#D8C79D', whiteSpace: 'nowrap' }}>
                Muhammed Fasal V
              </span>
            </h1>
          </div>

          <p className="mt-7 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: '#B8AD9A' }}>
            MCA graduate focused on AI, automation, and scalable full stack applications that solve real-world problems.
          </p>

        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-sm self-start pt-8 lg:ml-10 lg:max-w-md lg:pt-3"
          initial={{ opacity: 0, x: 28, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div
            className="relative overflow-hidden rounded-[1.5rem]"
            style={{ border: '1px solid rgba(216,199,157,0.28)', boxShadow: '0 28px 80px rgba(0,0,0,0.45)' }}
          >
            <img
              src={profilePhoto}
              alt="Muhammed Fasal"
              className="block w-full"
              style={{ aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}