"use client"

import type React from "react"

import { createContext, useContext, useState, useRef, useEffect } from "react"
import CartAnimation from "./cart-animation"

interface CartAnimationContextType {
  animateToCart: (sourceElement: HTMLElement, imageUrl: string) => void
}

const CartAnimationContext = createContext<CartAnimationContextType | undefined>(undefined)

export function CartAnimationProvider({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const sourceElementRef = useRef<HTMLElement | null>(null)
  const cartIconRef = useRef<HTMLElement | null>(null)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Function to find the cart icon in the DOM
  const findCartIcon = () => {
    if (cartIconRef.current) return cartIconRef.current

    // Look for the cart icon in the navbar
    const cartIcon = document.querySelector('a[href="/cart"] button') as HTMLElement
    if (cartIcon) {
      cartIconRef.current = cartIcon
      return cartIcon
    }

    return null
  }

  const animateToCart = (sourceElement: HTMLElement, productImageUrl: string) => {
    if (isAnimating || !isMounted) return

    sourceElementRef.current = sourceElement
    setImageUrl(productImageUrl)
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)

    // Add a pulse effect to the cart icon
    const cartIcon = findCartIcon()
    if (cartIcon) {
      cartIcon.classList.add("cart-pulse")
      setTimeout(() => {
        cartIcon.classList.remove("cart-pulse")
      }, 700)
    }
  }

  return (
    <CartAnimationContext.Provider value={{ animateToCart }}>
      {children}
      {isMounted && (
        <CartAnimation
          sourceElement={sourceElementRef.current}
          targetElement={findCartIcon()}
          imageUrl={imageUrl}
          isAnimating={isAnimating}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </CartAnimationContext.Provider>
  )
}

export function useCartAnimation() {
  const context = useContext(CartAnimationContext)
  if (context === undefined) {
    throw new Error("useCartAnimation must be used within a CartAnimationProvider")
  }
  return context
}
