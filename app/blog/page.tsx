"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"

interface Blog {
  id: string; title: string; slug: string; content: string; excerpt: string
  tags: string[]; publishedAt: string; published: boolean
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/blogs?public=true")
      .then(r => r.json())
      .then(b => { setBlogs(b); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const estimateReadTime = (content: string) => Math.max(1, Math.ceil(content.split(/\s+/).length / 200))

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] relative">
      <AnimatedBackground />

      {/* Header */}
      <header className="border-b border-[#21262d] bg-[#010409]/95 backdrop-blur-md px-4 py-4 sticky top-0 z-50">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-[#7d8590] hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Avatar className="h-8 w-8 border border-[#30363d]">
              <AvatarImage src="/profile2.jpeg" alt="Author" className="object-cover" />
              <AvatarFallback className="bg-[#21262d] text-white text-sm">F</AvatarFallback>
            </Avatar>
            <span className="text-white font-semibold">Blog</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-[#7d8590] hover:text-white transition-colors">Portfolio</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16 relative z-10">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161b22] border border-[#30363d] text-[#58a6ff] mb-6 shadow-lg shadow-[#58a6ff]/5">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium">Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Thoughts & Writings</h1>
          <p className="text-[#7d8590] text-lg max-w-xl mx-auto leading-relaxed">
            Articles about software engineering, system design, and building scalable systems.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-[#58a6ff]/30 border-t-[#58a6ff] rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <Card className="bg-[#161b22] border-[#30363d] shadow-xl">
            <CardContent className="p-16 text-center">
              <BookOpen className="h-16 w-16 text-[#21262d] mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">No posts yet</h3>
              <p className="text-[#7d8590] max-w-sm mx-auto">Stay tuned! I&apos;ll be sharing articles about software engineering, system design, and more.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Featured / First Post */}
            {blogs.length > 0 && (
              <Link href={`/blog/${blogs[0].slug}`}>
                <Card className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff]/50 transition-all group cursor-pointer overflow-hidden shadow-xl hover:shadow-[#58a6ff]/5 mb-8">
                  <CardContent className="p-0">
                    <div className="p-8 sm:p-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className="bg-[#58a6ff]/10 text-[#58a6ff] border-[#58a6ff]/20 text-xs">Latest</Badge>
                        <span className="text-[#484f58] text-xs">•</span>
                        <span className="flex items-center gap-1 text-xs text-[#7d8590]">
                          <Calendar className="h-3 w-3" />
                          {new Date(blogs[0].publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#7d8590]">
                          <Clock className="h-3 w-3" />
                          {estimateReadTime(blogs[0].content)} min read
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#58a6ff] transition-colors mb-3 leading-tight">
                        {blogs[0].title}
                      </h2>
                      {blogs[0].excerpt && (
                        <p className="text-[#8b949e] text-base leading-relaxed mb-5 line-clamp-2">{blogs[0].excerpt}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {blogs[0].tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {blogs[0].tags.map((tag, i) => (
                              <Badge key={i} className="bg-[#21262d] text-[#7d8590] border-[#30363d] text-xs">{tag}</Badge>
                            ))}
                          </div>
                        )}
                        <span className="text-[#58a6ff] text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Read more <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Rest of posts */}
            {blogs.slice(1).map(blog => (
              <Link key={blog.id} href={`/blog/${blog.slug}`}>
                <Card className="bg-[#161b22] border-[#30363d] hover:border-[#484f58] transition-all group cursor-pointer mb-4">
                  <CardContent className="p-6 sm:p-7">
                    <div className="flex items-center gap-3 text-xs text-[#7d8590] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {estimateReadTime(blog.content)} min read
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-[#58a6ff] transition-colors mb-2">{blog.title}</h2>
                    {blog.excerpt && <p className="text-[#8b949e] text-sm leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>}
                    <div className="flex items-center justify-between">
                      {blog.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {blog.tags.map((tag, i) => (
                            <Badge key={i} className="bg-[#21262d] text-[#7d8590] border-[#30363d] text-[10px]">{tag}</Badge>
                          ))}
                        </div>
                      ) : <div />}
                      <span className="text-[#58a6ff] text-xs font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 flex-shrink-0">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-[#21262d] bg-[#010409] px-4 py-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#484f58] text-sm">Crafted with care • 2025</p>
        </div>
      </footer>
    </div>
  )
}
