"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GitBranch, Search, Users, ExternalLink, Clock, Star, GitPullRequest } from "lucide-react"

// Extended mock data for issues
const allIssues = [
  {
    id: 1,
    title: "Add support for Unicode identifiers in lexer",
    repository: "lexer-tools",
    difficulty: "easy",
    language: "Rust",
    description:
      "Implement Unicode identifier support according to Unicode Standard Annex #31. Good first issue for contributors familiar with regex and Unicode. This involves updating the lexer to recognize Unicode characters as valid identifier components.",
    labels: ["good-first-issue", "lexer", "unicode", "help-wanted"],
    assignee: null,
    createdAt: "3 days ago",
    stars: 12,
    comments: 5,
  },
  {
    id: 2,
    title: "Optimize AST traversal for large codebases",
    repository: "ast-processor",
    difficulty: "moderate",
    language: "C++",
    description:
      "Current AST traversal becomes slow with large codebases (>10k LOC). Need to implement visitor pattern optimizations and caching mechanisms. Profiling shows 60% of time spent in redundant traversals.",
    labels: ["performance", "ast", "optimization"],
    assignee: null,
    createdAt: "1 week ago",
    stars: 8,
    comments: 12,
  },
  {
    id: 3,
    title: "Implement error recovery in parser",
    repository: "parser-gen",
    difficulty: "hard",
    language: "OCaml",
    description:
      "Add error recovery mechanisms to continue parsing after syntax errors, providing better error messages and IDE support. This is crucial for language server implementations.",
    labels: ["parser", "error-handling", "ide-support"],
    assignee: "alice_dev",
    createdAt: "2 weeks ago",
    stars: 15,
    comments: 23,
  },
  {
    id: 4,
    title: "Add syntax highlighting for new language constructs",
    repository: "syntax-highlighter",
    difficulty: "easy",
    language: "JavaScript",
    description:
      "Update syntax highlighting rules to support recently added language constructs including pattern matching and async generators. TextMate grammar needs updating.",
    labels: ["good-first-issue", "syntax", "highlighting", "textmate"],
    assignee: null,
    createdAt: "4 days ago",
    stars: 6,
    comments: 3,
  },
  {
    id: 5,
    title: "Improve type checker performance for recursive types",
    repository: "type-checker",
    difficulty: "hard",
    language: "Haskell",
    description:
      "Type checking becomes exponentially slow with deeply nested recursive types. Need to implement memoization and cycle detection to improve performance while maintaining correctness.",
    labels: ["performance", "types", "recursion", "algorithms"],
    assignee: null,
    createdAt: "1 week ago",
    stars: 20,
    comments: 18,
  },
  {
    id: 6,
    title: "Create documentation for contributor onboarding",
    repository: "docs",
    difficulty: "easy",
    language: "Markdown",
    description:
      "Write comprehensive documentation to help new contributors get started. Should include setup instructions, coding standards, and contribution workflow.",
    labels: ["documentation", "good-first-issue", "community"],
    assignee: null,
    createdAt: "2 days ago",
    stars: 4,
    comments: 7,
  },
  {
    id: 7,
    title: "Implement incremental compilation support",
    repository: "compiler-core",
    difficulty: "moderate",
    language: "Rust",
    description:
      "Add support for incremental compilation to reduce build times. This involves implementing dependency tracking and selective recompilation of changed modules.",
    labels: ["compiler", "performance", "incremental"],
    assignee: "bob_compiler",
    createdAt: "3 weeks ago",
    stars: 25,
    comments: 31,
  },
  {
    id: 8,
    title: "Fix memory leak in garbage collector",
    repository: "runtime",
    difficulty: "moderate",
    language: "C",
    description:
      "Memory leak detected in the mark-and-sweep garbage collector when handling circular references. Valgrind reports show consistent memory growth during long-running programs.",
    labels: ["bug", "memory", "gc", "runtime"],
    assignee: null,
    createdAt: "5 days ago",
    stars: 18,
    comments: 14,
  },
]

export default function IssuesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [repositoryFilter, setRepositoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredIssues = allIssues
    .filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.labels.some((label) => label.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = difficultyFilter === "all" || issue.difficulty === difficultyFilter
      const matchesLanguage = languageFilter === "all" || issue.language === languageFilter
      const matchesRepository = repositoryFilter === "all" || issue.repository === repositoryFilter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "available" && !issue.assignee) ||
        (statusFilter === "assigned" && issue.assignee)

      return matchesSearch && matchesDifficulty && matchesLanguage && matchesRepository && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stars - a.stars
        case "comments":
          return b.comments - a.comments
        case "difficulty":
          const difficultyOrder = { easy: 1, moderate: 2, hard: 3 }
          //@ts-ignore
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        default:
          return 0 // Keep original order for "recent"
      }
    })

  const languages = [...new Set(allIssues.map((i) => i.language))]
  const repositories = [...new Set(allIssues.map((i) => i.repository))]

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

  const getLanguageColor = (language: string) => {
    const colors = {
      Rust: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      "C++": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      OCaml: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      JavaScript: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      Haskell: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      Markdown: "bg-gray-500/20 text-gray-300 border-gray-500/30",
      C: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    }
    //@ts-ignore
    return colors[language] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }

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
          <h1 className="text-3xl font-bold mb-2 text-cosmic-primary">Open Issues</h1>
          <p className="text-cosmic-secondary">Find contribution opportunities across PLDG repositories</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="cosmic-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Total Issues</p>
                  <p className="text-2xl font-bold text-white">{allIssues.length}</p>
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
                  <p className="text-2xl font-bold text-green-400">{allIssues.filter((i) => !i.assignee).length}</p>
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
                  <p className="text-2xl font-bold text-blue-400">
                    {allIssues.filter((i) => i.labels.includes("good-first-issue")).length}
                  </p>
                </div>
                <Star className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="cosmic-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Languages</p>
                  <p className="text-2xl font-bold text-white">{languages.length}</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 cosmic-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Search className="w-5 h-5" />
              Find Issues
            </CardTitle>
            <CardDescription className="text-white/70">
              Filter issues by difficulty, language, repository, and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="xl:col-span-2">
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
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="cosmic-border text-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="cosmic-card">
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="cosmic-border text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="cosmic-card">
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="stars">Most Starred</SelectItem>
                  <SelectItem value="comments">Most Discussed</SelectItem>
                  <SelectItem value="difficulty">By Difficulty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-cosmic-secondary">
            Showing {filteredIssues.length} issue{filteredIssues.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="cosmic-card hover:cosmic-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-xl text-white hover:text-purple-300 cursor-pointer transition-colors">
                        {issue.title}
                      </CardTitle>
                      {issue.labels.includes("good-first-issue") && (
                        <Badge className="bg-green-500/20 text-green-300 border border-green-500/30">
                          Good First Issue
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/60 flex-wrap">
                      <span className="font-medium text-purple-300">{issue.repository}</span>
                      <Badge className={getLanguageColor(issue.language)}>{issue.language}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {issue.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        {issue.comments} comments
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {issue.createdAt}
                      </div>
                      {issue.assignee && <span className="text-orange-400">Assigned to {issue.assignee}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={getDifficultyColor(issue.difficulty)}>{issue.difficulty}</Badge>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4 leading-relaxed">{issue.description}</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {issue.labels.slice(0, 4).map((label) => (
                      <Badge
                        key={label}
                        variant="outline"
                        className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {label}
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
                      View Details
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

        {filteredIssues.length === 0 && (
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
                  setLanguageFilter("all")
                  setRepositoryFilter("all")
                  setStatusFilter("all")
                  setSortBy("recent")
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
