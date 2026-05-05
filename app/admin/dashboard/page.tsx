"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Briefcase, Trophy, BookOpen, FileText, TrendingUp } from "lucide-react"

interface PortfolioData {
  projects?: unknown[]
  experiences?: unknown[]
  achievements?: string[]
  codingStats?: unknown[]
}

interface Blog {
  id: string
  published: boolean
}

export default function DashboardOverviewPage() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    fetch("/api/admin/portfolio").then(r => r.json()).then(setData)
    fetch("/api/admin/blogs").then(r => r.json()).then(setBlogs)
  }, [])

  const statsCards = [
    {
      label: "Projects",
      value: data?.projects?.length ?? 0,
      icon: Code,
      color: "text-[#58a6ff]",
      bgColor: "bg-[#58a6ff]/10",
      borderColor: "border-[#58a6ff]/20",
    },
    {
      label: "Experiences",
      value: data?.experiences?.length ?? 0,
      icon: Briefcase,
      color: "text-[#3fb950]",
      bgColor: "bg-[#3fb950]/10",
      borderColor: "border-[#3fb950]/20",
    },
    {
      label: "Achievements",
      value: data?.achievements?.length ?? 0,
      icon: Trophy,
      color: "text-[#ffa657]",
      bgColor: "bg-[#ffa657]/10",
      borderColor: "border-[#ffa657]/20",
    },
    {
      label: "Blog Posts",
      value: blogs.length,
      icon: BookOpen,
      color: "text-[#f778ba]",
      bgColor: "bg-[#f778ba]/10",
      borderColor: "border-[#f778ba]/20",
    },
    {
      label: "Published Blogs",
      value: blogs.filter(b => b.published).length,
      icon: FileText,
      color: "text-[#79c0ff]",
      bgColor: "bg-[#79c0ff]/10",
      borderColor: "border-[#79c0ff]/20",
    },
    {
      label: "Skill Categories",
      value: data ? Object.keys((data as Record<string, unknown>).skills ?? {}).length : 0,
      icon: TrendingUp,
      color: "text-[#d2a8ff]",
      bgColor: "bg-[#d2a8ff]/10",
      borderColor: "border-[#d2a8ff]/20",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-[#7d8590] mt-1">Manage your portfolio content from here.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className={`bg-[#161b22] border-[#30363d] hover:${stat.borderColor} transition-all`}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#7d8590] text-sm font-medium">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Edit Profile", href: "/admin/dashboard/profile", color: "from-[#238636] to-[#2ea043]" },
              { label: "Add Project", href: "/admin/dashboard/projects", color: "from-[#1f6feb] to-[#58a6ff]" },
              { label: "Write Blog", href: "/admin/dashboard/blog", color: "from-[#8b5cf6] to-[#a78bfa]" },
              { label: "Upload Resume", href: "/admin/dashboard/resume", color: "from-[#f59e0b] to-[#fbbf24]" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={`bg-gradient-to-r ${action.color} text-white rounded-xl p-4 text-center font-medium text-sm hover:opacity-90 transition-opacity shadow-lg`}
              >
                {action.label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
