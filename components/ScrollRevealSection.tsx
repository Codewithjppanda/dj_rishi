'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ScrollRevealSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  reverse?: boolean;
}

export default function ScrollRevealSection({
  imageSrc,
  imageAlt,
  title,
  description,
  reverse = false,
}: ScrollRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    reverse ? [100, 0, 0, -100] : [-100, 0, 0, 100]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          {/* Image */}
          <motion.div
            style={{ opacity, scale, x }}
            className="flex-1 relative w-full aspect-square"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-2xl shadow-2xl"
              loading="lazy"
              quality={85}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">{title}</h2>
            <p className="text-xl text-gray-300 leading-relaxed">{description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

