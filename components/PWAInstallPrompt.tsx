'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes, FaMobileAlt } from 'react-icons/fa';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Show install prompt after a delay
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app was installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't show again for 7 days
    localStorage.setItem('pwaInstallDismissed', Date.now().toString());
  };

  // Don't show if already installed or dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('pwaInstallDismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        setShowInstallPrompt(false);
      }
    }
  }, []);

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <>
          {/* Android/Chrome Install Prompt */}
          {!isIOS && deferredPrompt && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-20 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[60] bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 backdrop-blur-lg"
            >
              <div className="p-4 sm:p-5">
                <button
                  onClick={handleDismiss}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1"
                  aria-label="Dismiss"
                >
                  <FaTimes className="text-sm" />
                </button>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMobileAlt className="text-white text-xl sm:text-2xl" />
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1">
                      Install Music App
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                      Get the full experience! Install DJ Rishi Music on your device for offline access and better performance.
                    </p>

                    <div className="flex space-x-2 sm:space-x-3">
                      <button
                        onClick={handleInstallClick}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <FaDownload className="text-sm" />
                        <span>Install</span>
                      </button>
                      <button
                        onClick={handleDismiss}
                        className="px-4 sm:px-5 py-2.5 sm:py-3 bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-white font-semibold rounded-lg transition-all text-sm sm:text-base"
                      >
                        Later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* iOS Install Instructions */}
          {isIOS && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-20 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[60] bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 backdrop-blur-lg"
            >
              <div className="p-4 sm:p-5">
                <button
                  onClick={handleDismiss}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1"
                  aria-label="Dismiss"
                >
                  <FaTimes className="text-sm" />
                </button>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMobileAlt className="text-white text-xl sm:text-2xl" />
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                      Add to Home Screen
                    </h3>
                    <div className="text-gray-300 text-xs sm:text-sm space-y-2 mb-4">
                      <p className="flex items-center space-x-2">
                        <span className="text-primary font-bold">1.</span>
                        <span>Tap the Share button <span className="inline-block">📤</span></span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="text-primary font-bold">2.</span>
                        <span>Scroll and tap &quot;Add to Home Screen&quot;</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="text-primary font-bold">3.</span>
                        <span>Tap &quot;Add&quot; to install</span>
                      </p>
                    </div>

                    <button
                      onClick={handleDismiss}
                      className="w-full bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all text-sm sm:text-base"
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

