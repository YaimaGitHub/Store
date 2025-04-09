"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // If no images provided, use a placeholder
  const imageList = images?.length ? images : ["/placeholder.svg?height=600&width=600"]

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
        <Image src={imageList[activeIndex] || "/placeholder.svg"} alt="Product image" fill className="object-cover" />

        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {imageList.map((image, index) => (
          <button
            key={index}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
              index === activeIndex ? "ring-2 ring-primary" : "ring-1 ring-gray-200"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
