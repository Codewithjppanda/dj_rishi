'use client';

import { motion } from 'framer-motion';
import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';

const releases = [
  {
    title: 'Electric Dreams',
    year: '2025',
    cover: '/images/gallery1.png',
    type: 'Single',
  },
  {
    title: 'Night Pulse',
    year: '2025',
    cover: '/images/gallery2.png',
    type: 'EP',
  },
  {
    title: 'Sonic Journey',
    year: '2024',
    cover: '/images/gallery3.png',
    type: 'Album',
  },
];

export default function Music() {
  return (
    <section id="music" className="py-20 px-6 bg-dark-800">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-12 text-center"
        >
          Music
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {['All Music', '2025'].map((filter) => (
            <motion.button
              key={filter}
              className="px-6 py-2 rounded-full text-sm font-semibold bg-dark-700 text-gray-300 hover:bg-primary hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {releases.map((release, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={release.cover}
                  alt={release.title}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-primary text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Play Now
                  </motion.button>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{release.title}</h3>
              <p className="text-gray-400 text-sm">
                {release.type} • {release.year}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Streaming Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h3 className="text-2xl font-semibold mb-6">Stream Now</h3>
          <div className="flex gap-6">
            {[
              { icon: FaSpotify, name: 'Spotify', color: '#1DB954' },
              { icon: FaApple, name: 'Apple Music', color: '#FC3C44' },
              { icon: FaYoutube, name: 'YouTube', color: '#FF0000' },
            ].map((platform, index) => (
              <motion.a
                key={platform.name}
                href="#"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.2, color: platform.color }}
                whileTap={{ scale: 0.9 }}
                className="text-4xl hover:text-primary transition-colors"
                aria-label={platform.name}
              >
                <platform.icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


