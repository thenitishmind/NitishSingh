import { NextRequest, NextResponse } from 'next/server';
import { getGithubProjects } from '@/lib/github';

interface ProjectAnalytics {
  views: number;
  clicks: number;
  stars_trend: number;
  recent_commits: number;
  contributors: number;
  issues: {
    open: number;
    closed: number;
  };
  pull_requests: {
    open: number;
    merged: number;
  };
  deployments: {
    total: number;
    successful: number;
    failed: number;
    last_deployed: string;
  };
}

// Mock analytics data - In production, this would come from your analytics service
const generateMockAnalytics = (): ProjectAnalytics => ({
  views: Math.floor(Math.random() * 1000) + 100,
  clicks: Math.floor(Math.random() * 500) + 50,
  stars_trend: Math.floor(Math.random() * 20) - 5, // Can be negative
  recent_commits: Math.floor(Math.random() * 15) + 1,
  contributors: Math.floor(Math.random() * 8) + 1,
  issues: {
    open: Math.floor(Math.random() * 10),
    closed: Math.floor(Math.random() * 50) + 10,
  },
  pull_requests: {
    open: Math.floor(Math.random() * 5),
    merged: Math.floor(Math.random() * 30) + 5,
  },
  deployments: {
    total: Math.floor(Math.random() * 50) + 10,
    successful: Math.floor(Math.random() * 45) + 8,
    failed: Math.floor(Math.random() * 5),
    last_deployed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const projectName = decodeURIComponent(name);
    console.log(`Fetching details for project: ${projectName}`);
    
    // Get all projects first
    const projects = await getGithubProjects();
    
    // Find the specific project
    const project = projects.find(p => 
      p.name.toLowerCase().replace(/\s+/g, '-') === projectName.toLowerCase() ||
      p.name.toLowerCase() === projectName.toLowerCase()
    );
    
    if (!project) {
      return NextResponse.json(
        { 
          error: 'Project not found',
          message: `Project '${projectName}' does not exist.`,
          available_projects: projects.map(p => p.name),
        },
        { status: 404 }
      );
    }
    
    // Generate analytics data
    const analytics = generateMockAnalytics();
    
    // Enhanced project data with analytics
    const enhancedProject = {
      ...project,
      analytics,
      detailed_description: `${project.description || 'This project showcases modern development practices and innovative solutions.'} Built with attention to performance, user experience, and maintainability.`,
      screenshots: [
        `/images/projects/${projectName}-1.jpg`,
        `/images/projects/${projectName}-2.jpg`,
        `/images/projects/${projectName}-3.jpg`,
      ],
      features: [
        'Modern Architecture',
        'Responsive Design',
        'Performance Optimized',
        'SEO Friendly',
        'Accessible UI',
      ],
      challenges: [
        'Complex state management',
        'Performance optimization',
        'Cross-browser compatibility',
        'Mobile responsiveness',
      ],
      solutions: [
        'Implemented efficient caching strategies',
        'Optimized bundle size and loading times',
        'Used progressive enhancement techniques',
        'Applied mobile-first design principles',
      ],
      tech_details: {
        frontend: project.language === 'TypeScript' ? ['TypeScript', 'React', 'Next.js'] : ['JavaScript', 'HTML', 'CSS'],
        backend: ['Node.js', 'Express', 'Database'],
        deployment: ['Vercel', 'GitHub Actions', 'CI/CD'],
        tools: ['VS Code', 'Git', 'npm/yarn', 'ESLint'],
      },
      timeline: {
        planning: '1 week',
        development: '2-4 weeks',
        testing: '1 week',
        deployment: '2 days',
      },
      lessons_learned: [
        'Importance of planning and architecture',
        'Value of automated testing',
        'Benefits of continuous deployment',
        'User feedback integration',
      ],
      fetched_at: new Date().toISOString(),
    };
    
    // Add cache headers with CORS
    const response = NextResponse.json(enhancedProject);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    return response;
  } catch (error) {
    console.error('Error fetching project details:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch project details',
        message: 'Unable to retrieve project information. Please try again later.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
