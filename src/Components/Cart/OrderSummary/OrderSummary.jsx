"use client"

import { Button, useMediaQuery, Box, Typography, Card, CardContent } from "@mui/material"
import { groceryContext } from "../../Layout/Layout"
import { useContext } from "react"
import { checkoutContext } from "../Cart"
import { useLanguage } from "../../../contexts/LanguageContext"
import { ShoppingCart, LocalShipping, LocationOn } from "@mui/icons-material"

const OrderSummary = ({ deliveryZone, deliveryType }) => {
  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState
  const [isProceedToCheckout, setIsProceedToCheckout] = useContext(checkoutContext)
  const { t } = useLanguage()

  // Media Query
  const isMediumScreen = useMediaQuery("(max-width:1024px)")

  const subtotal = Number.parseFloat(cartItems.reduce((total, item) => total + Number.parseFloat(item.total), 0))

  // Calculate delivery cost based on delivery type and zone
  const getDeliveryFee = () => {
    if (deliveryType === "pickup") return 0
    if (deliveryType === "home" && deliveryZone) {
      return deliveryZone.price || 0
    }
    return 0
  }

  const deliveryFee = getDeliveryFee()
  const total = subtotal + deliveryFee

  return (
    <div className="flex justify-center md:pt-16 col md:col-span-4 lg:col-span-1">
      <Box
        sx={{
          width: "100%",
          maxWidth: "25rem",
          animation: "slideInFromRight 0.8s ease-out",
          "@keyframes slideInFromRight": {
            "0%": { transform: "translateX(100%)", opacity: 0 },
            "100%": { transform: "translateX(0)", opacity: 1 },
          },
        }}
      >
        <Card
          elevation={6}
          sx={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            border: "1px solid #e0e0e0",
            borderRadius: "16px",
            overflow: "hidden",
            position: "sticky",
            top: "20px",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* Header with gradient background */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
                color: "white",
                p: 3,
                textAlign: "center",
                animation: "headerSlide 0.6s ease-out",
                "@keyframes headerSlide": {
                  "0%": { transform: "translateY(-20px)", opacity: 0 },
                  "100%": { transform: "translateY(0)", opacity: 1 },
                },
              }}
            >
              <Typography variant="h5" fontWeight="bold" className="flex items-center justify-center">
                <ShoppingCart className="mr-2" />
                {t("cart.orderSummary")}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                Revisa tu pedido antes de continuar
              </Typography>
            </Box>

            {/* Content */}
            <Box sx={{ p: 3, space: 4 }}>
              {/* Subtotal with animation */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  mb: 2,
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  animation: "fadeInUp 0.6s ease-out 0.2s both",
                  "@keyframes fadeInUp": {
                    "0%": { transform: "translateY(20px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                  },
                }}
              >
                <Typography variant="body1" fontWeight="medium">
                  🛒 {t("cart.subtotal")}
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  $ {subtotal.toFixed(2)} {t("common.usd")}
                </Typography>
              </Box>

              {/* Delivery Charge with enhanced styling */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  mb: 2,
                  backgroundColor: deliveryFee === 0 ? "#e8f5e8" : "#fff3e0",
                  borderRadius: "8px",
                  border: `1px solid ${deliveryFee === 0 ? "#c8e6c9" : "#ffcc02"}`,
                  animation: "fadeInUp 0.6s ease-out 0.4s both",
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight="medium" className="flex items-center">
                    <LocalShipping className="mr-1" fontSize="small" />
                    {t("cart.deliveryCharge")}
                  </Typography>
                  {deliveryType === "home" && deliveryZone && (
                    <Typography variant="caption" color="text.secondary" className="flex items-center mt-1">
                      <LocationOn fontSize="small" className="mr-1" />
                      {deliveryZone.name}
                      {deliveryZone.isGPS && " (GPS)"}
                    </Typography>
                  )}
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={deliveryFee === 0 ? "success.main" : "text.primary"}
                  sx={{
                    animation: deliveryFee === 0 ? "pulse 2s infinite" : "none",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                >
                  {deliveryFee === 0 ? (
                    <span className="flex items-center">🆓 {t("cart.free")}</span>
                  ) : (
                    `$ ${deliveryFee.toFixed(2)} ${t("common.usd")}`
                  )}
                </Typography>
              </Box>

              {/* Total with enhanced styling */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 3,
                  mb: 3,
                  background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                  borderRadius: "12px",
                  border: "2px solid #4caf50",
                  animation: "totalGlow 0.8s ease-out 0.6s both",
                  "@keyframes totalGlow": {
                    "0%": { transform: "scale(0.95)", opacity: 0, boxShadow: "0 0 0 rgba(76, 175, 80, 0)" },
                    "100%": { transform: "scale(1)", opacity: 1, boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)" },
                  },
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  💰 {t("cart.total")}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="success.main"
                  sx={{
                    animation: "priceGlow 2s ease-in-out infinite alternate",
                    "@keyframes priceGlow": {
                      "0%": { textShadow: "0 0 5px rgba(76, 175, 80, 0.5)" },
                      "100%": { textShadow: "0 0 15px rgba(76, 175, 80, 0.8)" },
                    },
                  }}
                >
                  $ {total.toFixed(2)}
                </Typography>
              </Box>

              {/* Proceed to checkout button with enhanced animation */}
              <Button
                fullWidth
                onClick={() => setIsProceedToCheckout(!isProceedToCheckout)}
                sx={{
                  textTransform: "capitalize",
                  display: isProceedToCheckout ? "none" : "block",
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #2e7d32, #4caf50)",
                  color: "white",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(46, 125, 50, 0.4)",
                  transition: "all 0.3s ease",
                  animation: "buttonSlideUp 0.8s ease-out 0.8s both",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(46, 125, 50, 0.6)",
                    background: "linear-gradient(45deg, #1b5e20, #2e7d32)",
                  },
                  "@keyframes buttonSlideUp": {
                    "0%": { transform: "translateY(30px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                  },
                }}
                variant="contained"
                size={isMediumScreen ? "large" : "large"}
              >
                🚀 {t("cart.proceedToCheckout")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default OrderSummary
