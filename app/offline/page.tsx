'use client';

import { motion } from 'framer-motion';
import { FaWifi, FaMusic, FaSync } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function OfflinePage() {
  const router = useRouter();

  const handleRetry = () => {
    if (navigator.onLine) {
      router.push('/stream');
    } else {
      alert('Still offline. Please check your internet connection.');
    }
  };

  return (
    <main className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Offline Icon Animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <FaWifi className="text-8xl text-gray-600" />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-1 bg-primary rotate-45 transform translate-y-2"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-4">
          You&apos;re <span className="text-primary">Offline</span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg mb-8">
          Oops! It looks like you&apos;ve lost your internet connection. 
          Please check your network and try again.
        </p>

        {/* Music Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <FaMusic className="text-5xl text-primary/50 mx-auto" />
        </motion.div>

        {/* Retry Button */}
        <motion.button
          onClick={handleRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-full transition-all flex items-center justify-center space-x-3 mx-auto shadow-lg shadow-primary/25"
        >
          <FaSync />
          <span>Retry Connection</span>
        </motion.button>

        {/* Additional Info */}
        <p className="text-gray-500 text-sm mt-8">
          Some features may still be available offline if you&apos;ve visited them before.
        </p>
      </motion.div>
    </main>
  );
}

