"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

interface SignInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const [loading, setLoading] = useState(false)
  const handleSignIn = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({ provider: "google" })
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Sign in to PLDG Hub</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            onClick={handleSignIn}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full"
            variant="outline"
          >
            <FcGoogle className="w-5 h-5" />
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 