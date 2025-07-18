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
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getLanguageColor = (language: string) => {
    const colors = {
      Rust: "bg-orange-100 text-orange-800",
      "C++": "bg-blue-100 text-blue-800",
      OCaml: "bg-purple-100 text-purple-800",
      JavaScript: "bg-yellow-100 text-yellow-800",
      Haskell: "bg-indigo-100 text-indigo-800",
      Markdown: "bg-gray-100 text-gray-800",
      C: "bg-slate-100 text-slate-800",
    }
    return colors[language] || "bg-gray-100 text-gray-800"
  }

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
            <Link href="/discussions" className="text-slate-600 hover:text-slate-900 transition-colors">
              Discussions
            </Link>
            <Link href="/issues" className="text-blue-600 font-medium">
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
          <h1 className="text-3xl font-bold mb-2">Open Issues</h1>
          <p className="text-slate-600">Find contribution opportunities across PLDG repositories</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Issues</p>
                  <p className="text-2xl font-bold">{allIssues.length}</p>
                </div>
                <GitBranch className="w-8 h-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Available</p>
                  <p className="text-2xl font-bold text-green-600">{allIssues.filter((i) => !i.assignee).length}</p>
                </div>
                <GitPullRequest className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Beginner Friendly</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {allIssues.filter((i) => i.labels.includes("good-first-issue")).length}
                  </p>
                </div>
                <Star className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Languages</p>
                  <p className="text-2xl font-bold">{languages.length}</p>
                </div>
                <Users className="w-8 h-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Issues
            </CardTitle>
            <CardDescription>Filter issues by difficulty, language, repository, and more</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="xl:col-span-2">
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
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
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
          <p className="text-slate-600">
            Showing {filteredIssues.length} issue{filteredIssues.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          {filteredIssues.map((issue) => (
            <Card
              key={issue.id}
              className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-blue-500"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-xl hover:text-blue-600 cursor-pointer transition-colors">
                        {issue.title}
                      </CardTitle>
                      {issue.labels.includes("good-first-issue") && (
                        <Badge className="bg-green-100 text-green-800">Good First Issue</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                      <span className="font-medium">{issue.repository}</span>
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
                      {issue.assignee && <span className="text-orange-600">Assigned to {issue.assignee}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={getDifficultyColor(issue.difficulty)}>{issue.difficulty}</Badge>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4 leading-relaxed">{issue.description}</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {issue.labels.slice(0, 4).map((label) => (
                      <Badge key={label} variant="outline" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                    {issue.labels.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{issue.labels.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" disabled={!!issue.assignee} className={issue.assignee ? "opacity-50" : ""}>
                      {issue.assignee ? "Assigned" : "Claim Issue"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <GitBranch className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No issues found</h3>
              <p className="text-slate-600 mb-4">Try adjusting your search terms or filters to find more issues.</p>
              <Button
                variant="outline"
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
