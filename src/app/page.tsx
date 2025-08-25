"use client"; // Required for framer-motion components

import Hero from "@/components/Hero";
import ImageSlider from "@/components/ImageSlider";
import ProjectsSection from "@/components/ProjectsSection";
import Testimonials from "@/components/Testimonials";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2, // Stagger children animations if any
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen overflow-x-hidden"> {/* Added overflow-x-hidden */}
      <Hero />
      
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is in view
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={childVariants} className="text-center mb-16"> {/* Increased mb */}
          <motion.h2 variants={childVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Work
          </motion.h2>
          <motion.div
            variants={childVariants}
            className="w-24 h-1.5 bg-blue-500 mx-auto mb-8" // Increased height and mb
          ></motion.div>
          <motion.p variants={childVariants} className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Explore some of my highlighted projects and achievements
          </motion.p>
        </motion.div>
        <motion.div variants={childVariants}>
          <ImageSlider />
        </motion.div>
      </motion.section>
      
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <ProjectsSection />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Testimonials />
      </motion.div>

    </div>
  );
}
