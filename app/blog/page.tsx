import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, Download, ExternalLink, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { InfoCard } from "@/components/InfoCard"
import { FileText, Megaphone } from "lucide-react"
import { BlogCard } from "@/components/BlogCard"
import SharedPageSections from "@/components/SharedPageSections"
import BentoGridGallery from "@/components/BentoGridGallery"
import InnerHero from "@/components/InnerHero"
import { unstable_noStore as noStore } from 'next/cache';

// Define interfaces for type safety
interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio: string;
  authorImage: string;
  date: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: string;
  published: boolean;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

interface BlogConfig {
  settings: {
    articlesPerPage: number;
    showExcerpts: boolean;
    showAuthor: boolean;
    showDate: boolean;
    showCategory: boolean;
    enableComments: boolean;
    featuredArticleId: string;
  };
  articles: Article[];
}

async function getBlogData(): Promise<BlogConfig | null> {
  // noStore() is a Next.js function that prevents caching of this fetch request.
  // This ensures we always get the latest blog posts from the database.
  noStore();
  
  // We need to use the absolute URL for the API endpoint when fetching from a Server Component.
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const apiUrl = `${apiBaseUrl}/api/blog`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      // Log the error for server-side debugging
      console.error(`API fetch failed with status: ${res.status}`, await res.text());
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch blog data:', error);
    return null;
  }
}

