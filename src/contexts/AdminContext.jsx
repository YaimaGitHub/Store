"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { handleSessionStorage } from "../utils/utils"

const AdminContext = createContext()

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminSettings, setAdminSettings] = useState({
    logo: "/src/assets/logo.svg",
    deliveryCharge: 5.99,
    aboutText: {
      es: {
        title: "Bienvenido a Nuestra Aplicación de Supermercado",
        content1:
          "En Grocery, estamos comprometidos a brindarte los productos más frescos y de la más alta calidad para tus necesidades diarias.",
        content2:
          "Con nuestra interfaz fácil de usar y servicio de entrega confiable, comprar comestibles nunca ha sido más fácil.",
        content3: "Nos enorgullecemos de nuestro compromiso con un servicio al cliente excepcional.",
        content4: "Experimenta la comodidad y la alegría de comprar desde la comodidad de tu hogar.",
        content5: "Comienza a comprar ahora y haz que tu vida diaria sea más saludable y conveniente.",
      },
      en: {
        title: "Welcome to Our Grocery App",
        content1:
          "At Grocery, we are committed to providing you with the freshest and highest quality products for your everyday needs.",
        content2:
          "With our user-friendly interface and reliable delivery service, grocery shopping has never been easier.",
        content3: "We take pride in our commitment to exceptional customer service.",
        content4: "Experience the convenience and joy of shopping from the comfort of your home.",
        content5: "Start shopping now and make your everyday life healthier and more convenient.",
      },
    },
    whatsappNumber: "+1234567890",
    countryCode: "+1",
    deliveryOptions: {
      homeDelivery: true,
      storePickup: true,
      defaultOption: "homeDelivery",
    },
    sliderImages: [
      {
        id: 1,
        background: "/src/assets/backgrounds/1_bg.png",
        image: "/src/assets/hero_customer.png",
        title: "Fresh Groceries",
        subtitle: "Delivered to your door",
      },
      {
        id: 2,
        background: "/src/assets/backgrounds/2_bg.png",
        image: "/src/assets/hero_customer.png",
        title: "Quality Products",
        subtitle: "Best prices guaranteed",
      },
    ],
    services: [
      {
        id: 0,
        name: {
          es: "Entrega Extra Rápida",
          en: "Extra Fastest Delivery",
        },
        icon: "/src/assets/icons/service_icons/truck.png",
      },
      {
        id: 1,
        name: {
          es: "Rastrear y Gestionar Pedidos",
          en: "Track and Manage Orders",
        },
        icon: "/src/assets/icons/service_icons/location.png",
      },
      {
        id: 2,
        name: {
          es: "Atención al Cliente",
          en: "Customer Support",
        },
        icon: "/src/assets/icons/service_icons/headphones.png",
      },
      {
        id: 3,
        name: {
          es: "Precio Competitivo",
          en: "Competitive Price",
        },
        icon: "/src/assets/icons/service_icons/price.png",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Juan Pérez",
        rating: 5,
        comment: "Excelente servicio y productos frescos",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        id: 2,
        name: "María García",
        rating: 4,
        comment: "Muy buena calidad, recomendado",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      },
    ],
  })

  useEffect(() => {
    const savedSettings = handleSessionStorage("get", "adminSettings")
    if (savedSettings) {
      setAdminSettings(savedSettings)
    }

    const adminStatus = handleSessionStorage("get", "isAdmin")
    if (adminStatus) {
      setIsAdmin(adminStatus)
    }
  }, [])

  const updateAdminSettings = (newSettings) => {
    const updatedSettings = { ...adminSettings, ...newSettings }
    setAdminSettings(updatedSettings)
    handleSessionStorage("set", "adminSettings", updatedSettings)
  }

  const loginAsAdmin = () => {
    setIsAdmin(true)
    handleSessionStorage("set", "isAdmin", true)
  }

  const logoutAdmin = () => {
    setIsAdmin(false)
    handleSessionStorage("set", "isAdmin", false)
  }

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminSettings,
        updateAdminSettings,
        loginAsAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
