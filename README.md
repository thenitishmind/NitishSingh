# Nitish Singh - Portfolio Website

A comprehensive, modern portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features real-time project metrics, interactive components, and seamless user experience with advanced animations and responsive design.

## 🚀 Features

### Core Features
- **Modern Design**: Clean, professional design with smooth Framer Motion animations
- **Real-time Data**: Live project metrics and GitHub integration
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Performance Optimized**: Built with Next.js 15 App Router for optimal performance
- **Type-Safe**: Full TypeScript implementation with comprehensive type definitions
- **SEO Optimized**: Built-in SEO features, meta tags, and sitemap generation
- **Interactive Components**: Live metrics dashboard, image sliders, and testimonials

### Advanced Features
- **GitHub Integration**: Automatic project fetching from GitHub API
- **Live Metrics Dashboard**: Real-time project health monitoring
- **Contact Form**: Integrated Formspree contact form with validation
- **Dynamic Routing**: Server-side rendered project detail pages
- **Image Optimization**: Next.js automatic image optimization with fallbacks
- **Professional Icons**: Custom favicon and touch icons

## 🛠️ Tech Stack

### Frontend Technologies
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion 12.x
- **Icons**: Lucide React, React Icons
- **Forms**: Formspree React Integration

### Development Tools
- **Linting**: ESLint with Next.js configuration
- **Code Quality**: TypeScript strict mode
- **Build System**: Next.js built-in build system
- **Package Manager**: npm

### External APIs
- **GitHub API**: Project data fetching via Octokit
- **Formspree**: Contact form handling

## 📁 Comprehensive Project Structure

```
NitishSingh/
├── 📁 public/                           # Static assets and resources
│   ├── 📁 images/                       # All image assets
│   │   ├── default-avatar.jpg           # Default user avatar
│   │   ├── 📁 fallback/                 # Fallback project images
│   │   │   ├── project-1.jpg
│   │   │   ├── project-2.jpg
│   │   │   ├── project-3.jpg
│   │   │   ├── project-4.jpg
│   │   │   └── project-5.jpg
│   │   ├── 📁 projects/                 # Project-specific images
│   │   │   ├── tableCraft.jpg
│   │   │   └── project-placeholder.jpg
│   │   ├── 📁 slider/                   # Hero section slider images
│   │   │   ├── slide1.jpg
│   │   │   ├── slide2.jpg
│   │   │   ├── slide3.jpg
│   │   │   └── slide4.jpg
│   │   └── 📁 testimonials/             # Testimonial profile images
│   │       ├── Aditi Sharma.jpg
│   │       ├── Krishna.jpg
│   │       ├── Pankaj Kumar.jpg
│   │       └── Saraswat Mukherjee.jpg
│   ├── favicon.ico                      # Standard favicon
│   ├── nitish-favicon.svg               # Custom SVG favicon
│   ├── robots.txt                       # SEO robots file
│   └── vercel.svg                       # Vercel logo
├── 📁 src/                              # Source code directory
│   ├── 📁 app/                          # Next.js 15 App Router
│   │   ├── 📁 about/                    # About page route
│   │   │   └── page.tsx                 # About page component
│   │   ├── 📁 api/                      # API routes
│   │   │   └── 📁 projects/             # Projects API endpoints
│   │   │       ├── 📁 [name]/           # Dynamic project API route
│   │   │       │   └── route.ts         # Individual project API
│   │   │       └── route.ts             # Projects listing API
│   │   ├── 📁 contact/                  # Contact page route
│   │   │   └── page.tsx                 # Contact page with form
│   │   ├── 📁 projects/                 # Projects section
│   │   │   ├── 📁 [name]/               # Dynamic project detail pages
│   │   │   │   └── page.tsx             # Individual project page
│   │   │   └── page.tsx                 # Projects listing page
│   │   ├── apple-icon.tsx               # Apple touch icon generator
│   │   ├── favicon.ico                  # Favicon file
│   │   ├── globals.css                  # Global CSS styles and variables
│   │   ├── icon.tsx                     # Dynamic favicon component
│   │   ├── layout.tsx                   # Root layout with metadata
│   │   └── page.tsx                     # Home page component
│   ├── 📁 components/                   # Reusable React components
│   │   ├── ContactForm.tsx              # Formspree contact form
│   │   ├── Footer.tsx                   # Site footer with social links
│   │   ├── Hero.tsx                     # Hero section with animations
│   │   ├── ImageSlider.tsx              # Image carousel component
│   │   ├── LiveMetricsDashboard.tsx     # Real-time metrics display
│   │   ├── Navbar.tsx                   # Responsive navigation bar
│   │   ├── ProjectCard.tsx              # Project display card
│   │   ├── ProjectsSection.tsx          # Projects grid section
│   │   └── Testimonials.tsx             # Testimonials carousel
│   ├── 📁 lib/                          # Utility libraries and services
│   │   ├── github.ts                    # GitHub API integration
│   │   └── liveData.ts                  # Live data service management
│   └── 📁 types/                        # TypeScript type definitions
│       └── index.ts                     # Comprehensive type definitions
├── 📁 Configuration Files
├── .eslintrc.json                       # ESLint configuration
├── eslint.config.mjs                    # ESLint ES modules config
├── next.config.js                       # Next.js configuration
├── next-env.d.ts                        # Next.js TypeScript declarations
├── package.json                         # Dependencies and scripts
├── package-lock.json                    # Dependency lock file
├── postcss.config.mjs                   # PostCSS configuration
├── tailwind.config.js                   # Tailwind CSS configuration
├── tsconfig.json                        # TypeScript configuration
└── vercel.json                          # Vercel deployment settings
```

