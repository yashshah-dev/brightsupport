'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Search, Filter, TrendingUp } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';
import { BlogPost } from '@/lib/blog';

interface BlogHubProps {
  locale?: string;
  allPosts: BlogPost[];
  featuredPosts: BlogPost[];
  categories: string[];
  tags: string[];
}

export default function BlogHub({
  locale = 'en',
  allPosts,
  featuredPosts,
  categories,
  tags,
}: BlogHubProps) {
  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'reading-time'>('recent');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const hash = window.location.hash.startsWith('#')
      ? window.location.hash.slice(1)
      : '';

    if (!hash) {
      return;
    }

    const hashParams = new URLSearchParams(hash);
    const hashCategory = hashParams.get('category');
    const hashTags = hashParams.getAll('tag');
    const categorySlugMap = new Map(categories.map((category) => [toSlug(category), category]));
    const tagSlugMap = new Map(tags.map((tag) => [toSlug(tag), tag]));

    if (hashCategory) {
      const normalizedHashCategory = decodeURIComponent(hashCategory).toLowerCase();
      const resolvedCategory =
        categories.find((category) => category.toLowerCase() === normalizedHashCategory) ||
        categorySlugMap.get(normalizedHashCategory) ||
        null;

      if (resolvedCategory) {
        setSelectedCategory(resolvedCategory);
      }
    }

    if (hashTags.length > 0) {
      const validTags = hashTags
        .map((tag) => {
          const normalizedHashTag = decodeURIComponent(tag).toLowerCase();
          return (
            tags.find((item) => item.toLowerCase() === normalizedHashTag) ||
            tagSlugMap.get(normalizedHashTag) ||
            null
          );
        })
        .filter((tag): tag is string => Boolean(tag));

      if (validTags.length > 0) {
        setSelectedTags(Array.from(new Set(validTags)));
      }
    }
  }, [categories, tags]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory = !selectedCategory || post.category === selectedCategory;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((selectedTag) => post.tags.includes(selectedTag));

      return matchesSearch && matchesCategory && matchesTags;
    });

    // Sort posts
    posts.sort((a, b) => {
      if (sortBy === 'recent') {
        const dateA = new Date(a.publishedAt || 0).getTime();
        const dateB = new Date(b.publishedAt || 0).getTime();
        return dateB - dateA;
      } else if (sortBy === 'popular') {
        return (b.seoScore || 0) - (a.seoScore || 0);
      } else if (sortBy === 'reading-time') {
        const timeA = typeof a.readingTime === 'number' ? a.readingTime : 0;
        const timeB = typeof b.readingTime === 'number' ? b.readingTime : 0;
        return timeA - timeB;
      }
      return 0;
    });

    return posts;
  }, [searchQuery, selectedCategory, selectedTags, sortBy, allPosts]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0F2D4D] via-[#1E4D8C] to-[#2563EB] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-[#7DD3FC]" />
            <span className="text-[#7DD3FC] font-semibold">NDIS Resources Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Blog Posts & Guides
          </h1>
          <p className="text-xl text-[#38BDF8] max-w-2xl">
            Expert NDIS guidance, disability support insights, and community resources curated for participants, families, and support coordinators.
          </p>
        </div>
      </section>



      {/* Search & Filter Section */}
      <section className="container mx-auto px-4 max-w-7xl py-8 border-t border-gray-200">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts by title, keywords, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E4D8C] transition-colors bg-white"
            />
          </div>

          {/* Filters & Controls */}
          <div className="flex flex-col gap-4">
            {/* Category Filter */}
            {categories.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">Categories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === null
                        ? 'bg-[#1E4D8C] text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-[#1E4D8C] text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tag Filter */}
            {tags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-gray-700">Popular Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                            ? 'bg-[#1E4D8C] text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort & View Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'reading-time')}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1E4D8C]"
                >
                  <option value="recent">Most Recent</option>
                  <option value="reading-time">Reading Time (Shortest)</option>
                </select>
              </div>

              <div className="flex gap-2">
                <span className="text-sm text-gray-600 font-medium">View:</span>
                <button
                  onClick={() => setViewType('grid')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewType === 'grid'
                      ? 'bg-[#1E4D8C] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewType('list')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewType === 'list'
                      ? 'bg-[#1E4D8C] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredPosts.length}</span> of{' '}
              <span className="font-bold text-gray-900">{allPosts.length}</span> articles
            </span>
            {(selectedCategory || selectedTags.length > 0 || searchQuery) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedTags([]);
                }}
                className="text-sm text-[#1E4D8C] hover:text-indigo-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Posts Grid/List */}
      <section className="container mx-auto px-4 max-w-7xl py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-indigo-50 rounded-full mb-4">
              <svg className="w-16 h-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Try adjusting your search criteria or browse all articles to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setSelectedTags([]);
              }}
              className="bg-[#1E4D8C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#DC3545] transition-colors"
            >
              Browse All Articles
            </button>
          </div>
        ) : viewType === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  {(post.featuredImage || post.coverImage) && (
                    <Image
                      src={post.featuredImage || post.coverImage || ''}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="bg-[#E0F2FE] text-[#1E4D8C] px-2.5 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="font-medium">{typeof post.readingTime === 'number' ? `${post.readingTime} min` : post.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#1E4D8C] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        +{post.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 flex gap-6 items-start hover:bg-indigo-50 border-l-4 border-transparent hover:border-indigo-600"
              >
                <div className="relative aspect-square w-48 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden hidden sm:block">
                  {(post.featuredImage || post.coverImage) && (
                    <Image
                      src={post.featuredImage || post.coverImage || ''}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="bg-[#E0F2FE] text-[#1E4D8C] px-2.5 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="font-medium">{typeof post.readingTime === 'number' ? `${post.readingTime} min read` : post.readingTime}</span>
                    {post.wordCount && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span>{post.wordCount} words</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1E4D8C] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{tag}
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
        <div className="bg-gradient-to-r from-[#DC3545] to-[#E74C5C] rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Personalised NDIS Support?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our expert team in Shepparton is ready to guide you through your NDIS journey with confidence and dignity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              onClick={() => trackButtonClick('Blog Hub CTA - Book Consultation')}
              className="bg-white text-[#1E4D8C] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/our-services"
              onClick={() => trackButtonClick('Blog Hub CTA - Explore Services')}
              className="bg-[#DC3545] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#E74C5C] transition-colors border-2 border-white"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
