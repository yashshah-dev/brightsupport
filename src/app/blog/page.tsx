import BlogPage, { generateMetadata as generateBlogMetadata } from '@/app/_locale_impl/blog/page';

export const generateMetadata = generateBlogMetadata;

export default function Page() {
  return <BlogPage />;
}