## 🏗️ Component Architecture & Data Flow

### 1. Page Components (App Router)

#### Home Page (`src/app/page.tsx`)
- **Purpose**: Main landing page
- **Components Used**: Hero, ProjectsSection, Testimonials
- **Data Flow**: Static content with dynamic project preview
- **Features**: Hero slider, project showcase, testimonials carousel

#### Projects Page (`src/app/projects/page.tsx`)
- **Purpose**: Complete projects listing with filtering
- **Data Source**: GitHub API via `getGithubProjects()`
- **Components**: ProjectCard array rendering
- **Features**: Project filtering, sorting, live metrics

#### Project Detail Page (`src/app/projects/[name]/page.tsx`)
- **Purpose**: Individual project deep-dive
- **Data Source**: Dynamic API route `/api/projects/[name]`
- **Features**: Detailed analytics, screenshots, tech stack
- **SSR**: Server-side rendered for SEO optimization

#### Contact Page (`src/app/contact/page.tsx`)
- **Purpose**: Contact form and professional signature
- **Components**: ContactForm, contact information display
- **Features**: Animated contact info, professional signature
- **Form Handling**: Formspree integration

#### About Page (`src/app/about/page.tsx`)
- **Purpose**: Personal and professional information
- **Content**: Skills, experience, background
- **Design**: Professional layout with animations

### 2. Core Components

#### Navigation (`src/components/Navbar.tsx`)
```typescript
Features:
- Responsive mobile/desktop navigation
- Active route highlighting
- Smooth scroll navigation
- Mobile hamburger menu
```

#### Hero Section (`src/components/Hero.tsx`)
```typescript
Features:
- Image slider with transitions
- Call-to-action buttons
- Animated text and elements
- Responsive design
```

#### Project Components
- **ProjectsSection** (`src/components/ProjectsSection.tsx`)
  - Grid layout for project display
  - Integration with GitHub API
  - Live metrics integration
  
- **ProjectCard** (`src/components/ProjectCard.tsx`)
  - Individual project display
  - Hover effects and animations
  - Tech stack visualization
  - Live status indicators

#### Live Metrics Dashboard (`src/components/LiveMetricsDashboard.tsx`)
```typescript
Features:
- Real-time data simulation
- Performance metrics display
- Status indicators
- Interactive charts and gauges
```

#### Contact Form (`src/components/ContactForm.tsx`)
```typescript
Features:
- Form validation
- Formspree integration
- Success/error states
- Animated submission feedback
```

### 3. API Routes & Data Management

#### Projects API (`src/app/api/projects/route.ts`)
- **Purpose**: Fetch and enhance GitHub project data
- **Data Sources**: GitHub API, Live metrics
- **Response**: Enhanced project data with analytics
- **Caching**: Response caching for performance

#### Individual Project API (`src/app/api/projects/[name]/route.ts`)
- **Purpose**: Detailed project information
- **Features**: Mock analytics, detailed descriptions
- **Error Handling**: 404 for non-existent projects
- **Data Enhancement**: Adds screenshots, features, challenges

### 4. Service Layer

#### GitHub Integration (`src/lib/github.ts`)
```typescript
Functions:
- getGithubProjects(): Fetch user repositories
- getGithubUser(): Fetch user profile
- imageExists(): Check image availability
- getRandomFallbackImage(): Fallback image selection
```

#### Live Data Service (`src/lib/liveData.ts`)
```typescript
Features:
- Real-time metrics simulation
- Caching mechanism
- Performance monitoring
- Health status tracking
```

### 5. Type System (`src/types/index.ts`)

#### Core Types
```typescript
- Project: GitHub project with enhancements
- LiveMetrics: Real-time performance data
- DeploymentInfo: Deployment status information
- ProjectHealth: Overall project health metrics
- Testimonial: User testimonial structure
- GithubUser: GitHub user profile data
```

## 🎨 UI/UX Design System

