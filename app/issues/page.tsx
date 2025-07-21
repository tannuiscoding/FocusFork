"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GitBranch, Search, Users, ExternalLink, Clock, Star, GitPullRequest, Loader2, AlertCircle, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/AuthProvider"
import SignInModal from "@/components/SignInModal"
import { supabase } from "@/lib/supabaseClient"

interface GitHubIssue {
  id: number
  title: string
  body: string
  html_url: string
  created_at: string
  updated_at: string
  state: string
  assignee: {
    login: string
    avatar_url: string
  } | null
  assignees: Array<{
    login: string
    avatar_url: string
  }>
  labels: Array<{
    name: string
    color: string
  }>
  comments: number
  repository: {
    name: string
    full_name: string
    stargazers_count: number
    language: string
  }
  beginnerFriendly: boolean
  difficulty: "easy" | "moderate" | "hard"
  openIssuesCount: number
}

export default function IssuesPage() {
  const [repoUrl, setRepoUrl] = useState("")
  const [issues, setIssues] = useState<GitHubIssue[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [showSignInModal, setShowSignInModal] = useState(false)

  const { user, loading: authLoading } = useAuth()

  const fetchIssues = async () => {
    if (!user) {
      setShowSignInModal(true)
      return
    }

    if (!repoUrl.trim()) {
      setError("Please enter a repository URL")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Extract owner and repo from URL
      const urlMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
      if (!urlMatch) {
        throw new Error("Invalid GitHub repository URL")
      }

      const [, owner, repo] = urlMatch
      const cleanRepo = repo.replace(/\.git$/, "")

      const { data: { session } } = await supabase.auth.getSession()
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ owner, repo: cleanRepo }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch issues")
      }

      const data = await response.json()
      setIssues(data.issues)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const filteredIssues = issues
    .filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.labels.some((label) => label.name.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = difficultyFilter === "all" || issue.difficulty === difficultyFilter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "available" && !issue.assignee) ||
        (statusFilter === "assigned" && issue.assignee)

      return matchesSearch && matchesDifficulty && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.repository.stargazers_count - a.repository.stargazers_count
        case "comments":
          return b.comments - a.comments
        case "difficulty":
          const difficultyOrder = { easy: 1, moderate: 2, hard: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case "recent":
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }
    })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "moderate":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "hard":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  const totalIssues = issues.length
  const availableIssues = issues.filter((i) => !i.assignee).length
  const beginnerFriendlyIssues = issues.filter((i) => i.beginnerFriendly).length
  const assignedIssues = issues.filter((i) => i.assignee).length

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
              FocusFork
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/discussions" className="text-white/70 hover:text-white transition-colors">
              Discussions
            </Link>
            <Link href="/issues" className="text-purple-400 font-medium">
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
          <h1 className="text-3xl font-bold mb-2 text-cosmic-primary">Repository Issues</h1>
          <p className="text-cosmic-secondary">Analyze issues from any GitHub repository for beginner-friendly opportunities</p>
        </div>

        {/* Repository Input */}
        <Card className="mb-8 cosmic-card">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Enter Repository URL
            </CardTitle>
            <CardDescription className="text-white/70">
              {user ? "Provide a GitHub repository URL to analyze its issues" : "Sign in to analyze repository issues"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="flex gap-4">
                <Input
                  placeholder="https://github.com/owner/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="flex-1 cosmic-border text-white placeholder:text-white/50"
                  onKeyPress={(e) => e.key === "Enter" && fetchIssues()}
                />
                <Button
                  onClick={fetchIssues}
                  disabled={loading}
                  className="btn-cosmic"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Issues"
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Authentication Required</h3>
                <p className="text-white/70 mb-4">You need to sign in to analyze repository issues and access GitHub data.</p>
                <Button
                  onClick={() => setShowSignInModal(true)}
                  className="btn-cosmic"
                >
                  Sign In to Continue
                </Button>
              </div>
            )}
            {error && (
              <Alert className="mt-4 border-red-500/30 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        {issues.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="cosmic-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Total Issues</p>
                    <p className="text-2xl font-bold text-white">{totalIssues}</p>
                  </div>
                  <GitBranch className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="cosmic-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Available</p>
                    <p className="text-2xl font-bold text-green-400">{availableIssues}</p>
                  </div>
                  <GitPullRequest className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="cosmic-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Beginner Friendly</p>
                    <p className="text-2xl font-bold text-blue-400">{beginnerFriendlyIssues}</p>
                  </div>
                  <Star className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="cosmic-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Assigned</p>
                    <p className="text-2xl font-bold text-orange-400">{assignedIssues}</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        {issues.length > 0 && (
          <Card className="mb-8 cosmic-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <Search className="w-5 h-5" />
                Filter Issues
              </CardTitle>
              <CardDescription className="text-white/70">
                Filter issues by difficulty, status, and more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      placeholder="Search issues..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 cosmic-border text-white placeholder:text-white/50"
                    />
                  </div>
                </div>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="cosmic-border text-white">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent className="cosmic-card">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="cosmic-border text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="cosmic-card">
                    <SelectItem value="all">All Issues</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        {issues.length > 0 && (
          <div className="mb-6">
            <p className="text-cosmic-secondary">
              Showing {filteredIssues.length} issue{filteredIssues.length !== 1 ? "s" : ""}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Issues List */}
        <div className="space-y-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="cosmic-card hover:cosmic-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-xl text-white hover:text-purple-300 cursor-pointer transition-colors">
                        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
                          {issue.title}
                        </a>
                      </CardTitle>
                      {issue.beginnerFriendly && (
                        <Badge className="bg-green-500/20 text-green-300 border border-green-500/30">
                          Beginner Friendly
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/60 flex-wrap">
                      <span className="font-medium text-purple-300">{issue.repository.full_name}</span>
                      {issue.repository.language && (
                        <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {issue.repository.language}
                        </Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {issue.repository.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        {issue.comments} comments
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(issue.updated_at)}
                      </div>
                      {issue.assignee && (
                        <span className="text-orange-400">Assigned to {issue.assignee.login}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={getDifficultyColor(issue.difficulty)}>{issue.difficulty}</Badge>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                      <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4 leading-relaxed">
                  {issue.body ? (issue.body.length > 200 ? `${issue.body.substring(0, 200)}...` : issue.body) : "No description provided"}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {issue.labels.slice(0, 4).map((label) => (
                      <Badge
                        key={label.name}
                        variant="outline"
                        className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        style={{ borderColor: `#${label.color}` }}
                      >
                        {label.name}
                      </Badge>
                    ))}
                    {issue.labels.length > 4 && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        +{issue.labels.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cosmic-border text-white hover:bg-purple-600/20 bg-transparent"
                    >
                      <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      disabled={!!issue.assignee}
                      className={issue.assignee ? "opacity-50 bg-gray-600" : "btn-cosmic"}
                    >
                      {issue.assignee ? "Assigned" : "Claim Issue"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {issues.length > 0 && filteredIssues.length === 0 && (
          <Card className="text-center py-12 cosmic-card">
            <CardContent>
              <GitBranch className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">No issues found</h3>
              <p className="text-white/70 mb-4">Try adjusting your search terms or filters to find more issues.</p>
              <Button
                variant="outline"
                className="cosmic-border text-white hover:bg-purple-600/20 bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setDifficultyFilter("all")
                  setStatusFilter("all")
                  setSortBy("recent")
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {issues.length === 0 && !loading && !user && (
          <Card className="text-center py-12 cosmic-card">
            <CardContent>
              <Lock className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">Authentication Required</h3>
              <p className="text-white/70 mb-4">Sign in to start analyzing GitHub repository issues.</p>
              <Button
                onClick={() => setShowSignInModal(true)}
                className="btn-cosmic"
              >
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {issues.length === 0 && !loading && user && (
          <Card className="text-center py-12 cosmic-card">
            <CardContent>
              <GitBranch className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">No repository analyzed yet</h3>
              <p className="text-white/70 mb-4">Enter a GitHub repository URL above to start analyzing issues.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sign In Modal */}
      <SignInModal open={showSignInModal} onOpenChange={setShowSignInModal} />
    </div>
  )
}
