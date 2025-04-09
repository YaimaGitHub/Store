"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import AddToCartButton from "./add-to-cart-button"
import { useLocale } from "./locale-provider"
import { useTranslations } from "@/hooks/use-translations"
import CurrencyRateIndicator from "./currency-rate-indicator"

export default function ProductGrid({ products }) {
  const { formatPrice } = useLocale()
  const { t } = useTranslations()

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">{t("common.noProductsFound")}</h3>
        <p className="text-gray-500 mb-6">{t("search.tryDifferent")}</p>
        <Link href="/products">
          <Button variant="outline">{t("common.viewAllProducts")}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group border rounded-lg overflow-hidden">
          <Link href={`/products/${product.id}`} className="block relative">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.image || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {product.isNew && (
              <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                {t("products.new")}
              </div>
            )}
            {product.discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {product.discount}% {t("products.off")}
              </div>
            )}
          </Link>

          <div className="p-4">
            <Link href={`/products/${product.id}`} className="block">
              <h3 className="font-medium text-lg mb-1 group-hover:underline">{product.name}</h3>
            </Link>
            <p className="text-gray-500 text-sm mb-2">{t(`categories.${product.category}`)}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center flex-wrap gap-1">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through mr-2">{formatPrice(product.originalPrice)}</span>
                )}
                <span className="font-semibold">{formatPrice(product.price)}</span>
                <CurrencyRateIndicator />
              </div>

              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
            </div>

            <div className="mt-4">
              <AddToCartButton product={product} disabled={!product.inStock} compact />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
