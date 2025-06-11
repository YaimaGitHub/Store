"use client"

import { Outlet } from "react-router-dom"
import Navbar, { userLoggedIn } from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { createContext, useState, useEffect } from "react"
import { handleSessionStorage } from "../../utils/utils"

export const groceryContext = createContext()
const Layout = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(userLoggedIn)
  const [cartItems, setCartItems] = useState([])

  // Clear cart when the store loads (on app initialization)
  useEffect(() => {
    // Clear cart items from session storage and state when app loads
    handleSessionStorage("remove", "cartItems")
    setCartItems([])
  }, [])

  return (
    <groceryContext.Provider
      value={{
        userLoggedInState: [isUserLoggedIn, setIsUserLoggedIn],
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

export default Layout
