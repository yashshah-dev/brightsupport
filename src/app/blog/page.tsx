import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  getBlogPosts, 
  getFeaturedPosts, 
  getAllCategories, 
  getAllTags 
} from '@/lib/blog';

export const metadata: Metadata = {
  title: 'NDIS Blog & Resources | Bright Support Shepparton',
  description: 'Expert NDIS guidance, disability support tips, and community resources for participants and families in Shepparton and Greater Victoria.',
  keywords: ['NDIS blog', 'disability support tips', 'NDIS Shepparton', 'NDIS resources', 'person-first language', 'NDIS planning'],
};

export default function BlogPage() {
  const allPosts = getBlogPosts();
  const featuredPosts = getFeaturedPosts(3);
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NDIS Resources & Insights
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl">
            Expert guidance for NDIS participants, families, and support coordinators in Shepparton and across Victoria.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 max-w-7xl py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                  {(post.featuredImage || (post as any).coverImage) && (
                    <Image
                      src={post.featuredImage || (post as any).coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{typeof post.readingTime === 'number' ? `${post.readingTime} min read` : post.readingTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-semibold">
                    Read more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Filters Section */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4 max-w-7xl py-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            <span className="text-gray-700 font-semibold">Filter by category:</span>
            <Link 
              href="/blog"
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium transition-colors"
            >
              All Posts
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className="px-4 py-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="container mx-auto px-4 max-w-7xl py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
        
        {allPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-indigo-50 rounded-full mb-4">
              <svg className="w-16 h-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Coming Soon!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're creating helpful NDIS resources and guides for you. Check back soon for expert insights and practical advice.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-gray-100">
                  {(post.featuredImage || (post as any).coverImage) && (
                    <Image
                      src={post.featuredImage || (post as any).coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{typeof post.readingTime === 'number' ? `${post.readingTime} min read` : post.readingTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 max-w-7xl py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Personalised NDIS Support?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Our team in Shepparton is ready to help you navigate your NDIS journey with confidence and dignity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/our-services"
              className="bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-800 transition-colors border-2 border-white"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
