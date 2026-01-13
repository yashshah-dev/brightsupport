# Bright Support - NDIS Disability & Support Services

A modern, fast, and fully SEO-optimized website for Bright Support, an NDIS service provider based in Australia.

## 🌟 Features

- ✅ **Modern Next.js 16** with App Router and React 19
- ✅ **Fully SEO Optimized** with metadata, sitemap, robots.txt, and structured data
- ✅ **Elegant Design Theme** with indigo/purple/amber gradient palette
- ✅ **18 Complete Pages** including homepage, services, about, career, contact
- ✅ **Responsive Design** optimized for mobile, tablet, and desktop
- ✅ **Accessibility Features** with proper ARIA labels and semantic HTML
- ✅ **Interactive Components** including FAQ, testimonials, chat widget
- ✅ **Contact Form** with API integration
- ✅ **Fast Performance** with optimized images and code splitting

## 🎨 Design System

- **Colors**: Indigo (#6366f1), Purple (#764ba2), Amber (#f59e0b), Pink (#ec4899)
- **Typography**: Inter font family optimized with next/font
- **Components**: Reusable, accessible components with Tailwind CSS 4
- **Icons**: Lucide React for consistent iconography
- **Animations**: Smooth transitions with custom CSS animations

## 📄 Pages

### Main Pages
- **Homepage** (`/`) - Hero, services overview, testimonials, FAQ, CTA
- **About Us** (`/about-us`) - Company story, mission, values, team
- **Our Services** (`/our-services`) - Complete service directory
- **Career** (`/career`) - Job opportunities and benefits
- **Contact Us** (`/contact-us`) - Contact form, location, office hours
- **Privacy Policy** (`/privacy-policy`) - Privacy information

### Service Pages
- Daily Living & In-Home Support
- Independent Living Accommodation (SIL)
- Community Nursing & Complex Care
- Community Participation & Group Programs
- Physiotherapy Services
- Personal Training Sessions
- Hydrotherapy & Pool Sessions
- Positive Behaviour Support
- Companionship Services
- Travel & Transport Assistance
- Professional Cleaning Services
- End-to-End Case Management

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:yashshah-dev/brightsupport.git
cd brightsupport

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

### Export Static Site

```bash
# Export static HTML/CSS/JS for GitHub Pages
npm run export
```

## 📂 Project Structure

```
brightsupport/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── about-us/     # About page
│   │   ├── our-services/ # Services directory
│   │   ├── career/       # Career page
│   │   ├── contact-us/   # Contact page
│   │   ├── services/     # Individual service pages
│   │   ├── api/          # API routes
│   │   ├── layout.tsx    # Root layout
│   │   ├── sitemap.ts    # Dynamic sitemap
│   │   └── robots.ts     # Robots.txt
│   └── components/       # Reusable components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── ChatWidget.tsx
│       ├── ServiceCard.tsx
│       ├── FAQ.tsx
│       ├── Testimonials.tsx
│       └── ...
├── public/
│   └── images/           # Image assets
│       ├── hero/
│       ├── about/
│       ├── services/
│       ├── career/
│       ├── contact/
│       └── general/
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions deployment
└── ...
```

## 🖼️ Image Assets

Generate images using AI tools with the prompts provided in `IMAGE-PLACEMENT-GUIDE.md` and place them in:

```
public/images/
├── hero/hero-main.webp (1200x800px)
├── about/team-photo.webp (1400x600px)
├── about/community-impact.webp (1400x600px)
├── services/[6 service images].webp (600x400px each)
├── career/team-culture.webp (1200x700px)
├── contact/office-welcome.webp (800x500px)
└── general/services-in-action.webp (1200x800px)
```

## 🌐 Deployment

### GitHub Pages (Automatic)

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions
3. Push to main branch triggers automatic deployment
4. Site will be available at: `https://yourusername.github.io/brightsupport/`

### Manual Deployment

```bash
# Build and export static files
npm run export

# Files will be in /out directory
# Upload /out directory to any static hosting
```

### Custom Domain

To use a custom domain (e.g., brightsupport.com.au):

1. Add `CNAME` file to `/public` with your domain
2. Update `basePath` in `next.config.ts` to empty string
3. Configure DNS with your domain provider
4. Update GitHub Pages settings with custom domain

## 🔧 Configuration

### Next.js Config (`next.config.ts`)
- Static export enabled for GitHub Pages
- Image optimization configured
- Base path set for GitHub Pages subdirectory

### Environment Variables
Create `.env.local` for local development:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📊 SEO Features

- ✅ Semantic HTML structure
- ✅ Meta tags for each page
- ✅ Open Graph tags for social sharing
- ✅ JSON-LD structured data
- ✅ Dynamic XML sitemap
- ✅ Robots.txt configuration
- ✅ Optimized images with alt text
- ✅ Proper heading hierarchy
- ✅ Fast page load times

## 🎯 Performance

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3.5s
- **Cumulative Layout Shift**: <0.1

## 🛠️ Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts via next/font)
- **Deployment**: GitHub Pages / Vercel

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Contact Information

**Bright Support**
- Phone: 1800 407 508
- Email: care@brightsupport.com.au
- Address: 279 Wyndham St, Shepparton VIC 3630, Australia
- Website: https://www.brightsupport.com.au

## 📄 License

This project is proprietary and confidential. All rights reserved by Bright Support.

## 🤝 Contributing

This is a private project. For internal contributions, please follow the established code review process.

---

**Built with ❤️ for Bright Support** | Making navigating the NDIS easy
