"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaClock, FaStar, FaRocket, FaCode, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import { Project } from "@/types";
import ProjectCard from "@/components/ProjectCard";
import { getGithubProjects } from "@/lib/github";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchLiveProjectData = async () => {
    try {
      // Fetch from your Vercel API endpoint
      const response = await fetch('/api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const liveData = await response.json();
        return liveData;
      } else {
        // Fallback to GitHub data if API fails
        console.warn('Live API failed, falling back to GitHub data');
        return await getGithubProjects();
      }
    } catch (error) {
      console.warn('Live API error, falling back to GitHub data:', error);
      return await getGithubProjects();
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchLiveProjectData();
        
        // Sort by updated date for recent projects
        const sortedByRecent = [...data].sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        
        // Get 3 most recent projects
        setRecentProjects(sortedByRecent.slice(0, 3));
        
        // Sort by stars for featured projects
        const sortedByStars = [...data].sort((a, b) => b.stargazers_count - a.stargazers_count);
        // Get projects for the main grid, excluding the most recent ones
        const recentIds = sortedByRecent.slice(0, 3).map(p => p.id);
        const featuredProjects = sortedByStars
          .filter(p => !recentIds.includes(p.id))
          .slice(0, 6); // Increased to 6 for better grid
        
        setProjects(featuredProjects);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.language === 'JavaScript' || project.language === 'TypeScript';
    if (activeFilter === 'mobile') return project.language === 'Java' || project.language === 'Swift';
    if (activeFilter === 'backend') return project.language === 'Python' || project.language === 'Node.js';
    return true;
  });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-500/20">
            <FaRocket className="mr-2" />
            Live Projects
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
            My Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover my latest work featuring modern web applications, innovative solutions, and cutting-edge technologies.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { key: 'all', label: 'All Projects', icon: FaCode },
            { key: 'web', label: 'Web Apps', icon: FaGlobe },
            { key: 'mobile', label: 'Mobile', icon: FaRocket },
            { key: 'backend', label: 'Backend', icon: FaStar }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/30'
              }`}
            >
              <Icon className="mr-2 text-sm" />
              {label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-red-400 text-4xl mb-4">⚠️</div>
              <p className="text-red-300 text-lg">{error}</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Recent Projects Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-3 rounded-full border border-blue-500/30">
                  <FaClock className="text-blue-400 mr-3 text-lg" />
                  <h3 className="text-2xl font-bold text-white">Latest Work</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} isRecent={true} />
                ))}
              </div>
            </motion.div>
            
            {/* Featured Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-6 py-3 rounded-full border border-purple-500/30">
                  <FaStar className="text-purple-400 mr-3 text-lg" />
                  <h3 className="text-2xl font-bold text-white">Featured Projects</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index + 3} />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 text-center"
            >
              <Link
                href="/projects"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transform hover:-translate-y-1"
              >
                <span>Explore All Projects</span>
                <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection; 