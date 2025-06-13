"use client"

import { Outlet } from "react-router-dom"
import Navbar, { userLoggedIn } from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { createContext, useState } from "react"
import { handleSessionStorage } from "../../utils/utils"

export const groceryContext = createContext()
const Layout = () => {
  const [isUserLoggedIn, setIsUserUserLoggedIn] = useState(userLoggedIn)
  const [cartItems, setCartItems] = useState(cartItemsFromSessionStorage)

  return (
    <groceryContext.Provider
      value={{
        userLoggedInState: [isUserLoggedIn, setIsUserUserLoggedIn],
        cartItemsState: [cartItems, setCartItems],
      }}
    >
      <Navbar />
      <section className="min-h-screen">
        <Outlet />
      </section>
      <Footer />
    </groceryContext.Provider>
  )
}

// Modificar el componente Layout para asegurar que el carrito se inicialice correctamente después de un refresco

// Actualizar la constante cartItemsFromSessionStorage para manejar el caso de refresco
const cartItemsFromSessionStorage = (() => {
  // Verificar si la página fue recargada
  const pageAccessedByReload =
    (window.performance.navigation && window.performance.navigation.type === 1) ||
    window.performance
      .getEntriesByType("navigation")
      .map((nav) => nav.type)
      .includes("reload")

  // Si fue recargada, devolver un array vacío
  if (pageAccessedByReload) {
    return []
  }

  // De lo contrario, obtener los items del carrito del sessionStorage
  return handleSessionStorage("get", "cartItems") || []
})()

export default Layout
