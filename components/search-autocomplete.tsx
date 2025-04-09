"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

export default function SearchAutocomplete() {
  const router = useRouter()
  const { t } = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)

  useOnClickOutside(searchRef, () => setShowResults(false))

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const { getAllProducts } = await import("@/lib/products")
        const allProducts = await getAllProducts()

        // Filter products based on search query
        const filtered = allProducts
          .filter((product) => {
            const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase()
            return searchableText.includes(searchQuery.toLowerCase())
          })
          .slice(0, 5) // Limit to 5 results for the dropdown

        setResults(filtered)
      } catch (error) {
        console.error("Error searching products:", error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        searchProducts()
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowResults(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setResults([])
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex items-center relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t("common.search")}
          className="w-[200px] lg:w-[300px] pl-8 pr-8"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
        />
        {searchQuery && (
          <Button type="button" variant="ghost" size="icon" className="absolute right-8 h-full" onClick={clearSearch}>
            <X className="h-4 w-4" />
            <span className="sr-only">{t("search.clear")}</span>
          </Button>
        )}
        <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
          <span className="sr-only">{t("search.search")}</span>
        </Button>
      </form>

      {showResults && searchQuery.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border overflow-hidden">
          {loading ? (
            <div className="p-4 text-center text-sm text-gray-500">{t("search.searching")}...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.id} className="border-b last:border-0">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="w-10 h-10 flex-shrink-0 mr-3 bg-gray-200 rounded overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg?height=40&width=40"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{product.category}</p>
                    </div>
                    <div className="ml-2 text-sm font-semibold">{product.price.toFixed(2)}</div>
                  </Link>
                </li>
              ))}
              <li className="p-2 bg-gray-50 dark:bg-gray-900">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-primary"
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
                    setShowResults(false)
                  }}
                >
                  {t("search.viewAll")}
                </Button>
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">{t("search.noResults")}</div>
          )}
        </div>
      )}
    </div>
  )
}
