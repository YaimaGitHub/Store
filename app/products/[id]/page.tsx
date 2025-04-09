// We need to make this component a client component to use the locale context
"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductImageGallery from "@/components/product-image-gallery"
import RelatedProducts from "@/components/related-products"
import { useLocale } from "@/components/locale-provider"
import { useTranslations } from "@/hooks/use-translations"
import { useEffect, useState } from "react"
import CurrencyRateIndicator from "@/components/currency-rate-indicator"

export default function ProductPage({ params }) {
  const { formatPrice } = useLocale()
  const { t } = useTranslations()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        // Import the functions dynamically to avoid server/client mismatch
        const { getProductById, getRelatedProducts } = await import("@/lib/products")

        const productData = await getProductById(params.id)
        if (!productData) {
          notFound()
        }

        setProduct(productData)

        const relatedData = await getRelatedProducts(productData.category, productData.id)
        setRelatedProducts(relatedData)
      } catch (error) {
        console.error("Error loading product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  if (loading) {
    return <div className="container px-4 py-8 mx-auto">Cargando...</div>
  }

  if (!product) {
    return notFound()
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Link href="/products" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("products.backToProducts")}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <ProductImageGallery images={product.images} />

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center mt-2 mb-4">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              ({product.reviewCount} {t("products.reviews")})
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            <CurrencyRateIndicator />
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {product.features && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">{t("common.features")}:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <Separator className="my-6" />

          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{product.inStock ? t("common.inStock") : t("common.outOfStock")}</span>
            </div>

            <AddToCartButton product={product} disabled={!product.inStock} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">{t("common.relatedProducts")}</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}
