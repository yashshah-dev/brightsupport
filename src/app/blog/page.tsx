import BlogPage, { generateMetadata as generateBlogMetadata } from '@/app/_locale_impl/blog/page';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';

export const generateMetadata = generateBlogMetadata;

export default function Page() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', item: `${BASE_URL}/` },
            { name: 'Blog', item: `${BASE_URL}/blog/` },
          ],
        }}
      />
      <BlogPage />
    </>
  );
}
