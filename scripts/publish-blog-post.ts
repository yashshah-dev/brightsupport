// Blog post publishing script for n8n workflow
// This script is called by the n8n workflow to publish blog posts

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readingTime: number;
  keywords: string[];
  metaDescription: string;
  featured?: boolean;
  relatedServices?: string[];
  primaryKeyword?: string;
  contentCluster?: string;
  ctaType?: string;
  seoScore?: number;
  wordCount?: number;
}

interface PublishInput {
  title: string;
  article: string;
  summary: string;
  focus_keyword: string;
  internal_links?: string[];
  image_url?: string;
  content_cluster?: string;
  cta_type?: string;
  target_audience?: string;
  secondary_keywords?: string;
  topic?: string;
  seo_score?: number;
}

/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate reading time (200 words per minute)
 */
function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Extract tags from secondary keywords
 */
function extractTags(secondaryKeywords?: string): string[] {
  if (!secondaryKeywords) return [];
  return secondaryKeywords
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .slice(0, 5); // Max 5 tags
}

/**
 * Map content cluster to category
 */
function mapCategory(contentCluster?: string): string {
  const categoryMap: Record<string, string> = {
    'NDIS Eligibility & Planning': 'NDIS Planning',
    'Daily Living Support': 'Daily Living',
    'Community Nursing': 'Health Services',
    'Allied Health Services': 'Allied Health',
    'Community Participation': 'Community',
    'Accommodation Support': 'Accommodation',
    'Specialist Support Services': 'Specialist Services',
    'Local NDIS Services': 'Local Services',
    'NDIS Education': 'Education',
  };

  return categoryMap[contentCluster || ''] || 'NDIS Support';
}

/**
 * Publish blog post to JSON data store
 */
export function publishBlogPost(input: PublishInput): BlogPost {
  const slug = generateSlug(input.title);
  const now = new Date().toISOString();
  const wordCount = input.article.split(/\s+/).length;

  const blogPost: BlogPost = {
    slug,
    title: input.title,
    excerpt: input.summary,
    content: input.article,
    author: 'Bright Support Team',
    publishedAt: now,
    updatedAt: now,
    category: mapCategory(input.content_cluster),
    tags: extractTags(input.secondary_keywords),
    featuredImage: input.image_url || '/images/blog/default-hero.jpg',
    readingTime: calculateReadingTime(input.article),
    keywords: [input.focus_keyword, ...(input.secondary_keywords?.split(',').map(k => k.trim()) || [])],
    metaDescription: input.summary.slice(0, 155),
    featured: false,
    relatedServices: [],
    primaryKeyword: input.focus_keyword,
    contentCluster: input.content_cluster,
    ctaType: input.cta_type,
    seoScore: input.seo_score,
    wordCount,
  };

  // Read existing blog posts
  const dataPath = join(process.cwd(), 'src/data/blog-posts.json');
  let blogPosts: BlogPost[] = [];
  
  try {
    const data = readFileSync(dataPath, 'utf-8');
    blogPosts = JSON.parse(data);
  } catch (error) {
    console.log('No existing blog posts found, starting fresh');
  }

  // Check if slug already exists (update instead of create)
  const existingIndex = blogPosts.findIndex(post => post.slug === slug);
  if (existingIndex >= 0) {
    blogPost.publishedAt = blogPosts[existingIndex].publishedAt; // Keep original publish date
    blogPost.updatedAt = now; // Update modification date
    blogPosts[existingIndex] = blogPost;
    console.log(`Updated existing blog post: ${slug}`);
  } else {
    blogPosts.push(blogPost);
    console.log(`Created new blog post: ${slug}`);
  }

  // Write back to file
  writeFileSync(dataPath, JSON.stringify(blogPosts, null, 2), 'utf-8');

  return blogPost;
}

/**
 * Main function for n8n execution
 * Expects input via command line arguments or stdin
 */
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: node publish-blog-post.js <json-input>');
    console.error('Example: node publish-blog-post.js \'{"title":"...","article":"..."}\'');
    process.exit(1);
  }

  try {
    const input: PublishInput = JSON.parse(args[0]);
    const result = publishBlogPost(input);
    
    // Output result for n8n to capture
    console.log(JSON.stringify({
      success: true,
      slug: result.slug,
      url: `/blog/${result.slug}`,
      publishedAt: result.publishedAt,
      wordCount: result.wordCount,
      readingTime: result.readingTime,
    }));
  } catch (error) {
    console.error(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }));
    process.exit(1);
  }
}
