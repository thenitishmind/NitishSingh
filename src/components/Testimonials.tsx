"use client";

import { useState } from "react"; // Removed useRef
import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "@/lib/github";

const Testimonials = () => {
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Developer Testimonials
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            What fellow developers say about working with me
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 relative"
            >
              <div className="absolute top-6 left-6 text-blue-400 opacity-20">
                <FaQuoteLeft className="w-10 h-10" />
              </div>
              
              <div className="mb-6 relative z-10">
                <p className="text-gray-300 italic">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
              
              <div className="flex items-center">
                <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={imageErrors[testimonial.id] 
                      ? "/images/default-avatar.jpg" 
                      : encodeURI(testimonial.avatar)}
                    alt={testimonial.name}
                    className="object-cover"
                    fill
                    sizes="48px"
                    onError={() => handleImageError(testimonial.id)}
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 