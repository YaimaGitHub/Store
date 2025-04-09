"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

interface CartAnimationProps {
  sourceElement: HTMLElement | null
  targetElement: HTMLElement | null
  imageUrl: string
  isAnimating: boolean
  onAnimationComplete: () => void
}

export default function CartAnimation({
  sourceElement,
  targetElement,
  imageUrl,
  isAnimating,
  onAnimationComplete,
}: CartAnimationProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)
  const animationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create portal element for the animation
    setPortalElement(document.body)
  }, [])

  useEffect(() => {
    if (!isAnimating || !sourceElement || !targetElement || !portalElement) return

    // Calculate start and end positions
    const sourceRect = sourceElement.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()

    // Set initial position of animation element
    if (animationRef.current) {
      animationRef.current.style.position = "fixed"
      animationRef.current.style.top = `${sourceRect.top + sourceRect.height / 2}px`
      animationRef.current.style.left = `${sourceRect.left + sourceRect.width / 2}px`
      animationRef.current.style.transform = "translate(-50%, -50%)"
      animationRef.current.style.zIndex = "100"
    }
  }, [isAnimating, sourceElement, targetElement, portalElement])

  if (!portalElement || !isAnimating) return null

  return createPortal(
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {isAnimating && (
        <motion.div
          ref={animationRef}
          initial={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [1, 1, 0],
            scale: [1, 0.8, 0.5],
            x: targetElement
              ? targetElement.getBoundingClientRect().left -
                (sourceElement?.getBoundingClientRect().left || 0) +
                targetElement.getBoundingClientRect().width / 2 -
                (sourceElement?.getBoundingClientRect().width || 0) / 2
              : 0,
            y: targetElement
              ? targetElement.getBoundingClientRect().top -
                (sourceElement?.getBoundingClientRect().top || 0) +
                targetElement.getBoundingClientRect().height / 2 -
                (sourceElement?.getBoundingClientRect().height || 0) / 2
              : 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            opacity: { times: [0, 0.8, 1] },
            scale: { times: [0, 0.8, 1] },
          }}
          className="pointer-events-none"
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-primary bg-white">
            <img
              src={imageUrl || "/placeholder.svg?height=64&width=64"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalElement,
  )
}
