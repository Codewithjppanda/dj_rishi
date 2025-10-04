'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, 
  FaPause, 
  FaStepForward, 
  FaStepBackward, 
  FaVolumeUp, 
  FaVolumeMute,
  FaRandom,
  FaRedo,
  FaHeart,
  FaList,
  FaExpand,
  FaCompress
} from 'react-icons/fa';

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

interface SpotifyPlayerProps {
  tracks: Track[];
  currentTrack: number;
  onTrackChange?: (index: number) => void;
  autoPlay?: boolean;
}

export default function SpotifyPlayer({ 
  tracks, 
  currentTrack, 
  onTrackChange,
  autoPlay = false 
}: SpotifyPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentTrackData = tracks[currentTrack];

  // Auto-play when track changes if autoPlay is true
  useEffect(() => {
    if (autoPlay && currentTrackData) {
      const timer = setTimeout(() => {
        togglePlayPause();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentTrack, autoPlay]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, repeatMode]);

  // Load new track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrackData) return;

    // Pause current track
    audio.pause();
    setIsPlaying(false);
    
    // Load new track
    audio.src = currentTrackData.src;
    audio.volume = volume;
    setCurrentTime(0);
    setDuration(0);
    
    // Load the audio
    audio.load();
  }, [currentTrack, currentTrackData]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrackData) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error('Play error:', err);
      });
    }
  }, [isPlaying, currentTrackData]);

  const nextTrack = useCallback(() => {
    if (tracks.length === 0) return;
    
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentTrack + 1) % tracks.length;
    }
    
    onTrackChange?.(nextIndex);
  }, [currentTrack, tracks.length, isShuffled, onTrackChange]);

  const previousTrack = useCallback(() => {
    if (tracks.length === 0) return;
    
    const prevIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    onTrackChange?.(prevIndex);
  }, [currentTrack, tracks.length, onTrackChange]);

  const seekTo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar || !duration) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(newVolume);
    audio.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes: ('none' | 'one' | 'all')[] = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const selectTrack = (index: number) => {
    onTrackChange?.(index);
    setShowPlaylist(false);
  };

  if (!currentTrackData) {
    return null;
  }

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Main Player */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border-t border-dark-700 text-white z-50 transition-all duration-300 ${
          isExpanded ? 'h-80' : 'h-auto'
        }`}
      >
        {/* Expanded Player Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 border-b border-dark-700"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-6">
                  {/* Large Album Art */}
                  <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                    <div className="text-6xl">🎵</div>
                  </div>
                  
                  {/* Track Details */}
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{currentTrackData.title}</h1>
                    <p className="text-2xl text-gray-300 mb-4">{currentTrackData.artist}</p>
                    <p className="text-lg text-gray-400 mb-6">{currentTrackData.album} • {currentTrackData.genre}</p>
                    
                    {/* Large Progress Bar */}
                    <div className="mb-4">
                      <div 
                        ref={progressRef}
                        onClick={seekTo}
                        className="w-full h-2 bg-dark-600 rounded-full cursor-pointer group"
                      >
                        <div 
                          className="h-full bg-primary rounded-full relative transition-all group-hover:bg-primary/80"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Player */}
        <div className="px-4 py-3">
          {!isExpanded && (
            <div className="mb-3">
              <div 
                ref={progressRef}
                onClick={seekTo}
                className="w-full h-1 bg-dark-600 rounded-full cursor-pointer group"
              >
                <div 
                  className="h-full bg-primary rounded-full relative transition-all group-hover:bg-primary/80"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {/* Track Info */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white truncate">{currentTrackData.title}</h3>
                <p className="text-sm text-gray-400 truncate">{currentTrackData.artist}</p>
              </div>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isExpanded ? <FaCompress /> : <FaExpand />}
              </button>
            </div>

            {/* Main Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleShuffle}
                className={`p-2 rounded-full transition-colors ${
                  isShuffled ? 'text-primary' : 'text-gray-400 hover:text-white'
                }`}
              >
                <FaRandom />
              </button>
              
              <button
                onClick={previousTrack}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FaStepBackward />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
              </button>
              
              <button
                onClick={nextTrack}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FaStepForward />
              </button>
              
              <button
                onClick={toggleRepeat}
                className={`p-2 rounded-full transition-colors relative ${
                  repeatMode !== 'none' ? 'text-primary' : 'text-gray-400 hover:text-white'
                }`}
              >
                <FaRedo />
                {repeatMode === 'one' && (
                  <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
                    1
                  </span>
                )}
              </button>
            </div>

            {/* Volume & Playlist */}
            <div className="flex items-center space-x-4 flex-1 justify-end">
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FaList />
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-dark-600 rounded-full appearance-none cursor-pointer music-slider"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Playlist Sidebar */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-20 w-80 bg-dark-800 border-l border-dark-700 z-40 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Queue</h3>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2">
                {tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    onClick={() => selectTrack(index)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      index === currentTrack
                        ? 'bg-primary/20 border border-primary/30'
                        : 'hover:bg-dark-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-dark-600 rounded flex items-center justify-center text-xs">
                        {index === currentTrack && isPlaying ? (
                          <div className="flex space-x-1">
                            <div className="w-1 h-3 bg-primary animate-pulse" />
                            <div className="w-1 h-2 bg-primary animate-pulse" style={{ animationDelay: '0.1s' }} />
                            <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
                          </div>
                        ) : (
                          <span className="text-gray-400">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{track.title}</p>
                        <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
