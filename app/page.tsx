"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitBranch, MessageSquare, Users, Zap, Bell, Sparkles, BarChart3, CheckSquare, Settings } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/components/AuthProvider"
import SignInModal from "@/components/SignInModal"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {
  const { user } = useAuth?.() || {}
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: "#0f0520" }}>
      <SignInModal open={modalOpen} onOpenChange={setModalOpen} />

      {/* Header */}
      <header className="cosmic-border sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center cosmic-glow">
              <GitBranch className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FocusFork
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <Link href="/dashboard" className="text-cosmic-secondary hover:text-cosmic-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/discussions" className="text-cosmic-secondary hover:text-cosmic-primary transition-colors">
                  Discussions
                </Link>
                <Link href="/issues" className="text-cosmic-secondary hover:text-cosmic-primary transition-colors">
                  Issues
                </Link>
              </>
            )}
          </nav>
          <div className="flex items-center gap-2">
            {!user && (
              <Button
                variant="outline"
                onClick={() => setModalOpen(true)}
                className="cosmic-border bg-transparent text-white hover:bg-primary/20 border-primary/40"
              >
                Sign In
              </Button>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer cosmic-glow">
                    <AvatarImage src={user.user_metadata?.avatar_url || undefined} alt={user.email || "User"} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="cosmic-border">
                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut()
                    }}
                    className="text-white hover:bg-primary/20"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button asChild className="btn-cosmic">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center feature-section">
        <div className="max-w-4xl mx-auto">
          <Badge className="feature-badge mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Features
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cosmic-primary leading-tight">
            AI-Powered GitHub
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Discussion Summarization
            </span>
          </h1>
          <p className="text-xl text-cosmic-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform lengthy GitHub discussions into concise, actionable summaries with our advanced AI technology. Stay informed and contribute effectively to any project.
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="container mx-auto px-4 space-y-32">
        {/* Discussion Summarization Feature */}
        <section className="feature-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="feature-badge px-3 py-1 text-sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI-Powered Summarization
              </Badge>
              <h2 className="text-4xl font-bold text-cosmic-primary">
                Transform GitHub{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Discussions
                </span>
                <br />
                Into Insights
              </h2>
              <p className="text-lg text-cosmic-secondary leading-relaxed">
                Paste any GitHub discussion URL and get instant AI-generated summaries. Extract key points, understand community sentiment, and identify trending topics without reading through hundreds of comments.
              </p>
            </div>
            <div className="feature-mockup p-6 animate-float">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-cosmic-primary font-semibold">GitHub Discussion Summary</h3>
                  <Badge className="bg-primary/30 text-white border-primary/40">AI Generated</Badge>
                </div>
                <div className="space-y-3">
                  <div className="cosmic-card p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="text-cosmic-primary text-sm font-medium">Key Discussion Points</p>
                        <p className="text-cosmic-muted text-xs">
                          Type system improvements and generic constraints discussion
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="cosmic-card p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                      <div>
                        <p className="text-cosmic-primary text-sm font-medium">Community Consensus</p>
                        <p className="text-cosmic-muted text-xs">Enhanced syntax with backward compatibility</p>
                      </div>
                    </div>
                  </div>
                  <div className="cosmic-card p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="text-cosmic-primary text-sm font-medium">Action Items</p>
                        <p className="text-cosmic-muted text-xs">Gradual migration path for existing codebases</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="btn-cosmic w-full mt-4">View Full Summary</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Issue Discovery Feature */}
        <section className="feature-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="feature-mockup p-6 animate-float order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-cosmic-primary font-semibold">Smart Issue Alerts</h3>
                  <Badge className="bg-accent/30 text-white border-accent/40">Live</Badge>
                </div>
                <div className="space-y-3">
                  <div className="cosmic-card p-3 rounded-lg border-l-4 border-l-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-cosmic-primary text-sm font-medium">New Beginner Issue</p>
                        <p className="text-cosmic-muted text-xs">lexer-tools • Rust • Easy</p>
                      </div>
                      <Badge className="bg-green-500/30 text-green-200 text-xs border-green-500/40">
                        Good First Issue
                      </Badge>
                    </div>
                  </div>
                  <div className="cosmic-card p-3 rounded-lg border-l-4 border-l-yellow-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-cosmic-primary text-sm font-medium">Performance Optimization</p>
                        <p className="text-cosmic-muted text-xs">ast-processor • C++ • Moderate</p>
                      </div>
                      <Badge className="bg-yellow-500/30 text-yellow-200 text-xs border-yellow-500/40">
                        Help Wanted
                      </Badge>
                    </div>
                  </div>
                  <div className="cosmic-card p-3 rounded-lg border-l-4 border-l-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-cosmic-primary text-sm font-medium">Documentation Update</p>
                        <p className="text-cosmic-muted text-xs">docs • Markdown • Easy</p>
                      </div>
                      <Badge className="bg-blue-500/30 text-blue-200 text-xs border-blue-500/40">Documentation</Badge>
                    </div>
                  </div>
                </div>
                <Button className="btn-cosmic w-full mt-4">Browse All Issues</Button>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <Badge className="feature-badge px-3 py-1 text-sm">
                <Bell className="w-4 h-4 mr-2" />
                GitHub Issue Analysis
              </Badge>
              <h2 className="text-4xl font-bold text-cosmic-primary">
                Analyze GitHub{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Repository Issues</span>
                <br />
                Instantly
              </h2>
              <p className="text-lg text-cosmic-secondary leading-relaxed">
                Paste any GitHub repository URL and get instant analysis of open issues. Filter by difficulty, identify beginner-friendly opportunities, and understand project health at a glance.
              </p>
            </div>
          </div>
        </section>

        {/* Task Organization Feature */}
        <section className="feature-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="feature-badge px-3 py-1 text-sm">
                <CheckSquare className="w-4 h-4 mr-2" />
                Discussion Tracking
              </Badge>
              <h2 className="text-4xl font-bold text-cosmic-primary">
                Track Important
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Discussions</span>{" "}
                & Summaries
              </h2>
              <p className="text-lg text-cosmic-secondary leading-relaxed">
                Keep track of important GitHub discussions and their AI-generated summaries. Organize insights by project, topic, or priority to stay informed across multiple repositories.
              </p>
            </div>
            <div className="feature-mockup p-6 animate-float">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-cosmic-primary font-semibold">Discussion Dashboard</h3>
                  <Badge className="bg-primary/30 text-white border-primary/40">Tracked</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="cosmic-card p-3 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">24</div>
                      <div className="text-xs text-cosmic-muted">Discussions</div>
                    </div>
                  </div>
                  <div className="cosmic-card p-3 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">8</div>
                      <div className="text-xs text-cosmic-muted">Summarized</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="cosmic-card p-2 rounded flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-cosmic-primary text-sm">Memory Management Discussion</span>
                    <Badge className="ml-auto bg-green-500/30 text-green-200 text-xs border-green-500/40">Trending</Badge>
                  </div>
                  <div className="cosmic-card p-2 rounded flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-cosmic-primary text-sm">Type System Improvements</span>
                    <Badge className="ml-auto bg-yellow-500/30 text-yellow-200 text-xs border-yellow-500/40">
                      Active
                    </Badge>
                  </div>
                  <div className="cosmic-card p-2 rounded flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-cosmic-primary text-sm">Async Runtime Optimization</span>
                    <Badge className="ml-auto bg-red-500/30 text-red-200 text-xs border-red-500/40">New</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Suggestions Feature */}
        <section className="feature-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="feature-mockup p-6 animate-float order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-cosmic-primary font-semibold">AI Recommendations</h3>
                  <Badge className="bg-accent/30 text-white border-accent/40">Personalized</Badge>
                </div>
                <div className="space-y-3">
                  <div className="cosmic-card p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-cosmic-primary text-sm font-medium">Based on your Rust expertise</p>
                        <p className="text-cosmic-muted text-xs">5 new discussions match your interests</p>
                      </div>
                    </div>
                  </div>
                  <div className="cosmic-card p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-accent mt-1" />
                      <div>
                        <p className="text-cosmic-primary text-sm font-medium">Trending in your repositories</p>
                        <p className="text-cosmic-muted text-xs">Memory management discussion gaining traction</p>
                      </div>
                    </div>
                  </div>
                  <div className="cosmic-card p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Zap className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-cosmic-primary text-sm font-medium">Trending discussions</p>
                        <p className="text-cosmic-muted text-xs">3 active discussions in your starred repos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <Badge className="feature-badge px-3 py-1 text-sm">
                <Settings className="w-4 h-4 mr-2" />
                Smart Recommendations
              </Badge>
              <h2 className="text-4xl font-bold text-cosmic-primary">
                Discover Relevant
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Discussions
                </span>
              </h2>
              <p className="text-lg text-cosmic-secondary leading-relaxed">
                Get personalized recommendations for GitHub discussions based on your interests and expertise. Stay informed about topics that matter to you across your favorite projects.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Integration Section */}
      <section className="container mx-auto px-4 py-32 text-center feature-section">
        <Badge className="feature-badge mb-6 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          Seamless Integration
        </Badge>
        <h2 className="text-4xl font-bold text-cosmic-primary mb-8">
          Built for
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">GitHub</span>
        </h2>
        <div className="flex justify-center gap-6 mt-12">
          <div className="cosmic-card p-4 rounded-lg cosmic-glow">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">GH</span>
            </div>
          </div>
          <div className="cosmic-card p-4 rounded-lg cosmic-glow">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
          </div>
          <div className="cosmic-card p-4 rounded-lg cosmic-glow">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SL</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cosmic-border" style={{ background: "rgba(139, 92, 246, 0.1)" }}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cosmic-primary">Ready to Contribute?</h2>
          <p className="text-xl mb-8 text-cosmic-secondary max-w-2xl mx-auto">
            Join thousands of developers collaborating on projects through FocusFork
          </p>
          <Button size="lg" asChild className="btn-cosmic text-lg px-8">
            <Link href="/dashboard">Start Exploring</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="cosmic-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center cosmic-glow">
                  <GitBranch className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold text-cosmic-primary">FocusFork</span>
              </div>
              <p className="text-sm text-cosmic-muted">
                Streamlining collaboration in development teams
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-cosmic-primary">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="hover:text-cosmic-primary transition-colors text-cosmic-muted">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/discussions" className="hover:text-cosmic-primary transition-colors text-cosmic-muted">
                    Discussions
                  </Link>
                </li>
                <li>
                  <Link href="/issues" className="hover:text-cosmic-primary transition-colors text-cosmic-muted">
                    Issues
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-cosmic-primary">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-cosmic-primary transition-colors text-cosmic-muted">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cosmic-primary transition-colors text-cosmic-muted">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cosmic-primary transition-colors text-cosmic-muted">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-cosmic-primary">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-cosmic-primary transition-colors text-cosmic-muted">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cosmic-primary transition-colors text-cosmic-muted">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cosmic-primary transition-colors text-cosmic-muted">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-cosmic-muted">
            <p>&copy; {new Date().getFullYear()} FocusFork. Built for the development community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
