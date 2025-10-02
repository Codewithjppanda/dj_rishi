'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaSpotify, FaApple, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const releases = [
  {
    title: 'Electric Dreams',
    year: '2025',
    cover: '/images/gallery1.png',
    type: 'Single',
    genre: 'Progressive House',
    duration: '3:45',
  },
  {
    title: 'Night Pulse',
    year: '2025',
    cover: '/images/gallery2.png',
    type: 'EP',
    genre: 'Techno',
    duration: '18:22',
  },
  {
    title: 'Sonic Journey',
    year: '2024',
    cover: '/images/gallery3.png',
    type: 'Album',
    genre: 'Electronic',
    duration: '45:30',
  },
  {
    title: 'Midnight Vibes',
    year: '2024',
    cover: '/images/gallery1.png',
    type: 'Single',
    genre: 'Deep House',
    duration: '4:12',
  },
  {
    title: 'Festival Anthems',
    year: '2024',
    cover: '/images/gallery2.png',
    type: 'Compilation',
    genre: 'Big Room',
    duration: '32:15',
  },
  {
    title: 'Ethereal Waves',
    year: '2023',
    cover: '/images/gallery3.png',
    type: 'EP',
    genre: 'Melodic Techno',
    duration: '22:48',
  },
];

export default function MusicPage() {
  const [filter, setFilter] = useState('All Music');

  const filteredReleases = filter === 'All Music' 
    ? releases 
    : releases.filter(r => r.year === filter);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-primary/20 to-dark-900"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-primary">Music</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Explore the discography
          </p>
        </motion.div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 px-6 bg-dark-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {['All Music', '2025', '2024', '2023'].map((filterOption) => (
              <motion.button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === filterOption
                    ? 'bg-primary text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterOption}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Releases Grid */}
      <section className="py-20 px-6 bg-dark-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReleases.map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 bg-dark-800">
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
                <p className="text-gray-400 text-sm mb-1">
                  {release.type} • {release.year}
                </p>
                <p className="text-gray-500 text-xs">
                  {release.genre} • {release.duration}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            Stream Everywhere
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-12"
          >
            Available on all major streaming platforms
          </motion.p>
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { icon: FaSpotify, name: 'Spotify', color: '#1DB954' },
              { icon: FaApple, name: 'Apple Music', color: '#FC3C44' },
              { icon: FaYoutube, name: 'YouTube', color: '#FF0000' },
              { icon: FaSoundcloud, name: 'SoundCloud', color: '#FF5500' },
            ].map((platform, index) => (
              <motion.a
                key={platform.name}
                href="#"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-6xl hover:text-primary transition-colors"
                aria-label={platform.name}
              >
                <platform.icon />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