export default async function BlogPage() {
  const blogConfig = await getBlogData();

  if (!blogConfig || !blogConfig.articles) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Could not load articles. Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Get published articles
  const publishedArticles = blogConfig.articles.filter(article => article.published)
  
  // Get featured article
  const featuredArticle = publishedArticles.find(article => article.featured) || publishedArticles[0]
  
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero Section */}
      <InnerHero>
        <div className="space-y-6 text-center">
          <h1 className="hero-title text-white whitespace-nowrap">
            Stay Informed <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE00] to-[#00B1D2]">&amp; Engaged</span>
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto">
            Read our latest updates, press notes, and insights. Keep pace with industry trends and company news
            that matter to your business and projects.
          </p>
        </div>
      </InnerHero>

      {/* Info Cards Section - Overlapping Design */}
      <section className="relative -mt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto">
            <InfoCard icon={<FileText className="h-8 w-8 text-white" />} title="Latest Updates">
              <p className="text-sm">{featuredArticle?.title || 'No articles yet'}</p>
            </InfoCard>
            <InfoCard icon={<Calendar className="h-8 w-8 text-white" />} title="Upcoming Event">
                <p className="text-sm">Webinar: Navigating Market Volatility</p>
            </InfoCard>
            <InfoCard icon={<Megaphone className="h-8 w-8 text-white" />} title="Recent News">
                <p className="text-sm">Blackbow Partners with FinTech Innovators</p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Introductory Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--accent-yellow)' }}>
              Latest Updates from Blackbow
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Welcome to our update hub. Here, you'll find the latest news, in-depth articles, and expert analysis on the financial landscape. We are committed to providing valuable insights that help you stay ahead in the dynamic world of trade, finance, and investment.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Latest Updates
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              Dive into our collection of updates for expert analysis, industry trends, and valuable insights that can help inform your financial strategies and business decisions.
            </p>
          </div>
          {publishedArticles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-white/50" />
              <p className="text-white/70">No articles published yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedArticles.map((article) => (
                <BlogCard 
                  key={article.id}
                  image={article.featuredImage}
                  category={article.category}
                  title={article.title}
                  excerpt={article.excerpt}
                  author={article.author}
                  date={article.date}
                  slug={article.slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Media Gallery Section */}
      {/* <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--accent-yellow)' }}>
              Our Media Gallery
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore moments from our events, workshops, and company milestones. This gallery captures the vibrant spirit and professional dedication of the Blackbow team.
            </p>
          </div>
          <BentoGridGallery />
        </div>
      </section> */}

      <SharedPageSections />
      <Footer />
    </div>
  )
}

// Component for News Card
function NewsCard({ title, date, excerpt, slug }: { title: string; date: string; excerpt: string; slug: string }) {
  return (
    <Card className="p-4 xs:p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center text-xs xs:text-sm text-gray-500 mb-2">
        <Calendar className="h-3 w-3 xs:h-4 xs:w-4 mr-1" />
        <span className="font-body">{date}</span>
      </div>
      <h3 className="font-sans text-base xs:text-lg font-bold mb-2 text-[#27272A]">{title}</h3>
      <p className="font-body text-gray-600 text-xs xs:text-sm mb-3">{excerpt}</p>
      <Link
        href={`/blog/news/${slug}`}
        className="font-sans text-[#00B1D2] text-xs xs:text-sm font-medium hover:underline"
      >
        Read more <ArrowRight className="inline h-2 w-2 xs:h-3 xs:w-3 ml-1" />
      </Link>
    </Card>
  )
}

// Component for Gallery Item
function GalleryItem({ image, title, type }: { image: string; title: string; type: "photo" | "video" }) {
  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer">
      <div className="aspect-square relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-white text-center p-3 xs:p-4">
            <div className="mb-1 xs:mb-2">
              {type === "photo" ? (
                <Search className="h-6 w-6 xs:h-8 xs:w-8 mx-auto" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 xs:h-8 xs:w-8 mx-auto"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </div>
            <h4 className="font-sans font-medium text-xs xs:text-sm">{title}</h4>
            <p className="text-[10px] xs:text-xs mt-1 font-body">{type === "photo" ? "View Photo" : "Watch Video"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for Press Release Item
function PressReleaseItem({
  title,
  date,
  excerpt,
  slug,
}: {
  title: string
  date: string
  excerpt: string
  slug: string
}) {
  return (
    <div className="bg-white p-4 xs:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-center text-xs xs:text-sm text-gray-500 mb-2 xs:mb-3">
        <Calendar className="h-3 w-3 xs:h-4 xs:w-4 mr-1" />
        <span className="font-body">{date}</span>
      </div>
      <h3 className="font-sans text-lg xs:text-xl font-bold mb-2 xs:mb-3 text-[#27272A]">{title}</h3>
      <p className="font-body text-gray-600 mb-3 xs:mb-4 text-xs xs:text-sm">{excerpt}</p>
      <div className="flex justify-between items-center">
        <Link href={`/blog/press-releases/${slug}`}>
          <Button
            variant="outline"
            style={{ borderColor: "#D01C1F", color: "#D01C1F" }}
            className="hover:bg-[#D01C1F] hover:text-white text-xs xs:text-sm"
          >
            Read Full Release <ArrowRight className="ml-2 h-3 w-3 xs:h-4 xs:w-4" />
          </Button>
        </Link>
        <a
          href="#"
          className="text-gray-500 hover:text-[#00B1D2] transition-colors flex items-center font-sans text-xs xs:text-sm"
        >
          <ExternalLink className="h-3 w-3 xs:h-4 xs:w-4 mr-1" /> PDF
        </a>
      </div>
    </div>
  )
}

// Component for Resource Card
function ResourceCard({
  title,
  description,
  type,
  size,
}: {
  title: string
  description: string
  type: string
  size: string
}) {
  return (
    <Card className="p-4 xs:p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="mb-3 xs:mb-4 p-2 xs:p-3 bg-gray-100 rounded-lg inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 xs:h-6 xs:w-6 text-[#00B1D2]"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <h3 className="font-sans text-lg xs:text-xl font-bold mb-2 text-[#27272A]">{title}</h3>
      <p className="font-body text-gray-600 mb-3 xs:mb-4 flex-grow text-xs xs:text-sm">{description}</p>
      <div className="flex items-center justify-between">
        <span className="font-body text-xs xs:text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
          {type} • {size}
        </span>
        <Button
          variant="outline"
          style={{ borderColor: "#00B1D2", color: "#00B1D2" }}
          className="hover:bg-[#00B1D2] hover:text-white text-xs xs:text-sm"
        >
          <Download className="mr-2 h-3 w-3 xs:h-4 xs:w-4" /> Download
        </Button>
      </div>
    </Card>
  )
}

// Component for Event Card
function EventCard({
  title,
  date,
  location,
  description,
}: {
  title: string
  date: string
  location: string
  description: string
}) {
  return (
    <Card className="p-4 xs:p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-3 xs:gap-4">
        <div className="md:w-20 xs:md:w-24 flex-shrink-0 bg-[#FFBE00] text-[#27272A] rounded-lg p-2 xs:p-3 text-center">
          <div className="font-body text-xs xs:text-sm font-medium">{date.split(" ")[0]}</div>
          <div className="font-sans text-xl xs:text-2xl font-bold">{date.split(" ")[1].replace(",", "")}</div>
        </div>
        <div>
          <h3 className="font-sans text-lg xs:text-xl font-bold mb-2 text-[#27272A]">{title}</h3>
          <div className="flex items-center font-body text-gray-600 mb-1 xs:mb-2 text-xs xs:text-sm">
            <Calendar className="h-3 w-3 xs:h-4 xs:w-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center font-body text-gray-600 mb-2 xs:mb-3 text-xs xs:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 xs:h-4 xs:w-4 mr-2"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{location}</span>
          </div>
          <p className="font-body text-gray-600 mb-3 xs:mb-4 text-xs xs:text-sm">{description}</p>
          <Button
            variant="outline"
            style={{ borderColor: "#D01C1F", color: "#D01C1F" }}
            className="hover:bg-[#D01C1F] hover:text-white text-xs xs:text-sm"
          >
            Register Now
          </Button>
        </div>
      </div>
    </Card>
  )
} 