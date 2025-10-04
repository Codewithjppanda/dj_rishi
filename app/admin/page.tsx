'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUploadThing } from '@/lib/uploadthing';
import { FaUpload, FaTrash, FaLock, FaImages, FaMusic, FaPlay } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import VideoPlayer from '@/components/VideoPlayer';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  uploadedAt: string;
  type?: 'image' | 'video';
}

interface MusicTrack {
  id: string;
  src: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  uploadedAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Festivals');
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileType, setFileType] = useState<'images' | 'videos' | 'music'>('images');
  const [activeTab, setActiveTab] = useState<'gallery' | 'music'>('gallery');
  
  // Music-specific fields
  const [musicTitle, setMusicTitle] = useState('');
  const [artist, setArtist] = useState('DJ Rishi');
  const [album, setAlbum] = useState('Single');
  const [genre, setGenre] = useState('Electronic');

  const { startUpload: startImageUpload } = useUploadThing("imageUploader");
  const { startUpload: startVideoUpload } = useUploadThing("videoUploader");
  const { startUpload: startAudioUpload } = useUploadThing("audioUploader");

  // Simple password (in production, use proper authentication)
  const ADMIN_PASSWORD = 'djrishi2024'; // Change this to your desired password

  useEffect(() => {
    if (isAuthenticated) {
      fetchImages();
      fetchMusic();
    }
  }, [isAuthenticated]);

  const fetchImages = async () => {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    setImages(data);
  };

  const fetchMusic = async () => {
    const res = await fetch('/api/music');
    const data = await res.json();
    setMusicTracks(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      alert('Please select files');
      return;
    }

    if (fileType === 'music' && !musicTitle) {
      alert('Please enter a track title');
      return;
    }

    if ((fileType === 'images' || fileType === 'videos') && !title) {
      alert('Please enter a title');
      return;
    }

    setUploading(true);
    try {
      let uploadFunction;
      let successMessage;

      switch (fileType) {
        case 'images':
          uploadFunction = startImageUpload;
          successMessage = 'Images uploaded successfully!';
          break;
        case 'videos':
          uploadFunction = startVideoUpload;
          successMessage = 'Videos uploaded successfully!';
          break;
        case 'music':
          uploadFunction = startAudioUpload;
          successMessage = 'Music tracks uploaded successfully!';
          break;
        default:
          throw new Error('Invalid file type');
      }

      const uploadedFiles = await uploadFunction(selectedFiles);
      
      if (uploadedFiles) {
        alert(successMessage);
        setTitle('');
        setMusicTitle('');
        setSelectedFiles([]);
        
        // Wait a bit for processing
        setTimeout(() => {
          if (fileType === 'music') {
            fetchMusic();
          } else {
            fetchImages();
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed!');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    
    fetchImages();
  };

  const handleDeleteMusic = async (id: string) => {
    if (!confirm('Are you sure you want to delete this track?')) return;
    
    await fetch('/api/music', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    
    fetchMusic();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-dark-700"
        >
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <FaLock className="text-4xl text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
            <p className="text-gray-400">Enter password to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary text-white"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold"
          >
            <span className="text-primary">Admin Panel</span>
          </motion.h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'gallery'
                ? 'bg-primary text-white'
                : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
            }`}
          >
            <FaImages className="inline mr-2" />
            Gallery Management
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'music'
                ? 'bg-primary text-white'
                : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
            }`}
          >
            <FaMusic className="inline mr-2" />
            Music Management
          </button>
        </div>

        {activeTab === 'gallery' && (
          <>
            {/* Gallery Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 p-6 rounded-xl mb-8 border border-dark-700"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaUpload className="text-primary" />
                Upload Media
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Media title"
                  className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary text-white"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary text-white"
                >
                  <option>Festivals</option>
                  <option>Live</option>
                  <option>Studio</option>
                  <option>Promo</option>
                  <option>Branding</option>
                </select>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as 'images' | 'videos' | 'music')}
                  className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary text-white"
                >
                  <option value="images">Images</option>
                  <option value="videos">Videos</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block w-full px-4 py-8 bg-dark-700 border-2 border-dashed border-dark-600 rounded-lg cursor-pointer hover:border-primary transition-all text-center">
                  <FaImages className="text-4xl text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-400">
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : `Click to select ${fileType}`}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept={fileType === 'images' ? 'image/*' : 'video/*'}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={handleUpload}
                disabled={uploading || !selectedFiles.length}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : `Upload ${fileType === 'images' ? 'Images' : 'Videos'}`}
              </button>
            </motion.div>

            {/* Gallery Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800 p-6 rounded-xl border border-dark-700"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaImages className="text-primary" />
                Uploaded Media ({images.length})
              </h2>

              {images.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No media uploaded yet</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative group"
                    >
                      {image.type === 'video' ? (
                        <div className="w-full aspect-square rounded-lg overflow-hidden">
                          <VideoPlayer
                            src={image.src}
                            title={image.title}
                            thumbnail={true}
                            controls={false}
                          />
                        </div>
                      ) : (
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all rounded-lg flex flex-col items-center justify-center p-4">
                        <p className="text-white font-semibold text-sm mb-1">{image.title}</p>
                        <p className="text-primary text-xs mb-3">{image.category}</p>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm flex items-center gap-2 transition-all"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}

        {activeTab === 'music' && (
          <>
            {/* Music Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 p-6 rounded-xl mb-8 border border-dark-700"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaMusic className="text-primary" />
                Upload High-Quality Music
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={musicTitle}
                  onChange={(e) => setMusicTitle(e.target.value)}
                  placeholder="Track title"
                  className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary text-white"
                />
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Artist name"
                  className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary text-white"
                />
                <input
                  type="text"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  placeholder="Album name"
                  className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary text-white"
                />
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary text-white"
                >
                  <option>Electronic</option>
                  <option>Progressive House</option>
                  <option>Techno</option>
                  <option>Deep House</option>
                  <option>Big Room</option>
                  <option>Melodic Techno</option>
                  <option>Trance</option>
                  <option>Dubstep</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block w-full px-4 py-8 bg-dark-700 border-2 border-dashed border-dark-600 rounded-lg cursor-pointer hover:border-primary transition-all text-center">
                  <FaMusic className="text-4xl text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-400">
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} audio file(s) selected`
                      : 'Click to select high-quality audio files'}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">
                    Supports: MP3, WAV, FLAC, AAC, OGG, M4A (up to 128MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="audio/*,.mp3,.wav,.flac,.aac,.ogg,.m4a"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={() => {
                  setFileType('music');
                  handleUpload();
                }}
                disabled={uploading || !selectedFiles.length}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading High-Quality Audio...' : 'Upload Music Tracks'}
              </button>
            </motion.div>

            {/* Music Library Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800 p-6 rounded-xl border border-dark-700"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaMusic className="text-primary" />
                Music Library ({musicTracks.length} tracks)
              </h2>

              {musicTracks.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No music tracks uploaded yet</p>
              ) : (
                <div className="space-y-4">
                  {musicTracks.map((track, index) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <FaMusic className="text-primary" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{track.title}</h3>
                          <p className="text-gray-400 text-sm">
                            {track.artist} • {track.album} • {track.genre}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Uploaded: {new Date(track.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => window.open(track.src, '_blank')}
                          className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <FaPlay />
                        </button>
                        <button
                          onClick={() => handleDeleteMusic(track.id)}
                          className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

