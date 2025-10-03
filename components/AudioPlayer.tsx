'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Default to playing
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const hasUnmuted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Auto-start music on load
    const startMusic = async () => {
      try {
        audio.currentTime = 15;
        audio.volume = 0.7;
        
        // Try unmuted first
        audio.muted = false;
        await audio.play();
        setIsMuted(false);
        setIsPlaying(true);
        hasUnmuted.current = true;
      } catch (error) {
        // If unmuted autoplay fails, play muted
        try {
          audio.muted = true;
          await audio.play();
          setIsMuted(true);
          setIsPlaying(true);
        } catch (err) {
          console.log('Autoplay blocked');
          setIsPlaying(false);
        }
      }
    };

    // Auto-unmute on first user interaction
    const handleFirstInteraction = () => {
      if (!hasUnmuted.current && audio) {
        audio.muted = false;
        setIsMuted(false);
        hasUnmuted.current = true;
        
        // Ensure it's playing
        if (audio.paused) {
          audio.currentTime = 15;
          audio.play().catch(() => {});
        }
      }
    };

    // Start music when audio is ready
    audio.addEventListener('canplay', startMusic, { once: true });
    
    // Listen for first interaction to unmute
    const clickHandler = handleFirstInteraction;
    const touchHandler = handleFirstInteraction;
    const keyHandler = handleFirstInteraction;
    
    document.addEventListener('click', clickHandler, { once: true });
    document.addEventListener('touchstart', touchHandler, { once: true });
    document.addEventListener('keydown', keyHandler, { once: true });

    // Handle play/pause state
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      audio.currentTime = 15;
      audio.play();
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('touchstart', touchHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []); // Fixed: removed isMuted from dependencies

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (audio.currentTime < 15) {
        audio.currentTime = 15;
      }
      audio.muted = false;
      audio.play().then(() => {
        setIsMuted(false);
        hasUnmuted.current = true;
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
    hasUnmuted.current = !audio.muted;
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        preload="auto"
      >
        <source src="/blastoyz-mandala-128-ytshorts.savetube.me.mp3" type="audio/mpeg" />
      </audio>

      {/* Simple notification banner - shows briefly if muted */}
      <AnimatePresence>
        {isMuted && isPlaying && !hasUnmuted.current && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 1 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-primary/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-xl border border-white/20 flex items-center gap-2 text-sm font-medium"
            >
              <span className="text-lg">🎵</span>
              Click anywhere to hear the music
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating audio controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
      >
        {/* Play/Pause Button - Shows Pause by default since music is playing */}
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
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-primary rounded-full"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 bg-primary rounded-full"
                />
              </>
            )}
          </AnimatePresence>

          {/* Icon - Shows PAUSE by default since music auto-plays */}
          <div className="relative z-10 text-white text-2xl">
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </div>

          {/* Tooltip */}
          <div className="absolute -top-12 right-0 bg-dark-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
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
          animate={isMuted && isPlaying && !hasUnmuted.current ? {
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 4px 15px rgba(230, 57, 70, 0.3)',
              '0 4px 25px rgba(230, 57, 70, 0.6)',
              '0 4px 15px rgba(230, 57, 70, 0.3)',
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative z-10 text-white text-lg">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </div>

          {/* Tooltip */}
          <div className="absolute -top-12 right-0 bg-dark-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
            {isMuted ? 'Unmute' : 'Mute'}
          </div>
        </motion.button>

        {/* Now Playing Label */}
        <AnimatePresence>
          {isPlaying && !isMuted && (
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
