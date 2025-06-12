"use client"

import { Button, Container, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import ProductCard, { ProductCardSkeleton } from "../../Products/ProductCard/ProductCard"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../../contexts/LanguageContext"
import { productsData } from "../../../store/products"

const EnjoyOurFreshGroceryItems = () => {
  const [items, setItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { t } = useLanguage()

  // MediaQuery
  const isExtraSmallScreen = useMediaQuery("(max-width: 640px)")

  // Get Grocery Items
  useEffect(() => {
    const getData = () => {
      try {
        const categoryData = productsData[selectedCategory]
        if (categoryData && categoryData.items) {
          setItems(categoryData.items.slice(0, 3))
        }
        setIsLoading(false)
      } catch (error) {
        console.error("EnjoyFreshItems Fetch Failed", error)
        setIsLoading(false)
      }
    }

    getData()
  }, [selectedCategory])

  return (
    <Container>
      <div className="space-y-7 xl:space-y-8">
        {/* Title */}
        <h1 className="text-center pb-0 md:text-2xl text-xl font-semibold capitalize tracking-wide">
          {t("products.title")}
        </h1>
        {/* Items Toggler  */}
        <ItemsToggler alignment={selectedCategory} setAlignment={setSelectedCategory} />

        {/*Grocery Items */}
        <div
          className="grid md:grid-cols-3 sm:grid-cols-2 
                lg:gap-6 gap-x-5 gap-y-5"
        >
          {!isLoading
            ? items.map((item) => <ProductCard key={item.id} product={item} />)
            : Array.from({ length: 3 }).map((pd, i) => {
                return <ProductCardSkeleton key={i} />
              })}
        </div>
        <Button
          onClick={() => navigate("/products")}
          color="success"
          size={isExtraSmallScreen ? "small" : "medium"}
          variant="outlined"
          sx={{ textTransform: "capitalize", display: "block", mx: "auto" }}
        >
          {t("products.viewAll")}
        </Button>
      </div>
    </Container>
  )
}

// Grocery Items Toggler
const ItemsToggler = ({ alignment, setAlignment }) => {
  // MediaQuery
  const isExtraSmallScreen = useMediaQuery("(max-width: 640px)")
  const isLargeScreen = useMediaQuery("(min-width: 1024px)")
  const { t } = useLanguage()

  return (
    <div className="space-x-3 md:space-x-5 text-center">
      {[
        { id: 0, name: t("categories.meat") },
        { id: 1, name: t("categories.vegetables") },
        { id: 2, name: t("categories.fruits") },
      ].map((category) => (
        <Button
          sx={{ textTransform: "capitalize", transition: "all 150ms ease-in-out" }}
          size={isExtraSmallScreen ? "small" : isLargeScreen ? "large" : "medium"}
          color="success"
          variant={alignment === category.id ? "contained" : "text"}
          key={category.id}
          onClick={(e) => setAlignment(Number.parseInt(e.target.value))}
          value={category.id}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}

export default EnjoyOurFreshGroceryItems
