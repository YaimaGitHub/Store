"use client"

import { useContext } from "react"
import CartItemCard from "../CartItemCard/CartItemCard"
import { groceryContext } from "../../Layout/Layout"
import { useLanguage } from "../../../contexts/LanguageContext"
import { Box, Typography } from "@mui/material"

const CartItems = () => {
  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState
  const { t } = useLanguage()

  return (
    <Box
      sx={{
        animation: "slideInFromLeft 0.8s ease-out",
        "@keyframes slideInFromLeft": {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      }}
    >
      <div className="lg:space-y-10 space-y-6">
        {/* Title with enhanced styling */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
            animation: "titleSlideIn 0.6s ease-out",
            "@keyframes titleSlideIn": {
              "0%": { transform: "translateY(-20px)", opacity: 0 },
              "100%": { transform: "translateY(0)", opacity: 1 },
            },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #2e7d32, #4caf50)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              animation: "textGlow 2s ease-in-out infinite alternate",
              "@keyframes textGlow": {
                "0%": { filter: "brightness(1)" },
                "100%": { filter: "brightness(1.3)" },
              },
            }}
          >
            🛍️ {t("cart.title")} ({cartItems.length})
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            Productos seleccionados para tu pedido
          </Typography>
        </Box>

        {/* Items Card list with staggered animation */}
        <div className="space-y-4">
          {cartItems.map((cartItem, index) => (
            <Box
              key={cartItem.id}
              sx={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                "@keyframes fadeInUp": {
                  "0%": { transform: "translateY(30px)", opacity: 0 },
                  "100%": { transform: "translateY(0)", opacity: 1 },
                },
              }}
            >
              <CartItemCard item={cartItem} />
            </Box>
          ))}
        </div>
      </div>
    </Box>
  )
}

export default CartItems
