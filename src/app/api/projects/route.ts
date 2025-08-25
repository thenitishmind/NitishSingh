import { NextRequest, NextResponse } from 'next/server';
import { getGithubProjects } from '@/lib/github';

// Enhanced project data with additional live metrics
interface LiveProjectData {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  imageUrl?: string;
  // Additional live data
  live_metrics?: {
    uptime: number;
    response_time: number;
    last_deployment: string;
    status: 'active' | 'maintenance' | 'error';
    visitors_today: number;
    performance_score: number;
  };
  tech_stack?: string[];
  features?: string[];
  demo_available: boolean;
}

// Mock live data for demonstration - In production, this would come from your monitoring services
const mockLiveMetrics = {
  uptime: 99.9,
  response_time: 145,
  last_deployment: new Date().toISOString(),
  status: 'active' as const,
  visitors_today: Math.floor(Math.random() * 500) + 50,
  performance_score: 95,
};

// Enhanced project data with real-world information
const enhancedProjectData: { [key: string]: Partial<LiveProjectData> } = {
  'portfolio-website': {
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: ['Responsive Design', 'Dark Mode', 'SEO Optimized', 'Fast Loading', 'Mobile First'],
    demo_available: true,
    live_metrics: { ...mockLiveMetrics, performance_score: 98 },
  },
  'tablecraft': {
    tech_stack: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
    features: ['Real-time Updates', 'User Authentication', 'Data Visualization', 'Export Features'],
    demo_available: true,
    live_metrics: { ...mockLiveMetrics, performance_score: 94 },
  },
  'e-commerce-app': {
    tech_stack: ['React Native', 'Firebase', 'Stripe', 'Redux'],
    features: ['Payment Integration', 'Push Notifications', 'Offline Support', 'Cart Management'],
    demo_available: false,
    live_metrics: { ...mockLiveMetrics, performance_score: 92 },
  },
};

async function checkProjectHealth(url: string): Promise<{
  status: 'active' | 'maintenance' | 'error';
  response_time: number;
}> {
  if (!url) {
    return {
      status: 'error',
      response_time: 0,
    };
  }

  try {
    const start = Date.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const response_time = Date.now() - start;
    
    return {
      status: response.ok ? 'active' : 'error',
      response_time,
    };
  } catch (error) {
    console.warn(`Health check failed for ${url}:`, error);
    return {
      status: 'error',
      response_time: 5000,
    };
  }
}

export async function GET() {
  try {
    console.log('Fetching projects from GitHub API...');
    
    // Get base project data from GitHub
    const githubProjects = await getGithubProjects();
    console.log(`Retrieved ${githubProjects.length} projects from GitHub`);
    
    // Enhance with live data
    const enhancedProjects: LiveProjectData[] = await Promise.all(
      githubProjects.map(async (project) => {
        const projectKey = project.name.toLowerCase().replace(/\s+/g, '-');
        const enhancement = enhancedProjectData[projectKey] || {};
        
        // Check live status if homepage exists
        let liveMetrics = enhancement.live_metrics || {
          ...mockLiveMetrics,
          visitors_today: Math.floor(Math.random() * 500) + 50,
          last_deployment: new Date().toISOString(),
        };
        
        if (project.homepage && project.homepage.trim() !== '') {
          try {
            console.log(`Checking health for ${project.name}: ${project.homepage}`);
            const healthCheck = await checkProjectHealth(project.homepage);
            liveMetrics = {
              ...liveMetrics,
              status: healthCheck.status,
              response_time: healthCheck.response_time,
            };
          } catch (error) {
            console.warn(`Health check failed for ${project.name}:`, error);
            liveMetrics = {
              ...liveMetrics,
              status: 'error',
              response_time: 5000,
            };
          }
        }
        
        return {
          ...project,
          ...enhancement,
          live_metrics: liveMetrics,
          demo_available: enhancement.demo_available ?? !!project.homepage,
        };
      })
    );
    
    console.log(`Enhanced ${enhancedProjects.length} projects with live data`);
    
    // Add cache headers for better performance but allow real-time updates
    const response = NextResponse.json(enhancedProjects);
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    return response;
  } catch (error) {
    console.error('Error fetching live project data:', error);
    
    // Return error response with fallback to basic GitHub data
    try {
      const fallbackData = await getGithubProjects();
      console.log('Using fallback GitHub data');
      return NextResponse.json(fallbackData, { 
        status: 206,
        headers: {
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        }
      }); // Partial content
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      return NextResponse.json(
        { 
          error: 'Failed to fetch project data',
          message: 'Unable to retrieve live project information. Please try again later.',
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  }
}

// Handle POST requests for updating project metrics (webhook from Vercel)
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Verify webhook secret (you should set this in environment variables)
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    // Process webhook data (deployment updates, metrics, etc.)
    console.log('Received webhook data:', data);
    
    // Here you would typically update your database with new metrics
    // For now, we'll just acknowledge the webhook
    
    return NextResponse.json({ 
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
