'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] w-full overflow-hidden bg-dark-900"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y }}
        className="sticky top-0 h-screen w-full flex items-center justify-center"
      >
        <motion.div
          style={{ opacity, scale }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900 z-10" />
          <motion.img
            src="/images/DJ Rishi Logo Transparent.png"
            alt="DJ Rishi Logo"
            className="w-auto h-[60vh] object-contain z-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

