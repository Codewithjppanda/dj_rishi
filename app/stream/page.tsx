'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpotifyPlayer from '@/components/SpotifyPlayer';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import PWARegister from '@/components/PWARegister';
import { FaPlay, FaPause, FaMusic, FaClock, FaCalendarAlt } from 'react-icons/fa';

interface Track {
  id: string;
  src: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  uploadedAt: string;
}

export default function StreamPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [filter, setFilter] = useState('All');
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/music');
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTracks = filter === 'All' 
    ? tracks 
    : tracks.filter(track => track.genre === filter);

  const genres = ['All', ...Array.from(new Set(tracks.map(track => track.genre)))];

  const handleTrackSelect = (index: number) => {
    const actualIndex = tracks.findIndex(track => track.id === filteredTracks[index].id);
    setCurrentTrack(actualIndex);
    setIsPlayerVisible(true);
  };

  const handleTrackChange = (index: number) => {
    setCurrentTrack(index);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading your music...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-900 pb-32">
      <PWARegister />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-dark-900/80 to-dark-900"></div>
        <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center opacity-20"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🎵
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-primary">Stream</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            High-Quality Music Experience
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-8 text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <FaMusic className="text-primary" />
              <span>{tracks.length} Tracks</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-primary" />
              <span>High Quality</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Genre Filter */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {genres.map((genre) => (
              <motion.button
                key={genre}
                onClick={() => setFilter(genre)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  filter === genre
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {genre}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Track Cards */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          {filteredTracks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🎵</div>
              <h3 className="text-3xl font-semibold text-white mb-4">No tracks available</h3>
              <p className="text-gray-400 text-lg">Check back later for new music releases!</p>
            </motion.div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-white mb-8"
              >
                {filter === 'All' ? 'All Tracks' : filter} 
                <span className="text-primary ml-2">({filteredTracks.length})</span>
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => handleTrackSelect(index)}
                    className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 border border-dark-600 hover:border-primary/30 group"
                  >
                    {/* Album Art Placeholder */}
                    <div className="relative mb-4">
                      <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="text-4xl"
                        >
                          🎵
                        </motion.div>
                      </div>
                      
                      {/* Play Button Overlay */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg backdrop-blur-sm"
                      >
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                          <FaPlay className="text-white text-xl ml-1" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Track Info */}
                    <div className="space-y-2">
                      <h3 className="text-white font-bold text-lg truncate group-hover:text-primary transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {track.artist}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        {track.album}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          {track.genre}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs">
                          <FaCalendarAlt className="mr-1" />
                          {new Date(track.uploadedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-b-xl origin-left"
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Featured Section */}
      {tracks.length > 0 && (
        <section className="py-16 px-6 bg-dark-800/50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-8">
                Ready to <span className="text-primary">Experience</span> the Music?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Click on any track above to start your high-quality streaming experience
              </p>
              
              {!isPlayerVisible && (
                <motion.button
                  onClick={() => handleTrackSelect(0)}
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay className="inline mr-2" />
                  Start Listening Now
                </motion.button>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Spotify-like Player */}
      <AnimatePresence>
        {isPlayerVisible && tracks.length > 0 && (
          <SpotifyPlayer 
            tracks={tracks} 
            currentTrack={currentTrack}
            onTrackChange={handleTrackChange}
            autoPlay={true}
          />
        )}
      </AnimatePresence>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      <Footer />
    </main>
  );
}
