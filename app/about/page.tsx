'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRevealSection from '@/components/ScrollRevealSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/DJ Rishi 3D.png"
            alt="DJ Rishi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-4"
          >
            About <span className="text-primary">DJ Rishi</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            The journey of sound, rhythm, and passion
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">The Story</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                DJ Rishi is a music creator committed to bringing you the latest sounds, innovative
                beats, and uplifting performances. With years of experience in the electronic music
                scene, Rishi has become a household name in clubs and festivals worldwide.
              </p>
              <p>
                From humble beginnings in bedroom production to headlining major festivals, the
                journey has been nothing short of extraordinary. Each track tells a story, each
                performance creates memories, and each beat connects souls on the dancefloor.
              </p>
              <p>
                The philosophy is simple: music has the power to unite, heal, and elevate. Through
                carefully crafted sets and original productions, DJ Rishi continues to push
                boundaries and redefine what electronic music can be.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Reveal Sections */}
      <ScrollRevealSection
        imageSrc="/images/gallery2.png"
        imageAlt="Studio"
        title="In The Studio"
        description="Where magic happens. Every track is meticulously crafted with passion, precision, and purpose. State-of-the-art equipment meets creative vision."
      />

      <ScrollRevealSection
        imageSrc="/images/gallery3.png"
        imageAlt="Live Performance"
        title="On Stage"
        description="Experience the energy. From intimate club shows to massive festival stages, every performance is designed to take you on a sonic journey you'll never forget."
        reverse
      />

      {/* Achievements */}
      <section className="py-20 px-6 bg-dark-900">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            Achievements
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '500+', label: 'Shows Performed' },
              { number: '50+', label: 'Countries Visited' },
              { number: '100M+', label: 'Streams Worldwide' },
              { number: '25+', label: 'Festival Headliners' },
              { number: '10+', label: 'Chart-Topping Hits' },
              { number: '5+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-800 rounded-lg p-8 text-center border border-dark-700 hover:border-primary transition-all"
              >
                <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

