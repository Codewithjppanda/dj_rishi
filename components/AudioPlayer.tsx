'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set the starting point to 15 seconds
    const handleLoadedData = () => {
      audio.currentTime = 15;
      setIsLoaded(true);
      
      // Attempt to autoplay
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Autoplay prevented:', error);
            // If autoplay is blocked, user will need to click play button
            setIsPlaying(false);
          });
      }
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => {
      // Loop back to 15 seconds when song ends
      audio.currentTime = 15;
      audio.play();
    });

    // Load the audio
    audio.load();

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('play', () => setIsPlaying(true));
      audio.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/blastoyz-mandala-128-ytshorts.savetube.me.mp3"
        preload="auto"
      />

      {/* Floating audio controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
      >
        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlayPause}
          className="relative w-16 h-16 bg-primary rounded-full shadow-2xl hover:bg-primary/90 transition-all flex items-center justify-center group overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Animated background pulse when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-primary rounded-full"
              />
            )}
          </AnimatePresence>

          {/* Icon */}
          <div className="relative z-10 text-white text-2xl">
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </div>

          {/* Tooltip */}
          <div className="absolute -top-12 right-0 bg-dark-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </div>
        </motion.button>

        {/* Mute/Unmute Button */}
        <motion.button
          onClick={toggleMute}
          className="relative w-12 h-12 bg-dark-800 rounded-full shadow-lg hover:bg-dark-700 transition-all flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          <div className="relative z-10 text-white text-lg">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </div>

          {/* Tooltip */}
          <div className="absolute -top-12 right-0 bg-dark-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isMuted ? 'Unmute' : 'Mute'}
          </div>
        </motion.button>

        {/* Now Playing Label */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute -left-44 top-4 bg-dark-800/95 backdrop-blur-sm text-white text-xs px-4 py-3 rounded-lg shadow-lg border border-primary/20"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <span className="font-medium">Now Playing</span>
              </div>
              <div className="text-gray-400 mt-1">Blastoyz - Mandala</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
