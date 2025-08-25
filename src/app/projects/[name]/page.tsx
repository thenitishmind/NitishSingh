"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaCode } from "react-icons/fa";
import { Project, ProjectReviewKey } from "@/types";
import { getGithubProjects, projectReviews, imageExists, getRandomFallbackImage } from "@/lib/github";
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectName = typeof params.name === 'string' ? params.name : Array.isArray(params.name) ? params.name[0] : '';
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("/images/project-placeholder.jpg");

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectName) {
        setError("Invalid project name");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getGithubProjects();
        const foundProject = data.find(
          (p) => p.name.toLowerCase() === projectName.toLowerCase()
        );
        
        if (foundProject) {
          // Add mock reviews if available
          if (projectReviews[foundProject.name as ProjectReviewKey]) {
            foundProject.reviews = projectReviews[foundProject.name as ProjectReviewKey];
          }
          
          setProject(foundProject);
          
          // Check for project image
          if (foundProject.imageUrl) {
            // First check if PNG exists
            const pngExists = await imageExists(foundProject.imageUrl);
            if (pngExists) {
              setImageSrc(foundProject.imageUrl);
            } else {
              // Then check if JPG exists
              const jpgUrl = foundProject.imageUrl.replace('.png', '.jpg');
              const jpgExists = await imageExists(jpgUrl);
              if (jpgExists) {
                setImageSrc(jpgUrl);
              } else {
                // If neither exists, use a random fallback image
                setImageSrc(getRandomFallbackImage());
              }
            }
          }
        } else {
          setError(`Project "${projectName}" not found`);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectName]);
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  const getLanguageColor = (language: string | null) => {
    if (!language) return 'bg-gray-500';

    const colorMap: { [key: string]: string } = {
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-500',
      'HTML': 'bg-orange-500',
      'HTML/CSS': 'bg-orange-500',
      'CSS': 'bg-blue-400',
      'Python': 'bg-green-500',
      'Java': 'bg-red-500',
      'C++': 'bg-purple-500',
      'C#': 'bg-green-600',
      'PHP': 'bg-indigo-500',
      'Ruby': 'bg-red-600',
      'Go': 'bg-blue-300',
      'Rust': 'bg-orange-600',
      'Swift': 'bg-orange-500',
      'Kotlin': 'bg-purple-400',
      'Mobile App': 'bg-teal-500',
      'Web': 'bg-blue-400',
    };
    
    return colorMap[language] || 'bg-gray-500';
  };

  // Mock code snippet for demonstration purposes
  const codeSnippet = project
    ? `// Main functionality for ${project.name}
import { useState, useEffect } from 'react';

function ${project.name.replace(/[^a-zA-Z0-9]/g, '')}() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div className="container">
      <h1>${project.name}</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="data-container">
          {data.map((item) => (
            <div key={item.id} className="item">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ${project.name.replace(/[^a-zA-Z0-9]/g, '')};`
    : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Error</h1>
          <p className="text-xl text-red-400 mb-8">{error || "Project not found"}</p>
          <Link
            href="/projects"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition duration-300"
        >
          ← Back to Projects
        </Link>
        
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700">
          <div className="relative h-64 w-full">
            <Image
              src={imageSrc}
              alt={`${project.name} project`}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageSrc("/images/project-placeholder.jpg")}
            />
            
            {/* Color accent based on language */}
            <div className={`absolute top-0 left-0 w-full h-2 ${getLanguageColor(project.language)}`}></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl font-bold text-white">{project.name}</h1>
              <div className="flex items-center mt-2">
                {project.language && (
                <span className={`flex items-center text-white mr-4 px-3 py-1 rounded-full ${getLanguageColor(project.language)}`}>
                  <FaCode className="mr-1" /> {project.language}
                </span>
                )}
                <span className="flex items-center text-gray-300 mr-4">
                  <FaStar className="mr-1" /> {project.stargazers_count}
                </span>
                <span className="flex items-center text-gray-300">
                  <FaCodeBranch className="mr-1" /> {project.forks_count}
                </span>
            </div>
          </div>
            </div>
            
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
              <p className="text-gray-300">{project.description}</p>
              </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <h3 className="text-gray-400 mb-1">Created</h3>
                <p className="text-white">{formatDate(project.created_at)}</p>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Last Updated</h3>
                <p className="text-white">{formatDate(project.updated_at)}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <FaGithub className="mr-2" /> View Repository
              </a>
              
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  <FaExternalLinkAlt className="mr-2" /> Live Demo
                </a>
              )}
          </div>

            {project.reviews && project.reviews.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Reviews</h2>
                <div className="space-y-4">
                  {project.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white">{review.author}</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-500"}>
                              ★
                            </span>
                          ))}
                      </div>
      </div>
                      <p className="text-gray-300">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Code Preview</h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="w-full py-3 bg-gray-700 text-white rounded-lg mb-4 hover:bg-gray-600 transition duration-300 flex items-center justify-center"
              >
                <FaCode className="mr-2" />
                {showCode ? "Hide Code" : "Show Code"}
              </button>
              
              {showCode && (
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-300 text-sm">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}