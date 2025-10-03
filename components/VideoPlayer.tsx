'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';

interface VideoPlayerProps {
  src: string;
  title: string;
  thumbnail?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
}

export default function VideoPlayer({ 
  src, 
  title, 
  thumbnail = false, 
  autoPlay = false,
  controls = true,
  className = '' 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      // Seek to 1 second to show a frame
      video.currentTime = 1;
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(err => console.log('Play error:', err));
    } else {
      video.pause();
    }
  };

  return (
    <div className={`relative w-full h-full bg-black group ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={thumbnail}
        preload="metadata"
        controls={controls && !thumbnail}
        onClick={thumbnail ? undefined : (e) => e.stopPropagation()}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full"
            />
            <p className="text-xs text-gray-400">Loading video...</p>
          </div>
        </div>
      )}

      {/* Custom Play/Pause Button for Thumbnails */}
      {thumbnail && (
        <motion.button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-white/95 rounded-full p-6 shadow-2xl backdrop-blur-sm"
          >
            {isPlaying ? (
              <FaPause className="w-8 h-8 text-primary" />
            ) : (
              <FaPlay className="w-8 h-8 text-primary ml-1" />
            )}
          </motion.div>
          
          {/* Video Label */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-white">VIDEO</span>
            </div>
          </div>
        </motion.button>
      )}

      {/* Video Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
    </div>
  );
}

