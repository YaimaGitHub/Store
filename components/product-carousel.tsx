"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"
import { useLocale } from "@/components/locale-provider"

export default function ProductCarousel({ products, title }) {
  const { t } = useTranslations()
  const { formatPrice } = useLocale()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(4)
  const containerRef = useRef(null)

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 768) {
        setVisibleItems(2)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3)
      } else {
        setVisibleItems(4)
      }
    }

    updateVisibleItems()
    window.addEventListener("resize", updateVisibleItems)
    return () => window.removeEventListener("resize", updateVisibleItems)
  }, [])

  const totalSlides = Math.max(0, products.length - visibleItems + 1)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalSlides - 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">{t("common.previous")}</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= totalSlides - 1}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">{t("common.next")}</span>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0" style={{ width: `${100 / visibleItems}%` }}>
              <div className="m-2 border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image || "/Ropa_calzado_accesorios/zapatos/Zapato de mujer (Fashion).jpg?height=300&width=300"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-base mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2 truncate">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{formatPrice(product.price)}</span>
                      {product.isNew && (
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded">{t("products.new")}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
