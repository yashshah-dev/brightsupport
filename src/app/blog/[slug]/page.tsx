import type { Metadata } from 'next';
import BlogPostPage, { generateMetadata as generateLocalizedMetadata } from '@/app/_locale_impl/blog/[slug]/page';
import { getBlogPosts } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPosts()
    .map((post) => post.slug?.trim())
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return generateLocalizedMetadata({ params });
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostPage params={params} />;
}
