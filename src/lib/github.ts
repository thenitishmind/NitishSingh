import { Octokit } from "octokit";
import { Project, GithubUser } from "@/types";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
});

// Extended Project interface with additional properties
interface ExtendedProject extends Project {
  imageUrl?: string;
  reviews?: Review[];
}

interface Review {
  author: string;
  text: string;
  rating: number;
}

// Function to check if an image exists
export async function imageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Get a list of fallback images
export const fallbackImages = [
  '/images/fallback/project-1.jpg',
  '/images/fallback/project-2.jpg',
  '/images/fallback/project-3.jpg',
  '/images/fallback/project-4.jpg',
  '/images/fallback/project-5.jpg',
];

// Get a random fallback image
export function getRandomFallbackImage(): string {
  const index = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[index];
}

export async function getGithubUser(): Promise<GithubUser> {
  try {
    const response = await octokit.request('GET /users/{username}', {
      username: "thenitishmind",
    });
    
    return response.data as GithubUser;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw new Error('Failed to fetch GitHub user data');
  }
}

export async function getGithubProjects(): Promise<ExtendedProject[]> {
  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username: "thenitishmind",
      sort: 'updated',
      per_page: 100,
    });
    
    // Filter out forked repositories and transform the data
    const projects: ExtendedProject[] = response.data
      .filter((repo: { fork: boolean }) => !repo.fork)
      .map((repo) => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage || null,
          language: repo.language || null,
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0,
          created_at: repo.created_at || "",
          updated_at: repo.updated_at || "",
        };
      });
    
    // Add mock TableCraft project if it doesn't exist in the GitHub repos
    const hasTableCraft = projects.some(project => project.name.toLowerCase() === 'tablecraft');
    
    if (!hasTableCraft) {
      // Create a date 10 days ago for "recent" update
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 10);
      
      projects.push({
        id: 999999,
        name: "tableCraft",
        description: "An interactive table management system with drag-and-drop functionality, data filtering, and responsive design.",
        html_url: "https://github.com/thenitishmind/tableCraft",
        homepage: "",
        language: "JavaScript",
        stargazers_count: 12,
        forks_count: 3,
        created_at: "2023-05-15T12:00:00Z",
        updated_at: recentDate.toISOString(),
        imageUrl: "/images/projects/tableCraft.jpg",
        reviews: [
          {
            author: "Dev User",
            text: "Great table component with excellent features and performance!",
            rating: 5
          }
        ]
      });
    }
    
    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    throw new Error('Failed to fetch GitHub projects');
  }
}

// Mock data for project images and reviews since those aren't available from GitHub API
export const projectReviews = {
  // Add mock reviews for specific projects
  "portfolio-website": [
    {
      author: "Alex Thompson",
      text: "Great design and functionality!",
      rating: 5
    },
    {
      author: "Sarah Kim",
      text: "The portfolio is impressive and well-structured.",
      rating: 4
    }
  ],
  "e-commerce-app": [
    {
      author: "Michael Johnson",
      text: "Intuitive interface and seamless experience.",
      rating: 5
    }
  ],
  "tableCraft": [
    {
      author: "John Developer",
      text: "The TableCraft component is incredibly flexible and easy to integrate.",
      rating: 5
    },
    {
      author: "Maria Rodriguez",
      text: "Great performance even with large datasets. Highly recommended!",
      rating: 5
    },
    {
      author: "David Chen",
      text: "The sorting and filtering features are very well implemented.",
      rating: 4
    }
  ]
};

// Mock testimonials data
export const testimonials = [
  {
    id: 1,
    name: "Saraswat Mukherjee",
    role: "Senior AI Engineer",
    company: "Microsoft.",
    text: "Working with Nitish was a great experience. His technical skills and attention to detail are impressive.",
    avatar: "/images/testimonials/Saraswat Mukherjee.jpg"
  },
  {
    id: 2,
    name: "Pankaj Kumar",
    role: "Cyber Security",
    company: "HCL",
    text: "Nitish is a dedicated developer who consistently delivers high-quality code and innovative solutions.",
    avatar: "/images/testimonials/Pankaj Kumar.jpg"
  },
  {
    id: 3,
    name: "Aditi Sharma",
    role: "College Student",
    company: "DPG College Haryana",
    text: "Collaborating with Nitish resulted in an exceptional product that exceeded client expectations.",
    avatar: "/images/testimonials/Krishna.jpg"
  }
];