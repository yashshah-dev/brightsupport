// Import blog posts from JSON data file (updated by n8n automation)
import blogPostsData from '@/data/blog-posts.json';

// Blog post content interface
export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string | {
    name: string;
    avatar: string;
    role: string;
  };
  coverImage?: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  readingTime: number | string;
  keywords?: string[];
  metaDescription?: string;
  featured?: boolean;
  relatedServices?: string[];
  primaryKeyword?: string;
  contentCluster?: string;
  ctaType?: string;
  seoScore?: number;
  wordCount?: number;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
  ndis?: {
    serviceName: string;
    serviceCategory: string;
    location: string;
    complianceScore: number;
    personFirstLanguage: boolean;
  };
}

// Load blog posts from JSON file (automatically updated by n8n workflow)
const blogPosts: BlogPost[] = blogPostsData as BlogPost[];

/**
 * Get all blog posts sorted by publish date (newest first)
 */
export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

/**
 * Get all posts in a specific category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts
    .filter(post => post.category === category)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/**
 * Get all posts with a specific tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts
    .filter(post => post.tags.includes(tag))
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/**
 * Get related posts based on category and tags
 */
export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentPost.slug)
    .filter(post =>
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .sort((a, b) => {
      // Score posts by relevance
      const scoreA =
        (a.category === currentPost.category ? 2 : 0) +
        a.tags.filter(tag => currentPost.tags.includes(tag)).length;
      const scoreB =
        (b.category === currentPost.category ? 2 : 0) +
        b.tags.filter(tag => currentPost.tags.includes(tag)).length;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map(post => post.category)));
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  return Array.from(new Set(blogPosts.flatMap(post => post.tags)));
}

/**
 * Get featured posts (up to limit)
 */
export function getFeaturedPosts(limit = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.featured === true)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

/**
 * Search posts by keyword (searches title, excerpt, content, tags)
 */
export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts
    .filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      post.keywords?.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    )
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/**
 * Calculate reading time based on word count
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
