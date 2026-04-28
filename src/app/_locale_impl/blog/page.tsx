import { Metadata } from 'next';
import BlogHub from '@/components/BlogHub';
import { 
  getBlogPosts, 
  getFeaturedPosts, 
  getAllCategories, 
  getAllTags 
} from '@/lib/blog';

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = 'https://www.brightsupport.com.au';
  const pageUrl = `${BASE_URL}/blog/`;

  return {
    title: 'NDIS Blog Posts & Resources',
    description: 'Explore our complete collection of NDIS blog posts, disability support guides, and community resources for participants and families in Shepparton, Victoria.',
    keywords: ['NDIS blog', 'disability support tips', 'NDIS Shepparton', 'NDIS resources', 'NDIS guides', 'disability information', 'person-first language'],
    alternates: {
      languages: { en: pageUrl, 'x-default': pageUrl },
    },
  };
}

export default function BlogPage() {
  const allPosts = getBlogPosts();
  const featuredPosts = getFeaturedPosts(3);
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <BlogHub 
      allPosts={allPosts}
      featuredPosts={featuredPosts}
      categories={categories}
      tags={tags}
    />
  );
}
