'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import {
  FaInstagram,
  FaYoutube,
  FaSpotify,
  FaFacebookF,
  FaTiktok,
  FaTwitter,
  FaSnapchatGhost,
} from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Tours', href: '/tours' },
    { name: 'Music', href: '/music' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
\ \ \ \ \{\ icon:\ FaInstagram,\ href:\ 'https://www\.instagram\.com/dj_rishi__\?igsh=MTRkdWxid3dzZWJrcA==',\ label:\ 'Instagram'\ },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
    { icon: FaSpotify, href: '#', label: 'Spotify' },
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaTiktok, href: '#', label: 'TikTok' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaSnapchatGhost, href: '#', label: 'Snapchat' },
    { icon: SiApplemusic, href: '#', label: 'Apple Music' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" passHref legacyBehavior>
              <motion.a
                className="text-2xl font-bold tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DJ <span className="text-primary">Rishi</span>
              </motion.a>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <Link key={item.name} href={item.href} passHref legacyBehavior>
                  <motion.a
                    className="text-sm uppercase tracking-wider hover:text-primary transition-colors"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.name}
                  </motion.a>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-2xl z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 w-full h-screen bg-dark-900 z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {menuItems.map((item, index) => (
                <Link key={item.name} href={item.href} passHref legacyBehavior>
                  <motion.a
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-semibold hover:text-primary transition-colors"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.a>
                </Link>
              ))}

              {/* Social Links in Mobile Menu */}
              <div className="flex flex-wrap justify-center gap-4 mt-12 px-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="text-2xl hover:text-primary transition-colors"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



