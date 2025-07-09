"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, Github, Linkedin, Mail, Phone, Star, Trophy, MapPin, Building, GitFork, BookOpen, Code, Zap, Menu, X, Download } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"

export default function Component() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Function to handle resume download
  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Farhan_sde_resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const projects = [
    {
      title: "Notification System (LLD)",
      description: "Built a C++ notification system with SMS, Email, and Push support using OOPS and design patterns",
      tech: ["C++", "OOP", "Design Patterns"],
      github: "https://github.com/theNahraf/Notification_LLD_Scalable_System_Design",
      date: "May 2025",
      stars: 12,
      forks: 3,
      language: "C++",
      highlights: [
        "Applied Strategy and Decorator patterns with SOLID principles",
        "Ensured clean, Scalable design with notification tracking",
      ],
    },
    {
      title: "SpotLight - The Social App",
      description: "Built a social app with story, media uploads, and real-time like/comment functionality",
      tech: ["React Native", "TypeScript", "MongoDB"],
      github: "https://github.com/theNahraf/spotlight-the-interaction-app",
      date: "January 2025",
      stars: 28,
      forks: 7,
      language: "TypeScript",
      highlights: ["Interactive UI with smooth media handling", "Secure authentication and MongoDB integration"],
    },
    {
      title: "StudyNotion – EdTech",
      description: "Built a full-stack EdTech platform with course creation, enrollment, and Razorpay integration",
      tech: ["Node.js", "Express.js", "MongoDB", "React.js"],
      github: "https://github.com/theNahraf/StudyNotion-Edtech",
      demo: "https://study-notion-mern-stack.netlify.app/",
      date: "November 2024",
      stars: 45,
      forks: 12,
      language: "JavaScript",
      highlights: ["Role-based authentication using JWT and OTP", "Integrated AI chatbot for student queries"],
    },
  ]

  const experiences = [
    {
      title: "Deep Learning Research Intern",
      company: "NSUT",
      location: "New Delhi, Delhi",
      period: "June 2025 – Present",
      type: "Hydroponic Plant Analysis",
      description: [
        "Working on classification of hydroponic plant conditions using deep learning on hyperspectral data",
        "Analyzing plant leaf spectra to predict chemical deficiencies and nutrient imbalances",
        "Exploring CNN and transfer learning techniques to enhance prediction accuracy",
      ],
    },
    {
      title: "Full-Stack Web Developer",
      company: "Client: Journalist (Kashmir)",
      location: "fizalakhan.com",
      period: "Dec. 2024 – June 2025",
      type: "Freelance",
      description: [
        "Created a secure MERN stack portfolio + blog for a journalist with a hidden admin dashboard",
        "Built a custom panel for article management without exposing public login",
        "Ensured 24/7 uptime on free-tier hosting by implementing a backend refresh loop",
      ],
    },
  ]

  const skills = {
    Languages: ["Python", "C/C++", "JavaScript"],
    "Databases & Tools": ["MongoDB", "FireBase", "Convex", "Git", "Docker"],
    Frameworks: ["React.js", "Node.js", "React Native", "Express.js"],
    "System Design": ["Low-Level Design"],
    "Problem Solving": ["Leetcode", "Codeforces", "GFG"],
  }

  const achievements = [
    "Secured 2nd position at Microsoft Innovortex Hackathon among 100+ teams",
    "Cleared Level 1 of Flipkart Grid 6.0 (Tech Track)",
    "Achieved 1800+ rating on LeetCode by solving 400+ Data Structures and Algorithms problems",
  ]

  // Coding platform stats
  const codingStats = [
    {
      platform: "LeetCode",
      rating: "1800+",
      problems: "600+",
      color: "text-[#ffa116]",
      bgColor: "bg-[#ffa116]/10",
      borderColor: "border-[#ffa116]/20",
      url: `https://www.leetcode.com/u/urraf`
    },
    {
      platform: "Codeforces",
      rating: "450+",
      problems: "100+",
      color: "text-[#1f8acb]",
      bgColor: "bg-[#1f8acb]/10",
      borderColor: "border-[#1f8acb]/20",
      url: `https://codeforces.com/profile/nahraf.xd`
    },
  ]

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] w-full overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-[#21262d] bg-[#010409] px-2 sm:px-4 py-2 sm:py-4 sticky top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                <AvatarImage src="/profile1.jpeg?height=32&width=32" alt="Farhan" />
                <AvatarFallback className="bg-[#21262d] text-white text-xs sm:text-sm">F</AvatarFallback>
              </Avatar>
              <span className="text-white font-medium text-xs sm:text-base truncate">Farhan</span>
              <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm ml-4 lg:ml-6">
                <Link href="#overview" className="text-[#e6edf3] hover:text-white transition-colors whitespace-nowrap">
                  Overview
                </Link>
                <Link
                  href = {`https://github.com/theNahraf?tab=repositories`}
                  className="text-[#7d8590] hover:text-white transition-colors whitespace-nowrap"
                >
                  Repositories
                </Link>
                <Link href="#projects" className="text-[#7d8590] hover:text-white transition-colors whitespace-nowrap">
                  Projects
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Button
                size="sm"
                onClick={handleDownloadResume}
                className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 hidden sm:flex text-xs px-2 sm:px-3 py-1 sm:py-1.5 h-7 sm:h-8"
              >
                <Download className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Resume</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="md:hidden text-[#e6edf3] hover:bg-[#21262d] p-1 h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-3 w-3 sm:h-4 sm:w-4" /> : <Menu className="h-3 w-3 sm:h-4 sm:w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#21262d] w-full">
              <nav className="flex flex-col gap-2 sm:gap-3 text-sm w-full">
                <Link href="#overview" className="text-[#e6edf3] hover:text-white transition-colors py-1 w-full">
                  Overview
                </Link>
                <Link href={`https://github.com/theNahraf?tab=repositories`} className="text-[#7d8590] hover:text-white transition-colors py-1 w-full">
                  Repositories
                </Link>
                <Link href="#projects" className="text-[#7d8590] hover:text-white transition-colors py-1 w-full">
                  Projects
                </Link>
                <Button
                  size="sm"
                  onClick={handleDownloadResume}
                  className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 text-xs px-3 py-1.5 w-fit mt-1"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download Resume
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-2 sm:px-4 py-3 sm:py-6 lg:py-8 w-full">
        {/* Mobile Profile Header */}
        <div className="lg:hidden mb-4 sm:mb-6 w-full">
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 w-full">
            <Avatar className="h-20 w-20 sm:h-32 sm:w-32 flex-shrink-0">
              <AvatarImage src="/profile1.jpeg?height=128&width=128" alt="Farhan" className="object-cover" />
              <AvatarFallback className="bg-[#21262d] text-xl sm:text-3xl text-white">F</AvatarFallback>
            </Avatar>
            <div className="w-full max-w-sm mx-auto">
              <h1 className="text-lg sm:text-2xl font-semibold text-white mb-1">Farhan</h1>
              <Link href={`https://www.github.com/thenahraf`} className="text-sm sm:text-lg text-[#00e2e8] mb-2">Github</Link>
              <p className="text-xs sm:text-sm text-[#e6edf3] mb-3 sm:mb-4 leading-relaxed px-2">
                Full-Stack Developer & CS Student passionate about building scalable applications
              </p>
              <Button
                onClick={handleDownloadResume}
                className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-auto"
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-6 lg:gap-8 lg:grid-cols-4 w-full">
          {/* Left Sidebar - Hidden on mobile, shown in main content */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            {/* Desktop Profile Card */}
            <div className="space-y-4">
              <Avatar className="h-64 w-64 mx-auto xl:h-72 xl:w-72">
                <AvatarImage src="/profile1.jpeg?height=288&width=288" alt="Farhan" className="object-fit" />
                <AvatarFallback className="bg-[#21262d] text-5xl xl:text-6xl text-white">F</AvatarFallback>
              </Avatar>

              <div className="text-center xl:text-left">
                <h1 className="text-2xl font-semibold text-white mb-1">Farhan</h1>
                <Link href={`https://www.github.com/thenahraf`} className="text-xl text-[#00e2e8] mb-3">Github</Link>
                <p className="text-[#e6edf3] mb-4 leading-relaxed">
                  Full-Stack Developer & CS Student passionate about building scalable applications and exploring deep
                  learning.
                </p>

                <Button
                  onClick={handleDownloadResume}
                  className="w-full bg-[#238636] hover:bg-[#2ea043] text-white border-0 mb-4"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-[#7d8590] justify-center xl:justify-start">
                    <Building className="h-4 w-4 flex-shrink-0" />
                    <span>NSUT</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#7d8590] justify-center xl:justify-start">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>New Delhi, India</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center xl:justify-start">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <Link
                      href="mailto:farhan.techcareer@gmail.com"
                      className="text-[#58a6ff] hover:underline text-xs break-all"
                    >
                      farhan.techcareer@gmail.com
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 justify-center xl:justify-start">
                    <Linkedin className="h-4 w-4 flex-shrink-0" />
                    <Link href="https://linkedin.com/in/nahrafxd/" className="text-[#58a6ff] hover:underline text-xs">
                      linkedin.com/in/nahrafxd
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-[#7d8590] justify-center xl:justify-start">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>8700840260</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coding Platform Stats */}
            <Card className="bg-[#161b22] border-[#30363d]">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base">Coding Platforms</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {codingStats.map((stat, index) => (
                  <Link key={index} href={stat.url}>
                  <div key={index} className={`mb-3 p-3 rounded-lg border ${stat.bgColor} ${stat.borderColor}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white text-sm">{stat.platform}</span>
                      <span className={`text-sm font-bold ${stat.color}`}>{stat.rating}</span>
                    </div>
                    <div className="text-xs text-[#7d8590]">{stat.problems} problems solved</div>
                  </div>
                  </Link>

                ))}
              </CardContent>
            </Card>

            {/* Desktop Achievements */}
            <Card className="bg-[#161b22] border-[#30363d]">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-base">
                  <Trophy className="h-4 w-4 text-[#ffa657]" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Star className="h-3 w-3 text-[#ffa657] mt-1 flex-shrink-0" />
                      <span className="text-[#e6edf3] leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Desktop Technical Skills */}
            <Card className="bg-[#161b22] border-[#30363d]">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-medium text-white text-sm mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-1">
                      {items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-[#21262d] text-[#58a6ff] border-[#30363d] text-xs hover:bg-[#30363d] transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-6 w-full min-w-0">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full">
              <Card className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-colors min-w-0">
                <CardContent className="p-2 sm:p-4 text-center">
                  <div className="text-base sm:text-xl lg:text-2xl font-bold text-white">18+</div>
                  <div className="text-xs sm:text-sm text-[#7d8590] truncate">Github Repositories</div>
                </CardContent>
              </Card>
              <Card className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-colors min-w-0">
                <CardContent className="p-2 sm:p-4 text-center">
                  <div className="text-base sm:text-xl lg:text-2xl font-bold text-white">1.8k</div>
                  <div className="text-xs sm:text-sm text-[#7d8590] truncate">LeetCode Ratings</div>
                </CardContent>
              </Card>
              <Card className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-colors min-w-0">
                <CardContent className="p-2 sm:p-4 text-center">
                  <div className="text-base sm:text-xl lg:text-2xl font-bold text-white">450+</div>
                  <div className="text-xs sm:text-sm text-[#7d8590] truncate">Codeforces Ratings</div>
                </CardContent>
              </Card>
              <Card className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-colors min-w-0">
                <CardContent className="p-2 sm:p-4 text-center">
                  <div className="text-base sm:text-xl lg:text-2xl font-bold text-white">700+</div>
                  <div className="text-xs sm:text-sm text-[#7d8590] truncate">Problem Solved</div>
                </CardContent>
              </Card>
            </div>

            {/* Contribution Graph */}
            {/* <div className="w-full">
              <ContributionGraph />
            </div> */}

            {/* Mobile Coding Platform Stats */}
            <div className="lg:hidden w-full">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Coding Platforms</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2 sm:space-y-3">
                  {codingStats.map((stat, index) => (
                    <div key={index} className={`p-2 sm:p-3 rounded-lg border ${stat.bgColor} ${stat.borderColor}`}>
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="font-medium text-white text-xs sm:text-sm">{stat.platform}</span>
                        <span className={`text-xs sm:text-sm font-bold ${stat.color}`}>{stat.rating}</span>
                      </div>
                      <div className="text-xs text-[#7d8590]">{stat.problems} problems solved</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Mobile Contact Info */}
            <div className="lg:hidden w-full">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Contact</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-[#7d8590]">
                      <Building className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>NSUT</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#7d8590]">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>New Delhi, India</span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <Link
                        href="mailto:farhan.techcareer@gmail.com"
                        className="text-[#58a6ff] hover:underline text-xs break-all min-w-0"
                      >
                        farhan.techcareer@gmail.com
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>8700840260</span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <Link
                        href="https://linkedin.com/in/nahrafxd/"
                        className="text-[#58a6ff] hover:underline text-xs truncate min-w-0"
                      >
                        linkedin.com/in/nahrafxd
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Technical Skills */}
            <div className="lg:hidden w-full">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3 sm:space-y-4">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="w-full">
                      <h4 className="font-medium text-white text-xs sm:text-sm mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-1">
                        {items.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-[#21262d] text-[#58a6ff] border-[#30363d] text-xs hover:bg-[#30363d] transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Education */}
            <Card className="bg-[#161b22] border-[#30363d] w-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-sm">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="border-l-2 border-[#30363d] pl-3 sm:pl-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-xs sm:text-sm sm:text-base">
                            Bachelor of Technology
                          </h3>
                          <p className="text-[#58a6ff] text-xs sm:text-sm">Information Technology</p>
                          <p className="text-[#7d8590] text-xs">Netaji Subhas University of Technology, New Delhi</p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-[#30363d] text-[#7d8590] text-xs w-fit flex-shrink-0"
                        >
                          2023 - 2027
                        </Badge>
                      </div>
                      <div className="mt-2 sm:mt-3">
                        <h4 className="font-medium text-white text-xs sm:text-sm mb-2">Relevant Coursework</h4>
                        <div className="flex flex-wrap gap-1">
                          {[
                            "Data Structures",
                            "Web Development",
                            "Algorithms",
                            "Database Management",
                            "Operating Systems",
                            "Computer Networks",
                            "System Design",
                            "OOPS",
                          ].map((course) => (
                            <Badge
                              key={course}
                              variant="outline"
                              className="text-xs border-[#30363d] text-[#7d8590] hover:border-[#58a6ff] transition-colors"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="bg-[#161b22] border-[#30363d] w-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-sm">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4 sm:space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-[#30363d] pl-3 sm:pl-4 space-y-2 sm:space-y-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-xs sm:text-sm sm:text-base">{exp.title}</h3>
                            <div className="flex flex-col gap-1 text-xs sm:text-sm text-[#7d8590] mt-1">
                              <div className="flex flex-wrap items-center gap-1">
                                <span className="text-[#58a6ff]">{exp.company}</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="break-all">{exp.location}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className="border-[#30363d] text-[#7d8590] text-xs w-fit flex-shrink-0"
                              >
                                {exp.type}
                              </Badge>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="w-fit text-xs border-[#30363d] text-[#7d8590] flex-shrink-0"
                          >
                            {exp.period}
                          </Badge>
                        </div>
                        <ul className="space-y-1 text-xs sm:text-sm text-[#e6edf3]">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#7d8590] mt-1.5 text-xs flex-shrink-0">▸</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Featured Projects */}
            <Card className="bg-[#161b22] border-[#30363d] w-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-sm">
                  <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                  Featured Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3 sm:space-y-4 sm:space-y-6">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="border border-[#30363d] rounded-lg p-2 sm:p-4 hover:border-[#58a6ff] transition-colors w-full"
                  >
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                              <h3 className="font-semibold text-[#58a6ff] hover:underline cursor-pointer text-xs sm:text-sm sm:text-base truncate">
                                {project.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className="border-[#30363d] text-[#7d8590] text-xs w-fit flex-shrink-0"
                              >
                                Public
                              </Badge>
                            </div>
                            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                className="border-[#30363d] text-[#e6edf3] hover:bg-[#21262d] bg-transparent text-xs px-2 py-1 h-6 sm:h-7"
                              >
                                <Link href={project.github}>
                                  <Github className="h-3 w-3 mr-1" />
                                  Code
                                </Link>
                              </Button>
                              {project.demo && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  asChild
                                  className="border-[#30363d] text-[#e6edf3] hover:bg-[#21262d] bg-transparent text-xs px-2 py-1 h-6 sm:h-7"
                                >
                                  <Link href={project.demo}>
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Demo
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>

                          <p className="text-[#e6edf3] text-xs sm:text-sm leading-relaxed">{project.description}</p>

                          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-[#7d8590]">
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#f1e05a] flex-shrink-0`} />
                              <span>{project.language}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
                              <span>{project.stars}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GitFork className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
                              <span>{project.forks}</span>
                            </div>
                            <span className="truncate">Updated {project.date}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {project.tech.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-[#21262d] text-[#58a6ff] border-[#30363d] text-xs hover:bg-[#30363d] transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <ul className="space-y-1 text-xs sm:text-sm text-[#7d8590]">
                            {project.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 text-xs flex-shrink-0">▸</span>
                                <span className="leading-relaxed">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mobile Achievements */}
            <div className="lg:hidden w-full">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-sm">
                    <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-[#ffa657]" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 sm:space-y-3">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                        <Star className="h-2 w-2 sm:h-3 sm:w-3 text-[#ffa657] mt-1 flex-shrink-0" />
                        <span className="text-[#e6edf3] leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#21262d] bg-[#010409] px-2 sm:px-4 py-4 sm:py-6 mt-6 sm:mt-8 w-full">
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="https://github.com/theNahraf"
                className="text-[#7d8590] hover:text-[#58a6ff] transition-colors"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/nahrafxd/"
                className="text-[#7d8590] hover:text-[#58a6ff] transition-colors"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="mailto:farhan.techcareer@gmail.com"
                className="text-[#7d8590] hover:text-[#58a6ff] transition-colors"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
            <span className="text-[#7d8590] text-xs sm:text-sm text-center px-2">
              © 2025 Farhan. Built with Next.js and Tailwind CSS
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}