'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const tourCategories = ['All Events', 'North America', 'Asia', 'South America', 'Europe'];

const events = [
  {
    date: 'MAR 15',
    year: '2025',
    venue: 'Ultra Music Festival',
    location: 'Miami, FL',
    region: 'North America',
    image: '/images/gallery1.png',
  },
  {
    date: 'APR 22',
    year: '2025',
    venue: 'Tomorrowland',
    location: 'Boom, Belgium',
    region: 'Europe',
    image: '/images/gallery2.png',
  },
  {
    date: 'MAY 10',
    year: '2025',
    venue: 'Electric Daisy Carnival',
    location: 'Las Vegas, NV',
    region: 'North America',
    image: '/images/gallery3.png',
  },
  {
    date: 'JUN 18',
    year: '2025',
    venue: 'Summer Sonic',
    location: 'Tokyo, Japan',
    region: 'Asia',
    image: '/images/gallery1.png',
  },
  {
    date: 'JUL 05',
    year: '2025',
    venue: 'Lollapalooza',
    location: 'São Paulo, Brazil',
    region: 'South America',
    image: '/images/gallery2.png',
  },
  {
    date: 'AUG 14',
    year: '2025',
    venue: 'Creamfields',
    location: 'Daresbury, UK',
    region: 'Europe',
    image: '/images/gallery3.png',
  },
];

export default function ToursPage() {
  const [activeCategory, setActiveCategory] = useState('All Events');

  const filteredEvents =
    activeCategory === 'All Events'
      ? events
      : events.filter((event) => event.region === activeCategory);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="/images/gallery1.png"
            alt="Tour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-primary">Tours</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Catch me live around the world
          </p>
        </motion.div>
      </section>

      {/* Category Filters */}
      <section className="py-12 px-6 bg-dark-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {tourCategories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 px-6 bg-dark-900">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-primary transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Event Image */}
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.venue}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Event Info */}
                  <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[80px]">
                        <div className="text-3xl font-bold text-primary">{event.date}</div>
                        <div className="text-sm text-gray-400">{event.year}</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold mb-1">{event.venue}</h3>
                        <p className="text-gray-400">{event.location}</p>
                        <p className="text-sm text-primary mt-1">{event.region}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-8 py-3 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary/90 transition-all"
                    >
                      Get Tickets
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