### Color Scheme
- **Primary**: Blue gradient (`from-blue-500 to-blue-600`)
- **Secondary**: Purple gradient (`from-purple-500 to-purple-600`)
- **Accent**: Pink highlights (`from-pink-400 to-pink-600`)
- **Background**: Dark theme (`gray-900, gray-800`)
- **Text**: High contrast white/gray system

### Animation System
- **Framework**: Framer Motion
- **Transitions**: Smooth page transitions
- **Hover Effects**: Interactive element feedback
- **Loading States**: Skeleton loaders and spinners
- **Micro-interactions**: Button presses, form interactions

### Responsive Breakpoints
- **Mobile**: `< 768px` - Stack layout, mobile nav
- **Tablet**: `768px - 1024px` - Adjusted grid layouts
- **Desktop**: `> 1024px` - Full grid systems
- **Large**: `> 1440px` - Max-width containers

## 📊 Data Flow Architecture

### 1. Static Data Flow
```
Components → Static Content → Rendered Pages
```

### 2. GitHub API Data Flow
```
GitHub API → lib/github.ts → API Routes → Components → UI
```

### 3. Live Metrics Data Flow
```
Service Timer → lib/liveData.ts → Components → Real-time UI Updates
```

### 4. Contact Form Data Flow
```
User Input → ContactForm → Formspree API → Success/Error States
```

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+ (LTS recommended)
npm or yarn package manager
Git for version control
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/nitishsghh/NitishSingh.git
   cd NitishSingh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create `.env.local` file:
   ```env
   # GitHub API (Optional - for higher rate limits)
   GITHUB_TOKEN=your_github_personal_access_token
   
   # Formspree (Required for contact form)
   NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
   ```

4. **Development server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000`

5. **Production build**
   ```bash
   npm run build
   npm run start
   ```

### Available Scripts

```json
{
  "dev": "next dev",                    // Development server
  "build": "next build",                // Production build
  "start": "next start",                // Production server
  "lint": "next lint",                  // Code linting
  "build:production": "NODE_ENV=production MINIMIZE=true next build"
}
```

## ⚙️ Configuration

### 1. Contact Form Setup (Formspree)
```typescript
// In ContactForm.tsx, update the form ID:
const [state, handleSubmit] = useForm("your_formspree_id");
```

### 2. GitHub Integration
```typescript
// In lib/github.ts, update username:
username: "your_github_username"
```

### 3. Personal Information
Update content in respective components:
- Hero section text
- About page content
- Contact information
- Social media links

### 4. Styling Customization
```javascript
// tailwind.config.js - Customize colors, fonts, spacing
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      }
    }
  }
}
```

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push
4. Custom domain setup available

### Alternative Platforms
- **Netlify**: Static export with `next export`
- **Railway**: Direct GitHub integration
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

### Environment Variables (Production)
```env
GITHUB_TOKEN=production_github_token
NEXT_PUBLIC_FORMSPREE_ID=production_formspree_id
```

## 📈 Performance Optimizations

### Built-in Optimizations
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-rendered pages where possible
- **Font Optimization**: Automatic font loading optimization

### Custom Optimizations
- **Lazy Loading**: Components and images load on demand
- **Caching**: API response caching with appropriate headers
- **Bundle Analysis**: Optimized imports and tree shaking
- **SEO**: Comprehensive meta tags and structured data

## 🔧 Maintenance & Updates

### Regular Maintenance
- **Dependencies**: Monthly dependency updates
- **Security**: Regular security audit with `npm audit`
- **Performance**: Lighthouse score monitoring
- **Content**: Regular content updates and additions

### Version Control
- **Branching**: Feature branches for new developments
- **Commits**: Conventional commit messages
- **Releases**: Semantic versioning for major updates

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes with proper TypeScript typing
4. Test thoroughly across devices
5. Commit with descriptive messages
6. Push and create Pull Request

### Code Standards
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with Next.js configuration
- **Formatting**: Consistent code formatting
- **Testing**: Component testing recommended

## 📄 License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Developer

**Developed and Designed by Nitish Singh**

- **GitHub**: [@nitishsghh](https://github.com/nitishsghh)
- **Email**: contact@nitishsingh.dev
- **Portfolio**: [Live Portfolio](https://your-portfolio-url.com)

### Professional Skills Showcased
- **Frontend Development**: React, Next.js, TypeScript
- **UI/UX Design**: Responsive design, animations, user experience
- **API Integration**: RESTful APIs, external service integration
- **Performance Optimization**: Core Web Vitals, loading optimization
- **SEO & Accessibility**: Search engine optimization, WCAG compliance

---

⭐ **Star this repository if you found it helpful!**

---

## 📞 Support & Contact

For questions, suggestions, or collaboration opportunities:

- **Issues**: [GitHub Issues](https://github.com/nitishsghh/NitishSingh/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nitishsghh/NitishSingh/discussions)
- **Email**: devops@nitishsingh.dev

---

**🎨 Designed and Created by Nitish Singh**

*Last Updated: January 2025*
