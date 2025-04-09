import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { LocaleProvider } from "@/components/locale-provider"
import AutoWhatsAppSync from "@/components/auto-whatsapp-sync"
import { ToastContainer } from "@/components/ui/toast-container"
import CartLoadingIndicator from "@/components/cart-loading-indicator"
import ClientLayout from "./client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description: "A comprehensive e-commerce platform with shopping cart functionality",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LocaleProvider>
            <CartProvider>
              <Navbar />
              <ClientLayout>{children}</ClientLayout>
              <Footer />
              <AutoWhatsAppSync />
              <ToastContainer />
              <CartLoadingIndicator />
            </CartProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'