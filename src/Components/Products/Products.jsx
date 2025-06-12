"use client"

import { Container, Fade } from "@mui/material"
import { useEffect, useState } from "react"
import ProductCard, { ProductCardSkeleton } from "./ProductCard/ProductCard"
import { useParams } from "react-router-dom"
import { useLanguage } from "../../contexts/LanguageContext"
import { productsData } from "../../store/products"

const Products = ({ categoryProducts }) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { categoryName } = useParams()
  const { t } = useLanguage()

  // Scrolling Bug Fixed
  window.scroll({ top: 0 })

  // Get Products
  useEffect(() => {
    const getData = () => {
      try {
        let allProducts = []

        if (categoryName) {
          // Get products for specific category
          const categoryIndex =
            categoryName === "meat"
              ? 0
              : categoryName === "vegetables"
                ? 1
                : categoryName === "fruits"
                  ? 2
                  : categoryName === "dairy"
                    ? 3
                    : categoryName === "grains"
                      ? 4
                      : 2

          allProducts = productsData[categoryIndex]?.items || []
        } else {
          // Get all products from all categories
          Object.values(productsData).forEach((category) => {
            allProducts = allProducts.concat(category.items)
          })
        }

        setProducts(allProducts)
        setIsLoading(false)
      } catch (error) {
        console.error("Products Fetch Failed", error)
        setIsLoading(false)
      }
    }

    getData()
  }, [categoryName])

  const getCategoryDisplayName = (categoryName) => {
    const categoryMap = {
      meat: t("categories.meat"),
      vegetables: t("categories.vegetables"),
      fruits: t("categories.fruits"),
      dairy: t("categories.dairy"),
      grains: t("categories.grains"),
    }
    return categoryMap[categoryName] || categoryName
  }

  return (
    <main className="min-h-screen space-y-5 pt-20 mb-9">
      <Fade in={true}>
        <Container className="xl:space-y-10 sm:space-y-8 space-y-6">
          {/* Title */}
          <h1 className="pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize">
            {categoryName ? getCategoryDisplayName(categoryName) : t("products.allProducts")}
          </h1>

          {/* Product_cards*/}
          <section
            className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 
                lg:gap-6 gap-x-5 gap-y-5"
          >
            {!isLoading
              ? products.map((product) => <ProductCard key={product.id} product={product} />)
              : Array.from({ length: 8 }).map((pd, i) => {
                  return <ProductCardSkeleton key={i} />
                })}
          </section>
        </Container>
      </Fade>
    </main>
  )
}

export default Products
