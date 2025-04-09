"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function CartLoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Simulate a short delay to show the loading indicator
    // In a real app, this would be tied to the cart initialization state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => {
      clearTimeout(timer)
      setIsMounted(false)
    }
  }, [])

  if (!isMounted || !isLoading) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 z-50 flex items-center space-x-2">
      <Loader2 className="h-4 w-4 animate-spin text-primary" />
      <span className="text-xs font-medium">Loading cart...</span>
    </div>
  )
}
