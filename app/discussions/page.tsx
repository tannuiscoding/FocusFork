"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/AuthProvider"
import {
  GitBranch,
  MessageSquare,
  Search,
  Users,
  Clock,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react"

const allDiscussions = [
  {
    id: 1,
    title: "RFC: New syntax for pattern matching in functional languages",
    repository: "functional-lang-spec",
    summary:
      "Proposal for introducing pattern matching syntax that improves readability and reduces boilerplate code. Discussion covers syntax alternatives, performance implications, and backward compatibility.",
    participants: 12,
    lastActivity: "2 hours ago",
    tags: ["RFC", "syntax", "pattern-matching"],
    trending: true,
    replies: 45,
  },
  {
    id: 2,
    title: "Memory management strategies for compiled languages",
    repository: "compiler-design",
    summary:
      "Deep dive into various memory management approaches including garbage collection, reference counting, and manual memory management. Comparing trade-offs and implementation complexity.",
    participants: 8,
    lastActivity: "4 hours ago",
    tags: ["memory", "compiler", "performance"],
    trending: false,
    replies: 23,
  },
  {
    id: 3,
    title: "Type inference improvements for generic programming",
    repository: "type-system",
    summary:
      "Discussion on enhancing type inference algorithms to better handle complex generic scenarios while maintaining compilation speed and error message clarity.",
    participants: 15,
    lastActivity: "1 day ago",
    tags: ["types", "generics", "inference"],
    trending: true,
    replies: 67,
  },
  {
    id: 4,
    title: "Async/await implementation across different language paradigms",
    repository: "async-patterns",
    summary:
      "Comparing async/await implementations in various programming languages and discussing best practices for asynchronous programming patterns.",
    participants: 20,
    lastActivity: "2 days ago",
    tags: ["async", "concurrency", "patterns"],
    trending: false,
    replies: 89,
  },
  {
    id: 5,
    title: "Error handling mechanisms: exceptions vs result types",
    repository: "error-handling",
    summary:
      "Comprehensive discussion on different error handling approaches, their trade-offs, and impact on code maintainability and performance.",
    participants: 18,
    lastActivity: "3 days ago",
    tags: ["errors", "exceptions", "result-types"],
    trending: true,
    replies: 34,
  },
]

export default function DiscussionsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0520" }}>
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [repositoryFilter, setRepositoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [discussionInput, setDiscussionInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [discussions, setDiscussions] = useState(allDiscussions)

  const handleAddDiscussion = async () => {
    if (!discussionInput.trim()) return

    const urlPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/discussions\/\d+$/
    if (!urlPattern.test(discussionInput)) {
      setError("Please enter a valid GitHub discussion URL (e.g., https://github.com/owner/repo/discussions/123)")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discussionUrl: discussionInput }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to summarize discussion")
      }

      const data = await response.json()
      
      if (data.success && data.summary) {
        const newDiscussion = {
          id: Date.now(),
          title: data.summary.title,
          repository: data.summary.repository,
          summary: data.summary.summary,
          participants: data.summary.participants,
          lastActivity: data.summary.lastActivity,
          tags: data.summary.tags,
          trending: data.summary.trending,
          replies: data.summary.replies,
        }

        setDiscussions((prev) => [newDiscussion, ...prev])
        setDiscussionInput("")
        setError("")
      }
    } catch (error) {
      console.error("Error summarizing discussion:", error)
      setError(error instanceof Error ? error.message : "Failed to summarize discussion")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredDiscussions = discussions
    .filter((discussion) => {
      const matchesSearch =
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesRepository = repositoryFilter === "all" || discussion.repository === repositoryFilter

      return matchesSearch && matchesRepository
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "trending":
          return b.trending ? 1 : -1
        case "participants":
          return b.participants - a.participants
        case "replies":
          return b.replies - a.replies
        default:
          return 0
      }
    })

  const repositories = [...new Set(allDiscussions.map((d) => d.repository))]

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
            <Link href="/discussions" className="text-purple-400 font-medium">
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
          <h1 className="text-3xl font-bold mb-2 text-cosmic-primary">GitHub Discussions</h1>
          <p className="text-cosmic-secondary">Stay informed with summarized discussions from GitHub repositories</p>
        </div>

        {/* Filters */}
        <Card className="mb-8 cosmic-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <MessageSquare className="w-5 h-5" />
              Add & Find Discussions
            </CardTitle>
            <CardDescription className="text-white/70">
              Enter a GitHub discussion link or ID to generate an AI summary, or search existing discussions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Discussion Section */}
            <div className="p-4 rounded-lg border cosmic-border" style={{ background: "rgba(139, 92, 246, 0.1)" }}>
              <h3 className="font-medium mb-3 text-purple-300">Summarize New Discussion</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter GitHub discussion URL (e.g., https://github.com/owner/repo/discussions/123)"
                  value={discussionInput}
                  onChange={(e) => {
                    setDiscussionInput(e.target.value)
                    if (error) setError("")
                  }}
                  className="flex-1 cosmic-border text-white placeholder:text-white/50"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleAddDiscussion}
                  disabled={!discussionInput.trim() || isLoading}
                  className="shrink-0 btn-cosmic"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Summarizing...
                    </>
                  ) : (
                    "Summarize"
                  )}
                </Button>
              </div>
              {error && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    placeholder="Search discussions, topics, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 cosmic-border text-white placeholder:text-white/50"
                  />
                </div>
              </div>
              <Select value={repositoryFilter} onValueChange={setRepositoryFilter}>
                <SelectTrigger className="w-full md:w-48 cosmic-border text-white">
                  <SelectValue placeholder="Repository" />
                </SelectTrigger>
                <SelectContent className="cosmic-card">
                  <SelectItem value="all">All Repositories</SelectItem>
                  {repositories.map((repo) => (
                    <SelectItem key={repo} value={repo}>
                      {repo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-40 cosmic-border text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="cosmic-card">
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="participants">Most Active</SelectItem>
                  <SelectItem value="replies">Most Replies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-cosmic-secondary">
            Showing {filteredDiscussions.length} discussion{filteredDiscussions.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
            {repositoryFilter !== "all" && ` in ${repositoryFilter}`}
          </p>
        </div>

        {/* Discussions List */}
        <div className="space-y-6">
          {filteredDiscussions.map((discussion) => (
            <Card key={discussion.id} className="cosmic-card hover:cosmic-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-xl text-white hover:text-purple-300 cursor-pointer transition-colors">
                        {discussion.title}
                      </CardTitle>
                      {discussion.trending && (
                        <Badge className="bg-orange-500/20 text-orange-300 border border-orange-500/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      {discussion.tags.includes("ai-summarized") && (
                        <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI Summarized
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/60 flex-wrap">
                      <span className="font-medium text-purple-300">{discussion.repository}</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {discussion.participants} participants
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {discussion.replies} replies
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {discussion.lastActivity}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0 text-white/70 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4 leading-relaxed">{discussion.summary}</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {discussion.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cosmic-border text-white hover:bg-purple-600/20 bg-transparent"
                    >
                      View Summary
                    </Button>
                    <Button size="sm" className="btn-cosmic">
                      Join Discussion
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDiscussions.length === 0 && (
          <Card className="text-center py-12 cosmic-card">
            <CardContent>
              <MessageSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">No discussions found</h3>
              <p className="text-white/70 mb-4">Try adjusting your search terms or filters to find more discussions.</p>
              <Button
                variant="outline"
                className="cosmic-border text-white hover:bg-purple-600/20 bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setRepositoryFilter("all")
                  setSortBy("recent")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
