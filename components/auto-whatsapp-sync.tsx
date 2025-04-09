"use client"

import { useEffect } from "react"
import { useCart } from "./cart-provider"
import { useLocale } from "./locale-provider"

export default function AutoWhatsAppSync() {
  const { cart } = useCart()
  const { formatPrice } = useLocale()
  const storeOwnerNumber = "5354690878" // Replace with the store owner's actual WhatsApp number

  useEffect(() => {
    // Only send updates when cart has items
    if (cart.length === 0) return

    // Create a debounced function to avoid sending too many messages
    const timeoutId = setTimeout(() => {
      sendCartToWhatsApp()
    }, 5000) // Wait 5 seconds after cart changes before sending

    return () => clearTimeout(timeoutId)
  }, [cart])

  const sendCartToWhatsApp = () => {
    // Format the message with cart details
    let message = `*Updated Shopping Cart*\n\n`
    message += `*Items:*\n`

    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`
    })

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    message += `\n*Subtotal:* ${formatPrice(subtotal)}`
    message += `\n\n*Note:* This is an automated update from your store.`

    // Create WhatsApp URL with the message
    const whatsappUrl = `https://wa.me/${storeOwnerNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp in a new tab
    // Note: In a real implementation, you might want to use a server-side
    // approach to send messages via the WhatsApp Business API instead
    // of opening a browser tab, which might be blocked by popup blockers

    // For demonstration purposes, we'll log the URL instead of opening it automatically
    console.log("Would send cart update to WhatsApp:", whatsappUrl)

    // Uncomment this line to actually open WhatsApp (not recommended for automatic updates)
    // window.open(whatsappUrl, "_blank")
  }

  // This component doesn't render anything visible
  return null
}
