"use client"

import Link from "next/link"
import AddToCartButton from "./add-to-cart-button"
import { useLocale } from "./locale-provider"

export default function RelatedProducts({ products }) {
  const { formatPrice } = useLocale()

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex space-x-4">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64 border rounded-lg overflow-hidden">
              <Link href={`/products/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image || "/placeholder.svg?height=200&width=200"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/products/${product.id}`} className="block">
                  <h3 className="font-medium text-base mb-1 hover:underline">{product.name}</h3>
                </Link>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{formatPrice(product.price)}</span>
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
                </div>

                <AddToCartButton product={product} disabled={!product.inStock} compact />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
