"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Send, CheckCircle, Loader2 } from "lucide-react";

const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xqabwwpn");

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
          <p className="text-gray-300 text-lg">
            Thank you for reaching out! I&apos;ll get back to you within 24 hours.
          </p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Send Another Message
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
          Send Me a Message
        </h2>
        <p className="text-gray-400">
          Fill out the form below and I&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="group"
        >
          <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
            Your Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
            </div>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-500/50 focus:bg-gray-700/70"
              placeholder="Enter your full name"
              required
            />
          </div>
          <ValidationError 
            prefix="Name" 
            field="name" 
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="group"
        >
          <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-500/50 focus:bg-gray-700/70"
              placeholder="Enter your email address"
              required
            />
          </div>
          <ValidationError 
            prefix="Email" 
            field="email" 
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </motion.div>

        {/* Subject Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="group"
        >
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-500/50 focus:bg-gray-700/70"
            placeholder="What's this about?"
          />
          <ValidationError 
            prefix="Subject" 
            field="subject" 
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </motion.div>

        {/* Message Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="group"
        >
          <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
            Message
          </label>
          <div className="relative">
            <div className="absolute top-3 left-4 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
            </div>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-500/50 focus:bg-gray-700/70 resize-none"
              placeholder="Tell me about your project or ideas..."
              required
            />
          </div>
          <ValidationError 
            prefix="Message" 
            field="message" 
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <div className="flex items-center justify-center space-x-2">
              {state.submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </div>
          </button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-4"
        >
          <p className="text-sm text-gray-400">
            By sending this message, you agree to be contacted regarding your inquiry.
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;

