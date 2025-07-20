"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitBranch, MessageSquare, Search, ExternalLink, Clock, Users, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/AuthProvider"
import SignInModal from "@/components/SignInModal"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabaseClient"

// Mock data
const discussions = [
  {
    id: 1,
    title: "RFC: New syntax for pattern matching in functional languages",
    repository: "functional-lang-spec",
    summary:
      "Proposal for introducing pattern matching syntax that improves readability and reduces boilerplate code. Discussion covers syntax alternatives, performance implications, and backward compatibility.",
    participants: 12,
    lastActivity: "2 hours ago",
    tags: ["RFC", "syntax", "pattern-matching"],
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
  },
]

const issues = [
  {
    id: 1,
    title: "Add support for Unicode identifiers in lexer",
    repository: "lexer-tools",
    difficulty: "easy",
    language: "Rust",
    description:
      "Implement Unicode identifier support according to Unicode Standard Annex #31. Good first issue for contributors familiar with regex and Unicode.",
    labels: ["good-first-issue", "lexer", "unicode"],
    assignee: null,
    createdAt: "3 days ago",
  },
  {
    id: 2,
    title: "Optimize AST traversal for large codebases",
    repository: "ast-processor",
    difficulty: "moderate",
    language: "C++",
    description:
      "Current AST traversal becomes slow with large codebases. Need to implement visitor pattern optimizations and caching mechanisms.",
    labels: ["performance", "ast", "optimization"],
    assignee: null,
    createdAt: "1 week ago",
  },
  {
    id: 3,
    title: "Implement error recovery in parser",
    repository: "parser-gen",
    difficulty: "hard",
    language: "OCaml",
    description:
      "Add error recovery mechanisms to continue parsing after syntax errors, providing better error messages and IDE support.",
    labels: ["parser", "error-handling", "ide-support"],
    assignee: "alice_dev",
    createdAt: "2 weeks ago",
  },
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)

  // Show modal if not signed in and not loading
  useEffect(() => {
    if (!loading && !user) setModalOpen(true)
    else setModalOpen(false)
  }, [user, loading])

  if (loading) return null

  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")

  const [discussionInput, setDiscussionInput] = useState("")
  const [isLoadingDiscussion, setIsLoadingDiscussion] = useState(false)
  const [dashboardDiscussions, setDashboardDiscussions] = useState(discussions)

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || issue.difficulty === difficultyFilter
    const matchesLanguage = languageFilter === "all" || issue.language === languageFilter

    return matchesSearch && matchesDifficulty && matchesLanguage
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddDiscussion = async () => {
    if (!discussionInput.trim()) return

    setIsLoadingDiscussion(true)

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

    setDashboardDiscussions((prev) => [newDiscussion, ...prev])
    setDiscussionInput("")
    setIsLoadingDiscussion(false)
  }

  return (
    <>
      <SignInModal open={modalOpen} onOpenChange={() => { }} />
      {!user ? null : (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          {/* Header */}
          <header className="border-b bg-white dark:bg-slate-800 sticky top-0 z-50">
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
                <Link href="/dashboard" className="text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link
                  href="/discussions"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  Discussions
                </Link>
                <Link
                  href="/issues"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  Issues
                </Link>
              </nav>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user.user_metadata?.avatar_url || undefined} alt={user.email || "User"} />
                        <AvatarFallback>{user.email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={async () => {
                          await supabase.auth.signOut()
                        }}
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-slate-600 dark:text-slate-300">
                Stay up to date with the latest discussions and contribution opportunities.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+3 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">42 beginner-friendly</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contributors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+89 this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="discussions" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="discussions">Recent Discussions</TabsTrigger>
                <TabsTrigger value="issues">Available Issues</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="space-y-6">
                {/* Quick Add Discussion */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      Quick Summarize
                    </CardTitle>
                    <CardDescription>Enter a GitHub discussion link or ID to generate an AI summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Input
                        placeholder="GitHub discussion URL or ID..."
                        value={discussionInput}
                        onChange={(e) => setDiscussionInput(e.target.value)}
                        className="flex-1"
                        disabled={isLoadingDiscussion}
                      />
                      <Button
                        onClick={handleAddDiscussion}
                        disabled={!discussionInput.trim() || isLoadingDiscussion}
                        className="shrink-0"
                      >
                        {isLoadingDiscussion ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Summarizing...
                          </>
                        ) : (
                          "Summarize"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {dashboardDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">{discussion.title}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <span>{discussion.repository}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {discussion.participants} participants
                              </div>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {discussion.lastActivity}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 mb-4">{discussion.summary}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {discussion.tags.includes("ai-summarized") && (
                              <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1 ml-2">
                                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                                AI Summarized
                              </Badge>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            Read More
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="issues" className="space-y-6">
                {/* Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Find Issues</CardTitle>
                    <CardDescription>Filter issues by difficulty, language, and keywords</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            placeholder="Search issues..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={languageFilter} onValueChange={setLanguageFilter}>
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Languages</SelectItem>
                          <SelectItem value="Rust">Rust</SelectItem>
                          <SelectItem value="C++">C++</SelectItem>
                          <SelectItem value="OCaml">OCaml</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Issues List */}
                <div className="space-y-4">
                  {filteredIssues.map((issue) => (
                    <Card key={issue.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">{issue.title}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <span>{issue.repository}</span>
                              <span>•</span>
                              <span>{issue.language}</span>
                              <span>•</span>
                              <span>{issue.createdAt}</span>
                              {issue.assignee && (
                                <>
                                  <span>•</span>
                                  <span>Assigned to {issue.assignee}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getDifficultyColor(issue.difficulty)}>{issue.difficulty}</Badge>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 mb-4">{issue.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {issue.labels.map((label) => (
                              <Badge key={label} variant="outline" className="text-xs">
                                {label}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="outline" size="sm" disabled={!!issue.assignee}>
                            {issue.assignee ? "Assigned" : "Claim Issue"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </>
  )
}
