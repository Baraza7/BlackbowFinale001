"use client"

import { use } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { BlogCard } from '@/components/BlogCard'
import { useState, useEffect } from 'react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorBio: string
  authorImage: string
  date: string
  category: string
  tags: string[]
  featuredImage: string
  readTime: string
  published: boolean
  featured: boolean
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

interface BlogConfig {
  settings: {
    articlesPerPage: number
    showExcerpts: boolean
    showAuthor: boolean
    showDate: boolean
    showCategory: boolean
    enableComments: boolean
    featuredArticleId: string
  }
  articles: Article[]
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [blogConfig, setBlogConfig] = useState<BlogConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/blog')
        if (!response.ok) {
          throw new Error('Failed to fetch blog data')
        }
        const data = await response.json()
        setBlogConfig(data)
      } catch (err) {
        console.error('Error fetching blog data:', err)
        setError('Failed to load articles.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !blogConfig) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
             <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Article</h1>
            <p className="text-gray-600 mb-4">{error || "Could not load the blog configuration."}</p>
            <Link href="/blog" className="text-blue-600 hover:underline">
              ← Back to Updates
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Find the article by slug
  const article = blogConfig.articles.find(a => a.slug === slug && a.published)
  
  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-4">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog" className="text-blue-600 hover:underline">
              ← Back to Updates
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Get related articles (same category, excluding current article)
  const relatedArticles = blogConfig.articles
    .filter(a => a.published && a.id !== article.id && a.category === article.category)
    .slice(0, 3)

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString;
    }
  }

  // Share functions
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = article.title
  
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
  }
  
  const shareOnX = () => {
    window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Glassmorphic Header Overlay Only */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="backdrop-blur-md bg-white/70 shadow-lg shadow-black/10 border-b border-white/30">
          <Header />
        </div>
      </div>
      {/* Spacer for fixed header */}
      <div className="h-[80px] md:h-[100px] lg:h-[112px]" />
      <article className="pt-0">
        {/* Breadcrumb (restored to original location) */}
        <div className="bg-[#FFBE00] py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-yellow-600">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/blog" className="text-gray-600 hover:text-yellow-600">Updates</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 truncate max-w-sm">{article.title}</span>
            </nav>
          </div>
        </div>
        {/* Hero Section */}
        <div className="w-full bg-black py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link 
                href="/blog" 
                className="inline-flex items-center text-[#FFBE00] hover:text-yellow-400 mb-8 transition-colors font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Updates
              </Link>
              {/* Article Meta */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-4 text-sm text-white mb-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                  {blogConfig.settings.showAuthor && (
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author}
                    </div>
                  )}
                </div>
              </div>
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#FFBE00' }}>
                {article.title}
              </h1>
              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {article.excerpt}
                </p>
              )}
              {/* Featured Image */}
              {article.featuredImage ? (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="mb-8 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center h-[200px]">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-yellow-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Tag className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share Section */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Share this article:</span>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={shareOnFacebook}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          title="Share on Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </button>
                        <button
                          onClick={shareOnX}
                          className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                          title="Share on X"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-8">
                    {/* Article Info */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-gray-900 mb-4">Article Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Published: {formatDate(article.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Reading time: {article.readTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Category: {article.category}</span>
                        </div>
                        {article.tags && article.tags.length > 0 && (
                          <div className="pt-2">
                            <span className="text-gray-600 text-xs font-medium">Tags:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {article.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="bg-white text-gray-600 px-2 py-1 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-gray-900 mb-4">Quick Navigation</h3>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-gray-800">Quick Links</h4>
                        <ul className="space-y-2">
                          <li><Link href="/" className="block text-gray-600 hover:text-yellow-600 transition-colors">Home</Link></li>
                          <li><Link href="/about" className="block text-gray-600 hover:text-yellow-600 transition-colors">About Us</Link></li>
                          <li><Link href="/services" className="block text-gray-600 hover:text-yellow-600 transition-colors">Services</Link></li>
                          <li>
                            <Link href="/contacts" className="block text-gray-600 hover:text-yellow-600 transition-colors">
                              Contact Us
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <BlogCard
                      key={relatedArticle.id}
                      image={relatedArticle.featuredImage}
                      category={relatedArticle.category}
                      title={relatedArticle.title}
                      excerpt={relatedArticle.excerpt}
                      author={relatedArticle.author}
                      date={relatedArticle.date}
                      slug={relatedArticle.slug}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  )
} 