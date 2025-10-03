'use client';

import { motion } from 'framer-motion';
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

export default function Footer() {
  const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/dj_rishi__?igsh=MTRkdWxid3dzZWJrcA==', label: 'Instagram' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
    { icon: FaSpotify, href: '#', label: 'Spotify' },
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaTiktok, href: '#', label: 'TikTok' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaSnapchatGhost, href: '#', label: 'Snapchat' },
    { icon: SiApplemusic, href: '#', label: 'Apple Music' },
  ];

  const footerLinks = [
    { name: 'Contact Us', href: '#contact' },
    { name: 'STMPD RCRDS', href: '#' },
    { name: 'STMPD STUDIOS', href: '#' },
  ];

  return (
    <footer id="contact" className="bg-dark-800 py-16 px-6 border-t border-dark-700">
      <div className="container mx-auto max-w-6xl">
        {/* Warning Banner (Martin Garrix style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-12"
        >
          <p className="text-sm text-center text-gray-300">
            We&apos;ve been made aware of fraudulent messages claiming to be from our team, asking for
            payments in exchange for special offers or access. Please note, we will never reach out
            to request payment for any services or experiences. If you receive such a message, it&apos;s
            a scam—stay safe and report it!
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-center text-sm uppercase tracking-wider mb-6 text-gray-400">
            Follow Me
          </h3>
          <div className="flex justify-center flex-wrap gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.2, color: '#E63946' }}
                whileTap={{ scale: 0.9 }}
                className="text-2xl hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {footerLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-400 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gray-400 mb-4">Got any tunes? Rent the studio</p>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center pt-8 border-t border-dark-700"
        >
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} DJ Rishi</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-xs text-gray-500 hover:text-primary transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-primary transition-colors">
              Cookies Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}


