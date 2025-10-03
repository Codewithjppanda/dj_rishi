'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  type?: 'image' | 'video';
}

// Default images to show when no uploads exist yet
const defaultImages: GalleryImage[] = [
  { id: '1', src: '/images/gallery1.png', title: 'Festival Vibes', category: 'Festivals' },
  { id: '2', src: '/images/gallery2.png', title: 'Studio Session', category: 'Studio' },
  { id: '3', src: '/images/gallery3.png', title: 'Live Performance', category: 'Live' },
  { id: '4', src: '/images/DJ Rishi 3D.png', title: 'DJ Rishi', category: 'Promo' },
  { id: '5', src: '/images/DJ Rishi Logo Transparent.png', title: 'Logo', category: 'Branding' },
  { id: '6', src: '/images/gallery1.png', title: 'Festival Night', category: 'Festivals' },
  { id: '7', src: '/images/gallery2.png', title: 'Mixing Desk', category: 'Studio' },
  { id: '8', src: '/images/gallery3.png', title: 'Crowd Energy', category: 'Live' },
  { id: '9', src: '/images/hero.png', title: 'Stage Setup', category: 'Live' },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(defaultImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gallery');
      const uploadedImages = await res.json();
      
      // Combine uploaded images with default images
      if (uploadedImages.length > 0) {
        setGalleryImages([...uploadedImages, ...defaultImages]);
      }
    } catch (error) {
      console.log('Using default images');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Festivals', 'Live', 'Studio', 'Promo', 'Branding'];

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-primary/10 to-dark-900"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Moments captured in time
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
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === category
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

      {/* Gallery Grid */}
      <section className="py-20 px-6 bg-dark-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(image.src)}
                className="relative overflow-hidden rounded-lg cursor-pointer group aspect-square"
              >
                {image.type === 'video' ? (
                  <video
                    src={image.src}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                ) : (
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm text-primary">{image.category}</p>
                    {image.type === 'video' && (
                      <p className="text-xs text-gray-400 mt-1">🎬 Video</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 cursor-pointer"
        >
          {filteredImages.find(img => img.src === selectedImage)?.type === 'video' ? (
            <motion.video
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImage}
              controls
              autoPlay
              className="max-w-full max-h-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-4xl hover:text-primary transition-colors"
          >
            ×
          </button>
        </motion.div>
      )}

      <Footer />
    </main>
  );
}

