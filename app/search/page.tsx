"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductGrid from "@/components/product-grid"
import { useTranslations } from "@/hooks/use-translations"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState("relevance")
  const { t } = useTranslations()

  useEffect(() => {
    async function searchProducts() {
      setLoading(true)
      try {
        // Import the function dynamically to avoid server/client mismatch
        const { getAllProducts } = await import("@/lib/products")
        const allProducts = await getAllProducts()

        // Filter products based on search query
        const filtered = allProducts.filter((product) => {
          const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase()
          return searchableText.includes(query.toLowerCase())
        })

        setProducts(filtered)
        setFilteredProducts(filtered)
      } catch (error) {
        console.error("Error searching products:", error)
        setProducts([])
        setFilteredProducts([])
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      searchProducts()
    } else {
      setProducts([])
      setFilteredProducts([])
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    // Sort products based on selected order
    const sortedProducts = [...products]

    switch (sortOrder) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      // relevance is the default order from the search results
      default:
        break
    }

    setFilteredProducts(sortedProducts)
  }, [sortOrder, products])

  return (
    <div className="container px-4 py-8 mx-auto">
      <Link href="/products" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span>{t("products.backToProducts")}</span>
      </Link>

      <h1 className="text-3xl font-bold mb-4">{t("search.results")}</h1>
      <p className="text-gray-600 mb-4">
        {query ? t("search.resultsFor", "search").replace("{query}", query) : t("search.enterQuery")}
      </p>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? t("search.product") : t("search.products")}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{t("search.sortBy")}:</span>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("search.sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">{t("search.relevance")}</SelectItem>
                  <SelectItem value="price-asc">{t("search.priceLowToHigh")}</SelectItem>
                  <SelectItem value="price-desc">{t("search.priceHighToLow")}</SelectItem>
                  <SelectItem value="name-asc">{t("search.nameAToZ")}</SelectItem>
                  <SelectItem value="name-desc">{t("search.nameZToA")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ProductGrid products={filteredProducts} />
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">{t("search.noResults")}</h3>
          <p className="text-gray-500 mb-6">{t("search.tryDifferent")}</p>
          <Link href="/products">
            <Button variant="outline">{t("search.browseAll")}</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
