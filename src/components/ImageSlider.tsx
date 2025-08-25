"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaGithub, FaCode, FaReact, FaServer, FaMobile } from "react-icons/fa";
import Link from "next/link"; // Added Link import

// Slides data with content and gradient backgrounds
const slides = [
  {
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
    title: "Web Development",
    description: "Creating responsive and modern web applications with React, Next.js and TypeScript",
    link: "/projects",
    icon: <FaReact size={48} className="text-blue-300" />
  },
  {
    gradient: "bg-gradient-to-r from-teal-500 to-green-600",
    title: "Full Stack Solutions",
    description: "Building end-to-end applications with robust backend systems and intuitive frontends",
    link: "/projects",
    icon: <FaServer size={48} className="text-teal-300" />
  },
  {
    gradient: "bg-gradient-to-r from-orange-500 to-pink-600",
    title: "Mobile-First Approach",
    description: "Designing applications that work flawlessly across all devices and screen sizes",
    link: "/projects",
    icon: <FaMobile size={48} className="text-orange-300" />
  },
  {
    gradient: "bg-gradient-to-r from-purple-500 to-indigo-600",
    title: "GitHub Integration",
    description: "Connecting with GitHub to display my latest repositories and coding activity",
    link: "https://github.com/nitishsghh",
    icon: <FaGithub size={48} className="text-purple-300" />
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, []);

  const setSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentSlide = slides[currentIndex];

  // Background patterns for visual interest
  const patterns = [
    <div key="pattern1" className="absolute top-5 right-5 w-20 h-20 rounded-full bg-white opacity-10"></div>,
    <div key="pattern2" className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white opacity-5"></div>,
    <div key="pattern3" className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-white opacity-5"></div>,
    <div key="pattern4" className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-white opacity-10"></div>,
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className={`absolute w-full h-full ${currentSlide.gradient}`}
        >
          {/* Background patterns */}
          {patterns}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-4 max-w-4xl">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-black bg-opacity-20 flex items-center justify-center">
                  {currentSlide.icon}
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {currentSlide.title}
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white text-opacity-90">
                {currentSlide.description}
              </p>
              {currentSlide.link.startsWith("http") ? (
                <a
                  href={currentSlide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black bg-opacity-30 text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-40 transition duration-300 border border-white border-opacity-20"
                >
                  {currentSlide.link.includes("github") ? (
                    <>
                      <FaGithub className="mr-2" /> View GitHub
                    </>
                  ) : (
                    <>
                      <FaCode className="mr-2" /> Explore Projects
                    </>
                  )}
                </a>
              ) : (
                <Link
                  href={currentSlide.link}
                  className="inline-flex items-center bg-black bg-opacity-30 text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-40 transition duration-300 border border-white border-opacity-20"
                >
                  <FaCode className="mr-2" /> Explore Projects
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-10 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-10 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? "bg-white scale-100"
                : "bg-white bg-opacity-50 scale-75 hover:scale-90 hover:bg-opacity-70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentIndex === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;