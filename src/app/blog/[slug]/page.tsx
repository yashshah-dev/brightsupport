import type { Metadata } from 'next';
import BlogPostPage, { generateMetadata as generateLocalizedMetadata, generateStaticParams as generateLocalizedStaticParams } from '@/app/_locale_impl/blog/[slug]/page';

export const generateStaticParams = generateLocalizedStaticParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return generateLocalizedMetadata({ params });
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostPage params={params} />;
}
