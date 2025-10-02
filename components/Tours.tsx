'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const tourCategories = ['All Events', 'North America', 'Asia', 'South America', 'Europe'];

const events = [
  {
    date: 'MAR 15',
    year: '2025',
    venue: 'Ultra Music Festival',
    location: 'Miami, FL',
    region: 'North America',
  },
  {
    date: 'APR 22',
    year: '2025',
    venue: 'Tomorrowland',
    location: 'Boom, Belgium',
    region: 'Europe',
  },
  {
    date: 'MAY 10',
    year: '2025',
    venue: 'Electric Daisy Carnival',
    location: 'Las Vegas, NV',
    region: 'North America',
  },
  {
    date: 'JUN 18',
    year: '2025',
    venue: 'Summer Sonic',
    location: 'Tokyo, Japan',
    region: 'Asia',
  },
  {
    date: 'JUL 05',
    year: '2025',
    venue: 'Lollapalooza',
    location: 'São Paulo, Brazil',
    region: 'South America',
  },
  {
    date: 'AUG 14',
    year: '2025',
    venue: 'Creamfields',
    location: 'Daresbury, UK',
    region: 'Europe',
  },
];

export default function Tours() {
  const [activeCategory, setActiveCategory] = useState('All Events');

  const filteredEvents =
    activeCategory === 'All Events'
      ? events
      : events.filter((event) => event.region === activeCategory);

  return (
    <section id="tours" className="py-20 px-6 bg-dark-900">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-12 text-center"
        >
          Tours
        </motion.h2>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {tourCategories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="text-center min-w-[80px]">
                    <div className="text-3xl font-bold text-primary">{event.date}</div>
                    <div className="text-sm text-gray-400">{event.year}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{event.venue}</h3>
                    <p className="text-gray-400">{event.location}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-2 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary/90 transition-all"
                >
                  Get Tickets
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


