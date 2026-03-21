import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPost, getRelatedPosts, getBlogPosts } from '@/lib/blog';
import { getServiceUrl } from '@/lib/serviceUrls';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all blog posts (required for static export)
export function generateStaticParams() {
  const posts = getBlogPosts();
  
  // Return empty array if no posts yet (allows build to succeed)
  if (posts.length === 0) {
    return [];
  }
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const BASE_URL = 'https://www.brightsupport.com.au';

  if (!post) {
    return {
      title: 'Post Not Found | Bright Support',
    };
  }

  const canonical = `${BASE_URL}/blog/${slug}/`;

  return {
    title: `${post.title} | Bright Support Shepparton`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical,
      languages: { en: canonical, 'x-default': canonical },
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
      url: canonical,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl py-4">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-indigo-600">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href=".." className="hover:text-indigo-600">Blog</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {post.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Article Header */}
      <article className="container mx-auto px-4 max-w-4xl py-12">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link 
              href={`..?category=${encodeURIComponent(post.category)}`}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold hover:bg-indigo-200 transition-colors"
            >
              {post.category}
            </Link>
            {(post as any).ndis?.personFirstLanguage && (
              <>
                <span className="text-gray-500 text-sm">•</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  NDIS Compliant
                </span>
              </>
            )}
            <span className="text-gray-500 text-sm">•</span>
            <time className="text-gray-500 text-sm">
              {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">{typeof post.readingTime === 'number' ? `${post.readingTime} min read` : post.readingTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {(post.featuredImage || (post as any).coverImage) && (
          <div className="mb-12">
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={post.featuredImage || (post as any).coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {(post as any).coverImage && (post as any).coverImage.includes('pexels.com') && (
              <p className="text-xs text-gray-500 mt-2 text-right">
                Photo by Pexels
              </p>
            )}
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg prose-indigo max-w-none mb-12 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-ul:my-6 prose-li:my-2 prose-strong:text-gray-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags & Metadata */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          {post.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`..?tag=${encodeURIComponent(tag)}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {post.wordCount && (
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{post.wordCount} words</span>
              </div>
            </div>
          )}
        </div>

        {/* Related Services */}
        {post.relatedServices && post.relatedServices.length > 0 && (
          <div className="bg-indigo-50 rounded-xl p-6 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
            <div className="space-y-2">
              {post.relatedServices.map((service) => (
                <Link
                  key={service}
                  href={getServiceUrl(service)}
                  className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Info */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <div className="flex items-start gap-4">
            {typeof post.author === 'string' ? (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {post.author.charAt(0)}
              </div>
            ) : (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900 text-lg">
                {typeof post.author === 'string' ? post.author : post.author.name}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                {typeof post.author === 'string' 
                  ? 'NDIS Support Team | Bright Support Shepparton'
                  : post.author.role + ' | Bright Support Shepparton'
                }
              </p>
              <p className="text-gray-600 text-sm">
                Dedicated to providing person-first, empowering NDIS support services across the Greater Shepparton region.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-8 text-center text-white mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Contact our team in Shepparton for personalised NDIS support tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg inline-block"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:1800407508"
              className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors border-2 border-white inline-block"
            >
              Call 1800 407 508
            </a>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`../${relatedPost.slug}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-gradient-to-br from-slate-100 to-gray-100">
                    {relatedPost.featuredImage && (
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-indigo-600 font-semibold mb-2">
                      {relatedPost.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
