"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaUsers, FaCode, FaStar, FaGraduationCap, FaBriefcase, FaUserAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";
import { getGithubUser } from "@/lib/github";
import { GithubUser } from "@/types";
import Image from "next/image";

export default function AboutPage() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Corrected destructuring to use error
  const [activeTab, setActiveTab] = useState("introduction");
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    const fetchGithubProfile = async () => {
      try {
        setLoading(true);
        const data = await getGithubUser();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch GitHub profile:", err);
        setError("Failed to load GitHub profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchGithubProfile();
  }, []);

  // Skills data
  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "HTML5/CSS3", level: 95 },
    { name: "React.js", level: 85 },
    { name: "MongoDB", level: 75 },
    { name: "MySQL", level: 70 },
    { name: "Python", level: 65 },
    { name: "C++", level: 60 },
    { name: "Bootstrap", level: 90 },
    { name: "Git/GitHub", level: 85 },
    { name: "Responsive Design", level: 90 },
  ];

  // Education data
  const education = [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Glocal University",
      period: "2016 - 2019",
      details: "Specialized in Computer Science. Graduated with a CGPA of 7.70.",
    },
    {
      degree: "12th Grade (Higher Secondary)",
      institution: "Science Stream",
      period: "2015 - 2016",
      details: "Focused on Physics, Chemistry, and Mathematics. Secured 78%.",
    },
    {
      degree: "10th Grade",
      institution: "Secondary Education",
      period: "2013 - 2014",
      details: "Secured 75% in core subjects including Mathematics and Science.",
    },
  ];

  // Experience data
  const experience = [
    {
      title: "Full Stack Developer at Bizloan Pvt Ltd",
      period: "Working",
      details: [
        "Developing and maintaining web applications for financial services",
        "Collaborating with cross-functional teams to deliver scalable solutions",
        "Implementing secure coding practices for financial data handling",
        "Optimizing application performance and user experience",
        "Full-stack web development with expertise in both frontend and backend technologies",
        "Database design, optimization, and management",
        "Experience with modern web frameworks and development tools",
        "Responsive web design and cross-platform compatibility",
        "Working with technologies including React, Python, MySQL, MongoDB, etc.",
        "Developing various types of projects including e-commerce, fintech, and web applications"
      ],
      location: "DLF, 132, Qutab Plaza Road, DLF Phase 1, Sector 26A, Gurugram, Haryana 122002"
    },
    {
      title: "Freelance Web Developer",
      period: "2022 - Present (1 Year 3 Months)",
      details: [
        "Website Development: Designed and developed responsive websites using HTML, CSS, JavaScript, and Bootstrap. Used React.js for creating interactive front-end user interfaces.",
        "Backend Development: Gained experience in server-side programming and integrated RESTful APIs.",
        "Database Management: Used MongoDB and MySQL to manage databases and performed CRUD operations efficiently.",
        "Full-Stack Projects: Completed full-stack applications including e-commerce platforms, portfolio websites, blog systems, and admin dashboards.",
        "Version Control: Used Git and GitHub for source code management and version control.",
        "Deployment & Hosting: Deployed projects using Netlify, Vercel, and Heroku.",
        "Client Communication: Interacted with clients, gathered requirements, managed timelines, and delivered projects successfully."
      ],
    },
  ];

  // Avatar fallback component
  const AvatarFallback = () => {
    const initials = user?.name ? user.name.charAt(0) : "N";
    return (
      <div className="w-full h-full bg-blue-600 flex items-center justify-center">
        <span className="text-white text-2xl font-bold">{initials}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !user) { // Display error if fetching failed and no user data
    return (
      <div className="min-h-screen bg-gray-900 py-16 flex justify-center items-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 p-6 sticky top-24">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                  {avatarError ? (
                    <AvatarFallback />
                  ) : (
                    <div className="w-full h-full relative">
                      <Image 
                        src={user?.avatar_url || "/images/default-avatar.jpg"} 
                        alt={user?.name || "Nitish Singh"}
                        fill
                        className="object-cover rounded-full"
                        onError={() => setAvatarError(true)}
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">{user?.name || "Nitish Singh"}</h1>
                <p className="text-gray-400 mb-4">Freelance Web Developer</p>
                
                <a
                  href="https://github.com/nitishsghh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg mb-6 hover:bg-gray-600 transition duration-300 w-full justify-center"
                >
                  <FaGithub className="mr-2" /> GitHub Profile
                </a>
                
                <div className="grid grid-cols-3 w-full text-center border-t border-gray-700 pt-4">
                  <div>
                    <div className="flex items-center justify-center text-blue-400 mb-1">
                      <FaCode className="mr-1" />
                    </div>
                    <p className="text-xl font-bold text-white">{user?.public_repos || 0}</p>
                    <p className="text-xs text-gray-400">Repositories</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-blue-400 mb-1">
                      <FaUsers className="mr-1" />
                    </div>
                    <p className="text-xl font-bold text-white">{user?.followers || 0}</p>
                    <p className="text-xs text-gray-400">Followers</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-blue-400 mb-1">
                      <FaStar className="mr-1" />
                    </div>
                    <p className="text-xl font-bold text-white">{user?.following || 0}</p>
                    <p className="text-xs text-gray-400">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content sections - tabs system */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab("introduction")}
                className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                  activeTab === "introduction" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <FaUserAlt className="inline mr-2" /> Introduction
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                  activeTab === "education" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <FaGraduationCap className="inline mr-2" /> Education
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                  activeTab === "experience" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <FaBriefcase className="inline mr-2" /> Experience
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                  activeTab === "skills" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <FaCode className="inline mr-2" /> Skills
              </button>
              <button
                onClick={() => setActiveTab("leetcode")}
                className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                  activeTab === "leetcode"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <SiLeetcode className="inline mr-2" /> LeetCode
              </button>
            </div>
            
            {/* Introduction Section */}
            {activeTab === "introduction" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
                <div className="text-gray-300 space-y-4">
                  <p>
                    Hi, I&apos;m Nitish A passionate developer building modern web applications and digital experiences that solve real-world problems.
                  </p>
                  <p>
                    As a freelance developer for over a year, I have designed and built a range of web applications—from simple websites to complex full-stack systems. I enjoy creating responsive, user-friendly interfaces that address real-world problems.
                  </p>
                  <p>
                    I am eager to continue growing as a developer by working on innovative projects, learning 
                    new technologies, and contributing to meaningful software solutions. I aim to work in a 
                    dynamic environment where I can apply my skills and gain more professional experience in 
                    full-stack development or software engineering.
                  </p>
                </div>
              </motion.section>
            )}
            
            {/* Education Section */}
            {activeTab === "education" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
                <div className="relative border-l-2 border-gray-700 pl-8 ml-4">
                  {education.map((item, index) => (
                    <div key={index} className="mb-10 relative">
                      <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-blue-600 border-4 border-gray-800 flex items-center justify-center">
                        <span className="text-white text-xs">
                          <FaGraduationCap />
                        </span>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
                        <p className="text-blue-400">{item.institution}</p>
                        <p className="text-gray-400 text-sm mb-2">{item.period}</p>
                        <p className="text-gray-300">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
            
            {/* Experience Section */}
            {activeTab === "experience" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Professional Experience</h2>
                <div className="relative border-l-2 border-gray-700 pl-8 ml-4">
                  {experience.map((item, index) => (
                    <div key={index} className="mb-10 relative">
                      <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-blue-600 border-4 border-gray-800 flex items-center justify-center">
                        <span className="text-white text-xs">
                          <FaBriefcase />
                        </span>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        {item.location && (
                          <p className="text-blue-400 text-sm">{item.location}</p>
                        )}
                        <p className="text-gray-400 text-sm mb-4">{item.period}</p>
                        <ul className="text-gray-300 list-disc pl-5 space-y-2">
                          {item.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
            
            {/* Skills Section */}
            {activeTab === "skills" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Skills & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
                    <div className="space-y-4">
                      {skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-white">{skill.name}</span>
                            <span className="text-gray-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Frameworks</h3>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <ul className="text-gray-300 list-disc pl-5 space-y-2">
                        <li>React.js</li>
                        <li>Next.js</li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-semibold text-white mt-6 mb-4">Cloud & DevOps</h3>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <ul className="text-gray-300 list-disc pl-5 space-y-2">
                        <li>AWS (Amazon Web Services)</li>
                        <li>Azure</li>
                        <li>Docker</li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-semibold text-white mt-6 mb-4">Certifications</h3>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <ul className="text-gray-300 list-disc pl-5 space-y-2">
                        <li>AWS Certified Cloud Practitioner</li>
                        <li>Microsoft Certified: Azure Fundamentals</li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-semibold text-white mt-6 mb-4">Soft Skills & Others</h3>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <ul className="text-gray-300 list-disc pl-5 space-y-2">
                        <li>Time management and organization</li>
                        <li>Team collaboration and communication</li>
                        <li>Problem-solving and analytical thinking</li>
                        <li>Self-learning and adaptability</li>
                        <li>Client communication</li>
                        <li>Project management</li>
                        <li>Deployment: Netlify, Vercel, Heroku</li>
                        <li>Tools: VS Code, Postman, Git/GitHub</li>
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </motion.section>
            )}

            {/* LeetCode Section */}
            {activeTab === "leetcode" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-4">LeetCode Profile</h2>
                <div className="text-gray-300 space-y-4">
                  <p>
                    I actively solve problems on LeetCode to sharpen my algorithmic thinking and data structure skills.
                    You can view my LeetCode profile to see my progress and solved problems.
                  </p>
                  <a
                    href="https://leetcode.com/u/Itsnitishsingh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
                  >
                    <SiLeetcode className="mr-2" /> Visit LeetCode Profile
                  </a>
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}