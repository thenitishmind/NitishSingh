"use client";

import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaCode, FaClock, FaChartBar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Project } from "@/types";
import LiveMetricsDashboard from "./LiveMetricsDashboard";

interface ProjectCardProps {
  project: Project;
  index: number;
  isRecent?: boolean;
}

const ProjectCard = ({ project, index, isRecent = false }: ProjectCardProps) => {
  const [showCode, setShowCode] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if project is recent (updated within the last 30 days)
  const isRecentlyUpdated = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(project.updated_at) > thirtyDaysAgo;
  };

  // Enhanced language color mapping with gradients
  const getLanguageColor = (language: string | null) => {
    if (!language) return 'from-gray-500 to-gray-600';

    const gradientMap: { [key: string]: string } = {
      'JavaScript': 'from-yellow-400 to-yellow-600',
      'TypeScript': 'from-blue-400 to-blue-600',
      'HTML': 'from-orange-400 to-orange-600',
      'HTML/CSS': 'from-orange-400 to-red-500',
      'CSS': 'from-blue-300 to-blue-500',
      'Python': 'from-green-400 to-green-600',
      'Java': 'from-red-400 to-red-600',
      'C++': 'from-purple-400 to-purple-600',
      'C#': 'from-green-500 to-emerald-600',
      'PHP': 'from-indigo-400 to-indigo-600',
      'Ruby': 'from-red-500 to-red-700',
      'Go': 'from-blue-300 to-cyan-500',
      'Rust': 'from-orange-500 to-red-600',
      'Swift': 'from-orange-400 to-red-500',
      'Kotlin': 'from-purple-400 to-indigo-500',
      'Mobile App': 'from-teal-400 to-teal-600',
      'Web': 'from-blue-400 to-cyan-500',
    };
    
    return gradientMap[language] || 'from-gray-400 to-gray-600';
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  // Enhanced code snippet with syntax highlighting simulation
  const codeSnippet = `// ${project.name} - ${project.language || 'JavaScript'}
${project.language === 'TypeScript' ? 'interface ProjectConfig {' : 'const projectConfig = {'}
  name: "${project.name}",
  ${project.language === 'TypeScript' ? 'description: string;' : 'description: "' + (project.description?.slice(0, 30) || 'Amazing project') + '...",'}
  ${project.language === 'TypeScript' ? 'language: string;' : 'language: "' + (project.language || 'JavaScript') + '",'}
  ${project.language === 'TypeScript' ? 'stars: number;' : 'stars: ' + project.stargazers_count + ','}
  ${project.language === 'TypeScript' ? 'forks: number;' : 'forks: ' + project.forks_count}
${project.language === 'TypeScript' ? '}' : '};'}

${project.language === 'Python' ? 'class ' + project.name.replace(/[^a-zA-Z0-9]/g, '') + ':' : 'function initialize() {'}
${project.language === 'Python' ? '    def __init__(self):' : '  // Project initialization'}
${project.language === 'Python' ? '        self.status = "active"' : '  console.log("Project: ' + project.name + '");'}
${project.language === 'Python' ? '        self.deploy()' : '  return { status: "deployed" };'}
${project.language === 'Python' ? '' : '}'}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-700/50 flex flex-col h-full"
      style={{
        background: `linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.9) 100%)`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500"></div>
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 blur-sm transition-all duration-500"></div>
      
      {/* Color accent bar with gradient */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getLanguageColor(project.language)} group-hover:h-2 transition-all duration-300`}></div>
      
      <div className="relative p-8 flex-grow flex flex-col z-10">
        {/* Recent badge with enhanced styling */}
        {(isRecent || isRecentlyUpdated()) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 300 }}
            className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-2 rounded-full flex items-center shadow-lg border border-blue-400/20 z-20"
          >
            <FaClock className="mr-1.5 text-xs" /> 
            <span>Latest</span>
          </motion.div>
        )}
        
        {/* Project header */}
        <div className="mb-6">
          <motion.h3 
            className="text-2xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.1 }}
          >
            {project.name}
          </motion.h3>
          
          {/* Enhanced stats bar */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {project.language && (
              <motion.span
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getLanguageColor(project.language)} shadow-lg border border-white/20`}
              >
                <FaCode className="mr-1.5 text-xs" /> {project.language}
              </motion.span>
            )}
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex items-center gap-4"
            >
              <span className="flex items-center text-yellow-400 font-medium">
                <FaStar className="mr-1.5 text-xs" /> 
                <span className="font-bold">{project.stargazers_count}</span>
              </span>
              <span className="flex items-center text-gray-400 font-medium">
                <FaCodeBranch className="mr-1.5 text-xs" /> 
                <span className="font-bold">{project.forks_count}</span>
              </span>
            </motion.div>
          </div>
        </div>

        {/* Enhanced description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow line-clamp-3"
        >
          {project.description || "An innovative project showcasing modern development practices and cutting-edge technology solutions."}
        </motion.p>
        
        {/* Last updated with better styling */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="text-xs text-gray-400 mb-6 flex items-center"
        >
          <FaClock className="mr-2 text-blue-400" />
          Updated: <span className="font-medium ml-1">{formatDate(project.updated_at)}</span>
        </motion.div>
        
          {/* Enhanced action buttons */}
          <div className="space-y-4">
            {/* Live metrics toggle */}
            {project.demo_available && (
              <motion.button
                onClick={() => setShowMetrics(!showMetrics)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-cyan-600/50 to-blue-600/50 text-cyan-100 rounded-xl hover:from-cyan-600/70 hover:to-blue-600/70 transition-all duration-300 flex items-center justify-center font-medium border border-cyan-500/30 hover:border-cyan-400/50"
              >
                <FaChartBar className="mr-2" />
                <span>{showMetrics ? "Hide Metrics" : "Live Metrics"}</span>
              </motion.button>
            )}

            {/* Links with improved styling */}
            <div className="flex justify-between items-center gap-4">
              <motion.a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20 hover:border-blue-400/40"
              >
                <FaGithub className="mr-2" /> 
                <span>Code</span>
              </motion.a>
              
              {project.homepage && (
                <motion.a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-green-400 hover:text-green-300 font-medium transition-all duration-300 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20 hover:border-green-400/40"
                >
                  <FaExternalLinkAlt className="mr-2" /> 
                  <span>Live</span>
                </motion.a>
              )}
              
              {/* Like button */}
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isLiked 
                    ? 'text-red-400 bg-red-500/20 border border-red-500/30' 
                    : 'text-gray-400 bg-gray-500/10 border border-gray-500/20 hover:text-red-400 hover:bg-red-500/10'
                }`}
              >
                <motion.div
                  animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ❤️
                </motion.div>
              </motion.button>
            </div>

            {/* Enhanced code snippet toggle */}
            <motion.button
              onClick={() => setShowCode(!showCode)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-gray-200 rounded-xl hover:from-gray-600/50 hover:to-gray-500/50 transition-all duration-300 flex items-center justify-center font-medium border border-gray-600/30 hover:border-gray-500/50"
            >
              <FaCode className="mr-2" />
              <span>{showCode ? "Hide Preview" : "Show Preview"}</span>
            </motion.button>
          
            {/* Live Metrics Dashboard */}
            <motion.div
              initial={false}
              animate={{ height: showMetrics ? "auto" : 0, opacity: showMetrics ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {showMetrics && project.demo_available && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <LiveMetricsDashboard 
                    projectId={project.id.toString()} 
                    projectName={project.name}
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Enhanced code snippet display */}
            <motion.div
              initial={false}
              animate={{ height: showCode ? "auto" : 0, opacity: showCode ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {showCode && (
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 overflow-x-auto"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 font-medium">Code Preview</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <pre className="text-gray-300 text-xs leading-relaxed overflow-x-auto">
                    <code className="language-javascript">{codeSnippet}</code>
                  </pre>
                </motion.div>
              )}
            </motion.div>
            
            {/* Enhanced view details button */}
            <motion.a
              href={`/projects/${encodeURIComponent(project.name.toLowerCase().replace(/\s+/g, '-'))}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full block text-center py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-blue-500/30"
            >
              <span className="flex items-center justify-center">
                <span>Explore Project</span>
                <motion.div 
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  →
                </motion.div>
              </span>
            </motion.a>
          </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
