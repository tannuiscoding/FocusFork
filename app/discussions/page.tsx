"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GitBranch, MessageSquare, Search, Users, Clock, ExternalLink, ArrowRight, TrendingUp } from "lucide-react"

// Extended mock data for discussions
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
  const [searchTerm, setSearchTerm] = useState("")
  const [repositoryFilter, setRepositoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [discussionInput, setDiscussionInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [discussions, setDiscussions] = useState(allDiscussions)

  const handleAddDiscussion = async () => {
    if (!discussionInput.trim()) return

    setIsLoading(true)

    // Simulate API call to summarize discussion
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Extract discussion ID from URL or use as-is if it's just an ID
    const discussionId = discussionInput.includes("github.com") ? discussionInput.split("/").pop() : discussionInput

    const newDiscussion = {
      id: Date.now(),
      title: `Discussion #${discussionId}: Advanced memory allocation strategies`,
      repository: "memory-management",
      summary:
        "AI-generated summary: This discussion explores various memory allocation strategies including arena allocation, pool allocation, and hybrid approaches. Key points include performance trade-offs, memory fragmentation concerns, and implementation complexity. The community is leaning towards a hybrid approach that combines the benefits of both strategies.",
      participants: Math.floor(Math.random() * 20) + 5,
      lastActivity: "Just now",
      tags: ["memory", "allocation", "performance", "ai-summarized"],
      trending: false,
      replies: Math.floor(Math.random() * 50) + 10,
    }

    setDiscussions((prev) => [newDiscussion, ...prev])
    setDiscussionInput("")
    setIsLoading(false)
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
          return 0 // Keep original order for "recent"
      }
    })

  const repositories = [...new Set(allDiscussions.map((d) => d.repository))]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PLDG Hub
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
            <Link href="/discussions" className="text-blue-600 font-medium">
              Discussions
            </Link>
            <Link href="/issues" className="text-slate-600 hover:text-slate-900 transition-colors">
              Issues
            </Link>
          </nav>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">GitHub Discussions</h1>
          <p className="text-slate-600">Stay informed with summarized discussions from PLDG repositories</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Add & Find Discussions
            </CardTitle>
            <CardDescription>
              Enter a GitHub discussion link or ID to generate an AI summary, or search existing discussions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Discussion Section */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium mb-3 text-blue-900">Summarize New Discussion</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter GitHub discussion URL or ID (e.g., https://github.com/org/repo/discussions/123 or just 123)"
                  value={discussionInput}
                  onChange={(e) => setDiscussionInput(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleAddDiscussion}
                  disabled={!discussionInput.trim() || isLoading}
                  className="shrink-0"
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
            </div>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search discussions, topics, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={repositoryFilter} onValueChange={setRepositoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Repository" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Repositories</SelectItem>
                  {repositories.map((repo) => (
                    <SelectItem key={repo} value={repo}>
                      {repo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
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
          <p className="text-slate-600">
            Showing {filteredDiscussions.length} discussion{filteredDiscussions.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
            {repositoryFilter !== "all" && ` in ${repositoryFilter}`}
          </p>
        </div>

        {/* Discussions List */}
        <div className="space-y-6">
          {filteredDiscussions.map((discussion) => (
            <Card
              key={discussion.id}
              className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-blue-500"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl hover:text-blue-600 cursor-pointer transition-colors">
                        {discussion.title}
                      </CardTitle>
                      {discussion.trending && (
                        <Badge className="bg-orange-100 text-orange-800 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </Badge>
                      )}
                      {discussion.tags.includes("ai-summarized") && (
                        <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                          AI Summarized
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="font-medium">{discussion.repository}</span>
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
                  <Button variant="ghost" size="sm" className="shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4 leading-relaxed">{discussion.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {discussion.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Summary
                    </Button>
                    <Button size="sm">
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
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your search terms or filters to find more discussions.
              </p>
              <Button
                variant="outline"
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
