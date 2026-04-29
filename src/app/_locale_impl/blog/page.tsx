import { Metadata } from 'next';
import BlogHub from '@/components/BlogHub';
import Link from 'next/link';
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
    title: 'NDIS Blog Posts, Guides & Resources in Shepparton | Bright Support',
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
    <>
      <BlogHub 
        allPosts={allPosts}
        featuredPosts={featuredPosts}
        categories={categories}
        tags={tags}
      />
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-5">How to Use Our NDIS Resources in Shepparton</h2>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            This blog is built for NDIS participants, families, carers, and support coordinators who want practical,
            local guidance. Every article is written to help you make clearer decisions about service selection,
            plan funding, provider comparison, and day-to-day support implementation in Shepparton and nearby areas.
          </p>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            If you are new to the scheme, start with foundational articles covering eligibility, funding categories,
            and plan reviews. If you already have an active plan, use the service-specific guides to compare options
            for daily living support, community nursing, physiotherapy, support coordination, and SIL.
          </p>
          <p className="text-lg leading-relaxed text-slate-700 mb-6">
            To move from research to action, pair these resources with our
            {' '}<Link href="/our-services" className="text-indigo-700 underline">NDIS services in Shepparton</Link>
            {' '}overview or contact our team for a tailored discussion around your goals, budget, and preferred support model.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>Use category filters to quickly find support-specific articles.</li>
            <li>Review update dates so you are using current pricing and policy information.</li>
            <li>Share relevant guides with your nominee, family, or allied health team before planning meetings.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
