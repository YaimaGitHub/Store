"use client"

import { Button, Typography, Box, Card, CardContent, Divider, Chip } from "@mui/material"
import { WhatsApp, ArrowBack, CheckCircle } from "@mui/icons-material"
import { useState } from "react"
import { useLanguage } from "../../../contexts/LanguageContext"

const WhatsAppSender = ({ orderData, onSuccess, onBack }) => {
  const { t } = useLanguage()
  const [isSending, setIsSending] = useState(false)

  // Calculate totals
  const subtotal = orderData.cartItems.reduce((total, item) => total + Number.parseFloat(item.total), 0)
  const deliveryFee = orderData.deliveryType === "pickup" ? 0 : orderData.deliveryZone?.price || 0
  const total = subtotal + deliveryFee

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const storeInfo = {
      name: "🛒 GROCERY STORE",
      logo: "🏪",
      phone: "+53 54690878",
      address: "Calle 23 #456, Santiago de Cuba",
    }

    let message = `${storeInfo.logo} *${storeInfo.name}*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`

    // Store Logo Reference
    message += `🖼️ *Logo de la Tienda:* Logo_black.png\n\n`

    // Order Header
    message += `📋 *NUEVO PEDIDO*\n`
    message += `🔢 *Número de Orden:* ${orderData.orderNumber}\n`
    message += `📅 *Fecha:* ${orderData.orderDate}\n\n`

    // Customer Information
    message += `👤 *DATOS DEL CLIENTE*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `📱 *WhatsApp:* ${orderData.whatsapp}\n`
    message += `👨‍💼 *Recibe:* ${orderData.receiverName}\n`
    message += `🆔 *Carnet de Identidad:* ${orderData.idCard}\n\n`

    // Delivery Information
    message += `🚚 *INFORMACIÓN DE ENTREGA*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`

    if (orderData.deliveryType === "home") {
      message += `📦 *Tipo:* Entrega a Domicilio\n`
      message += `📍 *Dirección:* ${orderData.address}\n`
      if (orderData.deliveryZone) {
        message += `🗺️ *Zona:* ${orderData.deliveryZone.name}\n`
        if (orderData.deliveryZone.isGPS) {
          message += `📡 *Ubicación GPS:* Sí\n`
          message += `📍 *Coordenadas:* ${orderData.userLocation?.lat.toFixed(6)}, ${orderData.userLocation?.lng.toFixed(6)}\n`
        }
      }
    } else {
      message += `📦 *Tipo:* Recogida en Tienda\n`
      message += `🏪 *Dirección de la Tienda:* ${storeInfo.address}\n`
      message += `🕒 *Horario de Recogida:* Lunes a Domingo: 8:00 AM - 8:00 PM\n`
    }

    if (orderData.additionalInfo) {
      message += `📝 *Información Adicional:* ${orderData.additionalInfo}\n`
    }
    message += `\n`

    // Products
    message += `🛍️ *PRODUCTOS PEDIDOS*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`

    orderData.cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   💰 Precio: $${item.price} x ${item.quantity}${item.unit}\n`
      message += `   💵 Subtotal: $${item.total}\n\n`
    })

    // Cost Breakdown
    message += `💰 *DESGLOSE DE COSTOS*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `🛒 *Subtotal Productos:* $${subtotal.toFixed(2)}\n`

    if (orderData.deliveryType === "home") {
      message += `🚚 *Costo de Entrega:* $${deliveryFee.toFixed(2)}\n`
      if (orderData.deliveryZone) {
        message += `   📍 (${orderData.deliveryZone.name})\n`
      }
    } else {
      message += `🚚 *Costo de Entrega:* GRATIS (Recogida en tienda)\n`
    }

    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `💵 *TOTAL A PAGAR: $${total.toFixed(2)}*\n\n`

    // Footer
    message += `✅ *Estado:* Pendiente de Confirmación\n`
    if (orderData.deliveryType === "home") {
      message += `⏰ *Tiempo Estimado de Entrega:* 45-60 minutos\n`
    } else {
      message += `⏰ *Tiempo Estimado de Preparación:* 30-45 minutos\n`
    }
    message += `\n📞 *Contacto de la Tienda:* ${storeInfo.phone}\n`
    message += `🏪 *Dirección de la Tienda:* ${storeInfo.address}\n`
    message += `🙏 *¡Gracias por tu pedido!*\n\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `${storeInfo.logo} *${storeInfo.name}* - Tu tienda de confianza\n`
    message += `🖼️ Ver Logo: Logo_black.png`

    return encodeURIComponent(message)
  }

  const handleSendWhatsApp = () => {
    setIsSending(true)

    const message = generateWhatsAppMessage()
    const storeWhatsApp = "5354690878" // Store WhatsApp number
    const whatsappUrl = `https://wa.me/${storeWhatsApp}?text=${message}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Simulate sending delay
    setTimeout(() => {
      setIsSending(false)
      onSuccess()
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Box className="flex items-center space-x-4">
        <Button
          onClick={onBack}
          startIcon={<ArrowBack />}
          variant="outlined"
          color="success"
          size="small"
          sx={{ textTransform: "capitalize" }}
        >
          {t("cart.goBack")}
        </Button>
        <Typography variant="h5" component="h1" fontWeight="bold" className="text-gray-700">
          {t("checkout.confirmOrder")}
        </Typography>
      </Box>

      {/* Order Summary Card */}
      <Card elevation={3}>
        <CardContent className="space-y-4">
          {/* Order Number */}
          <Box className="text-center">
            <Chip
              label={`${t("checkout.orderNumber")}: ${orderData.orderNumber}`}
              color="primary"
              variant="outlined"
              size="medium"
            />
          </Box>

          <Divider />

          {/* Customer Info */}
          <Box>
            <Typography variant="h6" fontWeight="bold" className="mb-2">
              👤 {t("checkout.customerInfo")}
            </Typography>
            <Typography variant="body2">📱 {orderData.whatsapp}</Typography>
            <Typography variant="body2">👨‍💼 {orderData.receiverName}</Typography>
            <Typography variant="body2">🆔 {orderData.idCard}</Typography>
          </Box>

          <Divider />

          {/* Delivery Info */}
          <Box>
            <Typography variant="h6" fontWeight="bold" className="mb-2">
              🚚 {t("checkout.deliveryInfo")}
            </Typography>
            <Typography variant="body2">
              📦 {orderData.deliveryType === "home" ? t("checkout.homeDelivery") : t("checkout.storePickup")}
            </Typography>
            {orderData.deliveryType === "home" ? (
              <>
                <Typography variant="body2">📍 {orderData.address}</Typography>
                {orderData.deliveryZone && <Typography variant="body2">🗺️ {orderData.deliveryZone.name}</Typography>}
              </>
            ) : (
              <>
                <Typography variant="body2">🏪 Calle 23 #456, Santiago de Cuba</Typography>
                <Typography variant="body2">🕒 Lunes a Domingo: 8:00 AM - 8:00 PM</Typography>
              </>
            )}
          </Box>

          <Divider />

          {/* Products */}
          <Box>
            <Typography variant="h6" fontWeight="bold" className="mb-2">
              🛍️ {t("checkout.products")} ({orderData.cartItems.length})
            </Typography>
            {orderData.cartItems.map((item, index) => (
              <Box key={index} className="flex justify-between items-center py-1">
                <Typography variant="body2">
                  {item.name} x{item.quantity}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  ${item.total}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider />

          {/* Cost Breakdown */}
          <Box>
            <Typography variant="h6" fontWeight="bold" className="mb-2">
              💰 {t("checkout.costBreakdown")}
            </Typography>
            <Box className="flex justify-between">
              <Typography variant="body2">{t("cart.subtotal")}:</Typography>
              <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box className="flex justify-between">
              <Typography variant="body2">{t("cart.deliveryCharge")}:</Typography>
              <Typography variant="body2">
                {deliveryFee === 0 ? t("cart.free") : `$${deliveryFee.toFixed(2)}`}
              </Typography>
            </Box>
            <Divider className="my-2" />
            <Box className="flex justify-between">
              <Typography variant="h6" fontWeight="bold">
                {t("cart.total")}:
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="success.main">
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* WhatsApp Send Button */}
      <Button
        fullWidth
        variant="contained"
        color="success"
        size="large"
        startIcon={isSending ? <CheckCircle /> : <WhatsApp />}
        onClick={handleSendWhatsApp}
        disabled={isSending}
        sx={{
          py: 2,
          fontSize: "1.1rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          background: isSending ? "linear-gradient(45deg, #4caf50, #81c784)" : undefined,
        }}
      >
        {isSending ? t("checkout.sendingToWhatsApp") : t("checkout.sendToWhatsApp")}
      </Button>

      {/* Info Text */}
      <Typography variant="body2" color="text.secondary" className="text-center">
        {t("checkout.whatsappInfo")}
      </Typography>
    </div>
  )
}

export default WhatsAppSender
