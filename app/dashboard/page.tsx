"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GitBranch,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  Star,
  GitPullRequest,
  ArrowRight,
  Activity,
  Code,
  Zap,
} from "lucide-react"

export default function DashboardPage() {
  const activeDiscussions = [
    {
      id: 1,
      title: "RFC: New syntax for pattern matching",
      repository: "functional-lang-spec",
      participants: 12,
      lastActivity: "2 hours ago",
      trending: true,
    },
    {
      id: 2,
      title: "Memory management strategies",
      repository: "compiler-design",
      participants: 8,
      lastActivity: "4 hours ago",
      trending: false,
    },
    {
      id: 3,
      title: "Type inference improvements",
      repository: "type-system",
      participants: 15,
      lastActivity: "1 day ago",
      trending: true,
    },
  ]

  const openIssues = [
    {
      id: 1,
      title: "Add Unicode identifier support",
      repository: "lexer-tools",
      difficulty: "easy",
      language: "Rust",
      stars: 12,
    },
    {
      id: 2,
      title: "Optimize AST traversal performance",
      repository: "ast-processor",
      difficulty: "moderate",
      language: "C++",
      stars: 8,
    },
    {
      id: 3,
      title: "Implement error recovery in parser",
      repository: "parser-gen",
      difficulty: "hard",
      language: "OCaml",
      stars: 15,
    },
  ]

  const contributors = [
    { name: "Alice Chen", avatar: "AC", contributions: 47, role: "Core Maintainer" },
    { name: "Bob Smith", avatar: "BS", contributions: 32, role: "Active Contributor" },
    { name: "Carol Davis", avatar: "CD", contributions: 28, role: "Community Member" },
    { name: "David Wilson", avatar: "DW", contributions: 19, role: "New Contributor" },
  ]

  return (
    <div className="min-h-screen" style={{ background: "#0f0520" }}>
      {/* Header */}
      <header
        className="border-b cosmic-border sticky top-0 z-50"
        style={{ background: "rgba(15, 5, 32, 0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center cosmic-glow">
              <GitBranch className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              FocusForkmake
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-purple-400 font-medium">
              Dashboard
            </Link>
            <Link href="/discussions" className="text-white/70 hover:text-white transition-colors">
              Discussions
            </Link>
            <Link href="/issues" className="text-white/70 hover:text-white transition-colors">
              Issues
            </Link>
          </nav>
          <Button variant="outline" className="cosmic-border text-white hover:bg-purple-600/20 bg-transparent">
            <Users className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-cosmic-primary">Dashboard</h1>
          <p className="text-cosmic-secondary">Your hub for programming language development activities</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="cosmic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Active Discussions</p>
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% this week
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="cosmic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Open Issues</p>
                  <p className="text-2xl font-bold text-white">156</p>
                  <p className="text-xs text-blue-400 flex items-center gap-1 mt-1">
                    <GitPullRequest className="w-3 h-3" />
                    42 available
                  </p>
                </div>
                <GitBranch className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="cosmic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Contributors</p>
                  <p className="text-2xl font-bold text-white">89</p>
                  <p className="text-xs text-orange-400 flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3" />
                    +5 this month
                  </p>
                </div>
                <Users className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="cosmic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Repositories</p>
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-xs text-violet-400 flex items-center gap-1 mt-1">
                    <Code className="w-3 h-3" />8 languages
                  </p>
                </div>
                <Star className="w-8 h-8 text-violet-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Active Discussions */}
          <Card className="cosmic-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Active Discussions
                </CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-purple-400 hover:text-purple-300">
                  <Link href="/discussions">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <CardDescription className="text-white/70">Latest community conversations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-4 rounded-lg cosmic-border hover:cosmic-glow transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white hover:text-purple-300 transition-colors">
                      {discussion.title}
                    </h4>
                    {discussion.trending && (
                      <Badge className="bg-orange-500/20 text-orange-300 border border-orange-500/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="text-purple-300">{discussion.repository}</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {discussion.participants} participants
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {discussion.lastActivity}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Open Issues */}
          <Card className="cosmic-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Open Issues
                </CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-purple-400 hover:text-purple-300">
                  <Link href="/issues">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <CardDescription className="text-white/70">Contribution opportunities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {openIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 rounded-lg cosmic-border hover:cosmic-glow transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white hover:text-purple-300 transition-colors">{issue.title}</h4>
                    <div className="flex items-center gap-1 text-white/60">
                      <Star className="w-3 h-3" />
                      {issue.stars}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300 text-sm">{issue.repository}</span>
                    <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs">
                      {issue.language}
                    </Badge>
                    <Badge
                      className={`text-xs ${
                        issue.difficulty === "easy"
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : issue.difficulty === "moderate"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : "bg-red-500/20 text-red-300 border-red-500/30"
                      }`}
                    >
                      {issue.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contributors */}
        <Card className="cosmic-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Top Contributors
            </CardTitle>
            <CardDescription className="text-white/70">Community members making a difference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contributors.map((contributor) => (
                <div
                  key={contributor.name}
                  className="p-4 rounded-lg cosmic-border hover:cosmic-glow transition-all duration-200 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3 cosmic-glow">
                    {contributor.avatar}
                  </div>
                  <h4 className="font-medium text-white mb-1">{contributor.name}</h4>
                  <p className="text-sm text-purple-300 mb-2">{contributor.role}</p>
                  <div className="flex items-center justify-center gap-1 text-white/60">
                    <Activity className="w-3 h-3" />
                    <span className="text-sm">{contributor.contributions} contributions</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button asChild className="btn-cosmic">
            <Link href="/discussions">
              <MessageSquare className="w-4 h-4 mr-2" />
              Browse Discussions
            </Link>
          </Button>
          <Button asChild className="btn-cosmic">
            <Link href="/issues">
              <GitBranch className="w-4 h-4 mr-2" />
              Find Issues
            </Link>
          </Button>
          <Button variant="outline" className="cosmic-border text-white hover:bg-purple-600/20 bg-transparent">
            <Zap className="w-4 h-4 mr-2" />
            Quick Start Guide
          </Button>
        </div>
      </div>
    </div>
  )
}
