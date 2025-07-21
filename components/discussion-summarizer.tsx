"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { useAuth } from "@/components/AuthProvider"


interface Discussion {
  id: number
  title: string
  repository: string
  summary: string
  participants: number
  lastActivity: string
  tags: string[]
  trending: boolean
  replies: number
}

interface DiscussionSummarizerProps {
  onDiscussionAdded: (discussion: Discussion) => void
  className?: string
}

export function DiscussionSummarizer({ onDiscussionAdded, className }: DiscussionSummarizerProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [lastSummary, setLastSummary] = useState<Discussion | null>(null)

  const { user } = useAuth()

  const handleSummarize = async () => {
    if (!input.trim()) return

    const urlPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/discussions\/\d+$/
    if (!urlPattern.test(input)) {
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
        body: JSON.stringify({ discussionUrl: input }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to summarize discussion")
      }

      const data = await response.json()
      
      if (data.success && data.summary) {
        const newDiscussion: Discussion = {
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

        setLastSummary(newDiscussion)
        onDiscussionAdded(newDiscussion)
        setInput("")
        setError("")
      }
    } catch (error) {
      console.error("Failed to summarize discussion:", error)
      setError(error instanceof Error ? error.message : "Failed to summarize discussion")
    } finally {
      setIsLoading(false)
    }
  }

  const isValidInput = input.trim() && /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/discussions\/\d+$/.test(input.trim())

  return (
    <div className={className}>
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI Discussion Summarizer
          </CardTitle>
          <CardDescription>
            Enter a GitHub discussion URL or ID to generate an intelligent summary
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
                            <Input
                  placeholder="https://github.com/owner/repo/discussions/123"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    if (error) setError("")
                  }}
                  className="flex-1"
                  disabled={isLoading}
                />
            <Button onClick={handleSummarize} disabled={!isValidInput || isLoading} className="shrink-0 min-w-[120px]">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Summarize
                </>
              )}
                          </Button>
            </div>

            {error && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

                          {!isValidInput && input.trim() && (
                <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 p-2 rounded border border-amber-200 dark:border-amber-800">
                  Please enter a valid GitHub discussion URL (e.g., https://github.com/owner/repo/discussions/123)
                </p>
              )}

          {lastSummary && (
            <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800">✓ Successfully Summarized</Badge>
                <Badge className="bg-purple-100 text-purple-800">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Generated
                </Badge>
              </div>
              <h4 className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-1">{lastSummary.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Added to discussions • {lastSummary.participants} participants
              </p>
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  )
}
