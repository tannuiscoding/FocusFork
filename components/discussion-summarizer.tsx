"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

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
  const [lastSummary, setLastSummary] = useState<Discussion | null>(null)

  const handleSummarize = async () => {
    if (!input.trim()) return

    setIsLoading(true)

    try {
      // Simulate API call to GitHub and AI summarization
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Extract discussion info from URL or ID
      const discussionId = input.includes("github.com") ? input.split("/").pop() : input

      // Mock different discussion topics based on ID
      const mockTopics = [
        {
          title: "Advanced memory allocation strategies",
          repository: "memory-management",
          summary:
            "This discussion explores various memory allocation strategies including arena allocation, pool allocation, and hybrid approaches. Key points include performance trade-offs, memory fragmentation concerns, and implementation complexity. The community is leaning towards a hybrid approach that combines the benefits of both strategies.",
          tags: ["memory", "allocation", "performance"],
        },
        {
          title: "Type system improvements for generic constraints",
          repository: "type-system",
          summary:
            "Discussion focuses on enhancing generic type constraints to provide better compile-time guarantees while maintaining ergonomics. Participants debate syntax alternatives, backward compatibility, and integration with existing type inference systems.",
          tags: ["types", "generics", "constraints"],
        },
        {
          title: "Async runtime optimization techniques",
          repository: "async-runtime",
          summary:
            "Community discussion on optimizing async runtime performance through work-stealing schedulers, task batching, and memory pool reuse. Benchmarks show 40% improvement in throughput with proposed changes.",
          tags: ["async", "runtime", "optimization"],
        },
      ]

      const randomTopic = mockTopics[Math.floor(Math.random() * mockTopics.length)]

      const newDiscussion: Discussion = {
        id: Date.now(),
        title: `Discussion #${discussionId}: ${randomTopic.title}`,
        repository: randomTopic.repository,
        summary: `AI-generated summary: ${randomTopic.summary}`,
        participants: Math.floor(Math.random() * 25) + 5,
        lastActivity: "Just now",
        tags: [...randomTopic.tags, "ai-summarized"],
        trending: Math.random() > 0.7,
        replies: Math.floor(Math.random() * 60) + 15,
      }

      setLastSummary(newDiscussion)
      onDiscussionAdded(newDiscussion)
      setInput("")
    } catch (error) {
      console.error("Failed to summarize discussion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isValidInput = input.trim() && (input.includes("github.com/") || /^\d+$/.test(input.trim()))

  return (
    <div className={className}>
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI Discussion Summarizer
          </CardTitle>
          <CardDescription>Enter a GitHub discussion URL or ID to generate an intelligent summary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://github.com/org/repo/discussions/123 or just 123"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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

          {!isValidInput && input.trim() && (
            <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 p-2 rounded border border-amber-200 dark:border-amber-800">
              Please enter a valid GitHub discussion URL or numeric ID
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
