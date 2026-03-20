import { Metadata } from 'next';
import BlogHub from '@/components/BlogHub';
import { locales, Locale } from '@/i18n/config';
import { 
  getBlogPosts, 
  getFeaturedPosts, 
  getAllCategories, 
  getAllTags 
} from '@/lib/blog';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const BASE_URL = 'https://www.brightsupport.com.au';
  
  // Build hreflang alternate URLs for all locales
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}/blog/`;
  }
  languages['x-default'] = `${BASE_URL}/en/blog/`;

  return {
    title: 'All NDIS Blog Posts & Resources | Bright Support Shepparton',
    description: 'Explore our complete collection of NDIS blog posts, disability support guides, and community resources for participants and families in Shepparton, Victoria.',
    keywords: ['NDIS blog', 'disability support tips', 'NDIS Shepparton', 'NDIS resources', 'NDIS guides', 'disability information', 'person-first language'],
    alternates: {
      canonical: `${BASE_URL}/${validLocale}/blog/`,
      languages,
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
