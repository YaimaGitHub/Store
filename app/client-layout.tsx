"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"

// Dynamically import CartAnimationProvider with ssr: false
const CartAnimationProvider = dynamic(
  () => import("@/components/cart-animation-provider").then((mod) => mod.CartAnimationProvider),
  {
    ssr: false,
  },
)

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <CartAnimationProvider>{children}</CartAnimationProvider>
      </main>
    </div>
  )
}
