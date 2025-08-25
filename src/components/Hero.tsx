"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.1 },
              },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Hi, I&apos;m{" "}
              <motion.span 
                className="text-blue-400"
                initial={{ opacity:0, y: 20 }}
                animate={{ opacity:1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                Nitish
              </motion.span>
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="mt-6 text-xl text-gray-300 leading-relaxed max-w-xl" // Increased mt and max-width
            >
              A passionate developer building modern web applications and 
              digital experiences that solve real-world problems.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="mt-10 flex flex-wrap gap-4" // Increased mt
            >
              <Link
                href="/projects"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 button-hover-effect text-lg" // Increased padding, font-semibold, text-lg
              >
                View Projects <FaArrowRight className="ml-2" />
              </Link>
              <a
                href="https://github.com/nitishsghh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300 button-hover-effect text-lg" // Increased padding, font-semibold, text-lg
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }}
            className="hidden md:block"
          >
            <div className="relative group"> {/* Added group for potential hover effects on children */}
              <motion.div 
                className="w-full h-80 bg-blue-600/20 rounded-xl backdrop-blur-md border border-gray-700 shadow-2xl flex items-center justify-center" // Increased shadow, blur
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(59, 130, 246, 0.4)"}}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <span className="text-7xl">👨‍💻</span>
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -right-6 w-40 h-40 bg-gray-700/80 rounded-lg backdrop-blur-md border border-gray-600 flex items-center justify-center shadow-xl" // Increased size, shadow, blur
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <span className="text-5xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decorative elements with subtle animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10"> {/* Ensure it's behind content */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" /* Reduced opacity */
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 10, -10, 0],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" /* Reduced opacity */
          animate={{ 
            scale: [1, 1.05, 1],
            y: [0, -10, 10, 0],
            opacity: [0.05, 0.07, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
    </section>
  );
};

export default Hero;