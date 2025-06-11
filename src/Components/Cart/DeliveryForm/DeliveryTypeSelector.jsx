"use client"

import { Card, CardContent, Typography, Box } from "@mui/material"
import { LocalShipping, Store } from "@mui/icons-material"
import { useLanguage } from "../../../contexts/LanguageContext"

const DeliveryTypeSelector = ({ onSelect }) => {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <Typography variant="h5" component="h1" fontWeight="bold" className="text-gray-700">
        {t("checkout.selectDeliveryType")}
      </Typography>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Home Delivery Option */}
        <Card
          sx={{
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            },
          }}
          onClick={() => onSelect("home")}
        >
          <CardContent className="text-center p-6">
            <Box className="mb-4">
              <LocalShipping sx={{ fontSize: 48, color: "#2e7d32" }} />
            </Box>
            <Typography variant="h6" fontWeight="bold" className="mb-2">
              {t("checkout.homeDelivery")}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              {t("checkout.homeDeliveryDesc")}
            </Typography>
            <Typography variant="body1" color="success.main" fontWeight="bold">
              {t("checkout.deliveryFee")}
            </Typography>
          </CardContent>
        </Card>

        {/* Store Pickup Option */}
        <Card
          sx={{
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            },
          }}
          onClick={() => onSelect("pickup")}
        >
          <CardContent className="text-center p-6">
            <Box className="mb-4">
              <Store sx={{ fontSize: 48, color: "#2e7d32" }} />
            </Box>
            <Typography variant="h6" fontWeight="bold" className="mb-2">
              {t("checkout.storePickup")}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              {t("checkout.storePickupDesc")}
            </Typography>
            <Typography variant="body1" color="success.main" fontWeight="bold">
              {t("cart.free")}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DeliveryTypeSelector
