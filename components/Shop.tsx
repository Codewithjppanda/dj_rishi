'use client';

import { motion } from 'framer-motion';

const shopCategories = [
  'Signature Collection',
  'Capsule Collection',
  'Festival Flag',
  'Kids',
  'Accessories',
];

const products = [
  {
    name: 'DJ Rishi Tour Hoodie',
    price: '$65',
    image: '/images/gallery1.png',
    category: 'Signature Collection',
  },
  {
    name: 'Limited Edition T-Shirt',
    price: '$35',
    image: '/images/gallery2.png',
    category: 'Capsule Collection',
  },
  {
    name: 'Festival Flag',
    price: '$25',
    image: '/images/gallery3.png',
    category: 'Festival Flag',
  },
];

export default function Shop() {
  return (
    <section id="shop" className="py-20 px-6 bg-dark-900">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-12 text-center"
        >
          Shop
        </motion.h2>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {shopCategories.map((category, index) => (
            <motion.button
              key={category}
              className="px-6 py-2 rounded-full text-sm font-semibold bg-dark-700 text-gray-300 hover:bg-primary hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 bg-dark-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white text-dark-900 px-6 py-3 rounded-full font-semibold"
                  >
                    View Product
                  </motion.button>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-primary font-bold text-lg">{product.price}</p>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            className="inline-block px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary/90 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Shop
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}


