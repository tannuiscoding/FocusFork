import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, MessageSquare, Users, Zap, Bell, Mail } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PLDG Hub
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
            <Link href="/discussions" className="text-slate-600 hover:text-slate-900 transition-colors">
              Discussions
            </Link>
            <Link href="/issues" className="text-slate-600 hover:text-slate-900 transition-colors">
              Issues
            </Link>
          </nav>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Programming Language Developer Guild
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Streamline Your
            <br />
            Open Source Journey
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover GitHub discussions, find contribution opportunities, and stay connected with the Programming
            Language Developer Guild community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/dashboard">
                <MessageSquare className="w-5 h-5 mr-2" />
                Explore Discussions
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
              <Link href="/issues">
                <GitBranch className="w-5 h-5 mr-2" />
                Browse Issues
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful tools to help you contribute effectively to programming language development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Discussion Summaries</CardTitle>
              <CardDescription>
                Get AI-powered summaries of GitHub discussions to quickly understand key topics and decisions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Issue Discovery</CardTitle>
              <CardDescription>
                Browse and filter issues across PLDG repositories to find the perfect contribution opportunity
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Smart Filtering</CardTitle>
              <CardDescription>
                Filter by difficulty level, language, and topic to find issues that match your expertise
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Community Focus</CardTitle>
              <CardDescription>
                Stay connected with the PLDG community and discover trending discussions and hot topics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Smart Notifications</CardTitle>
              <CardDescription>
                Get notified about new beginner-friendly issues and important community updates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle>Weekly Digest</CardTitle>
              <CardDescription>
                Receive curated weekly summaries of trending discussions and important developments
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Contribute?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers contributing to programming language development through PLDG
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8">
            <Link href="/dashboard">Start Exploring</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <GitBranch className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold">PLDG Hub</span>
              </div>
              <p className="text-sm text-slate-400">
                Streamlining collaboration in the Programming Language Developer Guild
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/discussions" className="hover:text-white transition-colors">
                    Discussions
                  </Link>
                </li>
                <li>
                  <Link href="/issues" className="hover:text-white transition-colors">
                    Issues
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 PLDG Hub. Built for the Programming Language Developer Guild community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
