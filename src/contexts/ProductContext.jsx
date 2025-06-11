"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { handleSessionStorage } from "../utils/utils"
import { products as initialProducts } from "../store/products"

const ProductContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts)

  useEffect(() => {
    const savedProducts = handleSessionStorage("get", "products")
    if (savedProducts) {
      setProducts(savedProducts)
    }
  }, [])

  const updateProducts = (newProducts) => {
    setProducts(newProducts)
    handleSessionStorage("set", "products", newProducts)
  }

  const updateProduct = (categoryIndex, productIndex, updatedProduct) => {
    const newProducts = [...products]
    newProducts[categoryIndex].items[productIndex] = updatedProduct
    updateProducts(newProducts)
  }

  const addProduct = (categoryIndex, newProduct) => {
    const newProducts = [...products]
    const newId = Math.max(...newProducts[categoryIndex].items.map((p) => p.id)) + 1
    newProduct.id = newId
    newProducts[categoryIndex].items.push(newProduct)
    updateProducts(newProducts)
  }

  const deleteProduct = (categoryIndex, productIndex) => {
    const newProducts = [...products]
    newProducts[categoryIndex].items.splice(productIndex, 1)
    updateProducts(newProducts)
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        updateProducts,
        updateProduct,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
