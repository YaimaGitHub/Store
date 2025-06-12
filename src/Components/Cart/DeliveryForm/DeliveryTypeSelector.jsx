"use client"

import { Card, CardContent, Typography, Box, Zoom } from "@mui/material"
import { LocalShipping, Store } from "@mui/icons-material"
import { useLanguage } from "../../../contexts/LanguageContext"

const DeliveryTypeSelector = ({ onSelect }) => {
  const { t } = useLanguage()

  return (
    <Box
      sx={{
        animation: "fadeInUp 0.8s ease-out",
        "@keyframes fadeInUp": {
          "0%": { transform: "translateY(50px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      }}
    >
      <div className="space-y-8">
        {/* Title with enhanced styling */}
        <Box
          sx={{
            textAlign: "center",
            animation: "titleSlideDown 0.6s ease-out",
            "@keyframes titleSlideDown": {
              "0%": { transform: "translateY(-30px)", opacity: 0 },
              "100%": { transform: "translateY(0)", opacity: 1 },
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(45deg, #2e7d32, #4caf50)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            🚚 {t("checkout.selectDeliveryType")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Elige cómo prefieres recibir tu pedido
          </Typography>
        </Box>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Home Delivery Option */}
          <Zoom in={true} style={{ transitionDelay: "0.3s" }}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                border: "2px solid transparent",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 12px 30px rgba(46, 125, 50, 0.3)",
                  border: "2px solid #4caf50",
                  "&::before": {
                    opacity: 1,
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                },
              }}
              onClick={() => onSelect("home")}
            >
              <CardContent className="text-center p-8 relative z-10">
                <Box
                  className="mb-6"
                  sx={{
                    animation: "iconFloat 3s ease-in-out infinite",
                    "@keyframes iconFloat": {
                      "0%, 100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-10px)" },
                    },
                  }}
                >
                  <LocalShipping sx={{ fontSize: 64, color: "#2e7d32" }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" className="mb-3">
                  🏠 {t("checkout.homeDelivery")}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="mb-4">
                  {t("checkout.homeDeliveryDesc")}
                </Typography>
                <Box
                  sx={{
                    background: "linear-gradient(45deg, #e8f5e8, #c8e6c9)",
                    borderRadius: "8px",
                    p: 2,
                    animation: "priceGlow 2s ease-in-out infinite alternate",
                    "@keyframes priceGlow": {
                      "0%": { boxShadow: "0 0 5px rgba(76, 175, 80, 0.3)" },
                      "100%": { boxShadow: "0 0 15px rgba(76, 175, 80, 0.6)" },
                    },
                  }}
                >
                  <Typography variant="h6" color="success.main" fontWeight="bold">
                    💰 {t("checkout.deliveryFee")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Zoom>

          {/* Store Pickup Option */}
          <Zoom in={true} style={{ transitionDelay: "0.5s" }}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                border: "2px solid transparent",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 12px 30px rgba(46, 125, 50, 0.3)",
                  border: "2px solid #4caf50",
                  "&::before": {
                    opacity: 1,
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                },
              }}
              onClick={() => onSelect("pickup")}
            >
              <CardContent className="text-center p-8 relative z-10">
                <Box
                  className="mb-6"
                  sx={{
                    animation: "iconBounce 2s ease-in-out infinite",
                    "@keyframes iconBounce": {
                      "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
                      "40%": { transform: "translateY(-15px)" },
                      "60%": { transform: "translateY(-7px)" },
                    },
                  }}
                >
                  <Store sx={{ fontSize: 64, color: "#2e7d32" }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" className="mb-3">
                  🏪 {t("checkout.storePickup")}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="mb-4">
                  {t("checkout.storePickupDesc")}
                </Typography>
                <Box
                  sx={{
                    background: "linear-gradient(45deg, #e8f5e8, #c8e6c9)",
                    borderRadius: "8px",
                    p: 2,
                    animation: "freeGlow 2s ease-in-out infinite alternate",
                    "@keyframes freeGlow": {
                      "0%": { boxShadow: "0 0 5px rgba(76, 175, 80, 0.3)" },
                      "100%": { boxShadow: "0 0 15px rgba(76, 175, 80, 0.6)" },
                    },
                  }}
                >
                  <Typography variant="h6" color="success.main" fontWeight="bold">
                    🆓 {t("cart.free")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Zoom>
        </div>
      </div>
    </Box>
  )
}

export default DeliveryTypeSelector
