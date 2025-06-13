"use client"

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Home from "./Components/Home/Home"
import Products from "./Components/Products/Products"
import AllCategories from "./Components/AllCategories/AllCategories"
import PageNotFound from "./Components/PageNotFound/PageNotFound"
import About from "./Components/About/About"
import Login from "./Components/Authantication/Login/Login"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import Cart from "./Components/Cart/Cart"
import { LanguageProvider } from "./contexts/LanguageContext"
import { useEffect } from "react"

function App() {
  // This effect prevents pinch-to-zoom on mobile devices
  useEffect(() => {
    // Prevenir zoom en dispositivos móviles
    const handleTouchMove = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    document.addEventListener("touchmove", handleTouchMove, { passive: false })

    // Detectar si es un refresco de página
    const pageAccessedByReload =
      (window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType("navigation")
        .map((nav) => nav.type)
        .includes("reload")

    // Si es un refresco, vaciar el carrito y redirigir al home
    if (pageAccessedByReload) {
      // Vaciar el carrito en sessionStorage
      sessionStorage.removeItem("grocery_cartItems")

      // Redirigir al home si no estamos ya en la página de inicio
      if (window.location.pathname !== "/" && window.location.pathname !== "/home") {
        window.location.href = "/"
      }
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories/:categoryName" element={<Products categoryProducts={true} />} />
            <Route path="/login" element={<Login />} />
            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App
