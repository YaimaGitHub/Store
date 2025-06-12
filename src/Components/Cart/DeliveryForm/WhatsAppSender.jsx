"use client"

import { Button, Typography, Box, Card, CardContent, Divider, Chip } from "@mui/material"
import { WhatsApp, ArrowBack, CheckCircle, Store, LocalShipping } from "@mui/icons-material"
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
      name: "GROCERY STORE",
      phone: "+53 54690878",
      address: "Calle 23 #456, Santiago de Cuba",
      email: "grocery@store.cu",
      website: "www.grocerystore.cu",
    }

    let message = `╔══════════════════════════════════════╗\n`
    message += `║          🏪 ${storeInfo.name}          ║\n`
    message += `║        Tu Tienda de Confianza        ║\n`
    message += `╚══════════════════════════════════════╝\n\n`

    // Order Header with professional styling
    message += `┌─────────────────────────────────────┐\n`
    message += `│           📋 NUEVO PEDIDO           │\n`
    message += `└─────────────────────────────────────┘\n\n`

    message += `🔢 Orden: #${orderData.orderNumber}\n`
    message += `📅 Fecha: ${orderData.orderDate}\n`
    message += `⏰ Estado: 🟡 PENDIENTE DE CONFIRMACIÓN\n\n`

    // Customer Information with enhanced formatting
    message += `┌─────────────────────────────────────┐\n`
    message += `│        👤 DATOS DEL CLIENTE         │\n`
    message += `└─────────────────────────────────────┘\n\n`

    message += `📱 WhatsApp: ${orderData.whatsapp}\n`
    message += `👨‍💼 Recibe: ${orderData.receiverName}\n`
    message += `🆔 CI: ${orderData.idCard}\n\n`

    // Delivery Information with icons and structure
    message += `┌─────────────────────────────────────┐\n`
    message += `│       🚚 INFO DE ENTREGA            │\n`
    message += `└─────────────────────────────────────┘\n\n`

    if (orderData.deliveryType === "home") {
      message += `📦 Modalidad: 🏠 ENTREGA A DOMICILIO\n`
      message += `📍 Dirección: ${orderData.address}\n`
      if (orderData.deliveryZone) {
        message += `🗺️ Zona: ${orderData.deliveryZone.name}\n`
        message += `💰 Costo Zona: $${orderData.deliveryZone.price}\n`
        if (orderData.deliveryZone.isGPS) {
          message += `📡 Ubicación GPS: ✅ ACTIVADA\n`
          message += `📍 Coordenadas: ${orderData.userLocation?.lat.toFixed(6)}, ${orderData.userLocation?.lng.toFixed(6)}\n`
        }
      }
      message += `⏱️ Tiempo Est.: 45-60 minutos\n`
    } else {
      message += `📦 Modalidad: 🏪 RECOGIDA EN TIENDA\n`
      message += `🏢 Dirección: ${storeInfo.address}\n`
      message += `🕒 Horario: Lun-Dom: 8:00 AM - 8:00 PM\n`
      message += `⏱️ Tiempo Est.: 30-45 minutos\n`
    }

    if (orderData.additionalInfo) {
      message += `📝 Notas: ${orderData.additionalInfo}\n`
    }
    message += `\n`

    // Products with enhanced formatting
    message += `┌─────────────────────────────────────┐\n`
    message += `│       🛍️ PRODUCTOS (${orderData.cartItems.length})            │\n`
    message += `└─────────────────────────────────────┘\n\n`

    orderData.cartItems.forEach((item, index) => {
      message += `${index + 1}. 📦 ${item.name}\n`
      message += `   💵 $${item.price} x ${item.quantity}${item.unit}\n`
      message += `   💰 Subtotal: $${item.total}\n`
      message += `   ─────────────────────────\n`
    })

    // Cost breakdown with professional styling
    message += `\n┌─────────────────────────────────────┐\n`
    message += `│        💰 RESUMEN FINANCIERO        │\n`
    message += `└─────────────────────────────────────┘\n\n`

    message += `🛒 Subtotal Productos: $${subtotal.toFixed(2)}\n`

    if (orderData.deliveryType === "home") {
      message += `🚚 Costo Entrega: $${deliveryFee.toFixed(2)}\n`
      if (orderData.deliveryZone) {
        message += `   📍 (${orderData.deliveryZone.name})\n`
      }
    } else {
      message += `🚚 Costo Entrega: 🆓 GRATIS\n`
      message += `   🏪 (Recogida en tienda)\n`
    }

    message += `═══════════════════════════════════════\n`
    message += `💵 TOTAL A PAGAR: $${total.toFixed(2)} USD\n`
    message += `═══════════════════════════════════════\n\n`

    // Contact and store info
    message += `┌─────────────────────────────────────┐\n`
    message += `│         📞 INFORMACIÓN DE CONTACTO   │\n`
    message += `└─────────────────────────────────────┘\n\n`

    message += `📱 WhatsApp: ${storeInfo.phone}\n`
    message += `🏢 Dirección: ${storeInfo.address}\n`
    message += `📧 Email: ${storeInfo.email}\n`
    message += `🌐 Web: ${storeInfo.website}\n\n`

    // Footer with branding
    message += `╔══════════════════════════════════════╗\n`
    message += `║     🙏 ¡GRACIAS POR TU PEDIDO!      ║\n`
    message += `║                                      ║\n`
    message += `║   🏪 ${storeInfo.name}   ║\n`
    message += `║      "Calidad que puedes confiar"    ║\n`
    message += `╚══════════════════════════════════════╝\n\n`

    message += `⚡ Mensaje generado automáticamente\n`
    message += `🤖 Sistema de Pedidos v2.0\n`
    message += `📅 ${new Date().toLocaleString()}`

    return encodeURIComponent(message)
  }

  const handleSendWhatsApp = () => {
    setIsSending(true)

    const message = generateWhatsAppMessage()
    const storeWhatsApp = "5354690878"
    const whatsappUrl = `https://wa.me/${storeWhatsApp}?text=${message}`

    window.open(whatsappUrl, "_blank")

    setTimeout(() => {
      setIsSending(false)
      onSuccess()
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header with animation */}
      <Box
        className="flex items-center space-x-4"
        sx={{
          animation: "slideInFromLeft 0.6s ease-out",
          "@keyframes slideInFromLeft": {
            "0%": { transform: "translateX(-100%)", opacity: 0 },
            "100%": { transform: "translateX(0)", opacity: 1 },
          },
        }}
      >
        <Button
          onClick={onBack}
          startIcon={<ArrowBack />}
          variant="outlined"
          color="success"
          size="small"
          sx={{
            textTransform: "capitalize",
            transition: "all 0.3s ease",
            borderRadius: "12px",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
            },
          }}
        >
          {t("cart.goBack")}
        </Button>
        <Typography variant="h5" component="h1" fontWeight="bold" className="text-gray-700">
          {t("checkout.confirmOrder")}
        </Typography>
      </Box>

      {/* Store Branding */}
      <Card
        elevation={3}
        sx={{
          background: "linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)",
          borderRadius: "16px",
          animation: "fadeInUp 0.8s ease-out",
          "@keyframes fadeInUp": {
            "0%": { transform: "translateY(30px)", opacity: 0 },
            "100%": { transform: "translateY(0)", opacity: 1 },
          },
        }}
      >
        <CardContent className="text-center py-6">
          <Typography variant="h5" fontWeight="bold" color="success.main" className="mb-2">
            🏪 GROCERY STORE
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tu tienda de confianza • Calidad garantizada
          </Typography>
        </CardContent>
      </Card>

      {/* Order Summary Card with enhanced animations */}
      <Card
        elevation={6}
        sx={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          border: "1px solid #e0e0e0",
          borderRadius: "16px",
          animation: "slideInFromRight 0.8s ease-out",
          "@keyframes slideInFromRight": {
            "0%": { transform: "translateX(100%)", opacity: 0 },
            "100%": { transform: "translateX(0)", opacity: 1 },
          },
        }}
      >
        <CardContent className="space-y-6">
          {/* Order Number with animation */}
          <Box
            className="text-center"
            sx={{
              animation: "bounceIn 1s ease-out",
              "@keyframes bounceIn": {
                "0%": { transform: "scale(0.3)", opacity: 0 },
                "50%": { transform: "scale(1.05)" },
                "70%": { transform: "scale(0.9)" },
                "100%": { transform: "scale(1)", opacity: 1 },
              },
            }}
          >
            <Chip
              label={`${t("checkout.orderNumber")}: ${orderData.orderNumber}`}
              color="primary"
              variant="outlined"
              size="large"
              sx={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                padding: "8px 16px",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
                border: "none",
              }}
            />
          </Box>

          <Divider sx={{ borderColor: "#e0e0e0" }} />

          {/* Customer Info with icons and animations */}
          <Box
            sx={{
              animation: "fadeInLeft 0.6s ease-out 0.2s both",
              "@keyframes fadeInLeft": {
                "0%": { transform: "translateX(-30px)", opacity: 0 },
                "100%": { transform: "translateX(0)", opacity: 1 },
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold" className="mb-3 flex items-center">
              👤 {t("checkout.customerInfo")}
            </Typography>
            <Box className="space-y-2 ml-4">
              <Typography variant="body2" className="flex items-center">
                📱 <span className="ml-2 font-medium">{orderData.whatsapp}</span>
              </Typography>
              <Typography variant="body2" className="flex items-center">
                👨‍💼 <span className="ml-2 font-medium">{orderData.receiverName}</span>
              </Typography>
              <Typography variant="body2" className="flex items-center">
                🆔 <span className="ml-2 font-medium">{orderData.idCard}</span>
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#e0e0e0" }} />

          {/* Delivery Info with enhanced styling */}
          <Box
            sx={{
              animation: "fadeInRight 0.6s ease-out 0.4s both",
              "@keyframes fadeInRight": {
                "0%": { transform: "translateX(30px)", opacity: 0 },
                "100%": { transform: "translateX(0)", opacity: 1 },
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold" className="mb-3 flex items-center">
              {orderData.deliveryType === "home" ? <LocalShipping className="mr-2" /> : <Store className="mr-2" />}
              {t("checkout.deliveryInfo")}
            </Typography>
            <Box className="space-y-2 ml-4">
              <Typography variant="body2" className="flex items-center">
                📦{" "}
                <span className="ml-2 font-medium">
                  {orderData.deliveryType === "home" ? t("checkout.homeDelivery") : t("checkout.storePickup")}
                </span>
              </Typography>
              {orderData.deliveryType === "home" ? (
                <>
                  <Typography variant="body2" className="flex items-center">
                    📍 <span className="ml-2">{orderData.address}</span>
                  </Typography>
                  {orderData.deliveryZone && (
                    <Typography variant="body2" className="flex items-center">
                      🗺️ <span className="ml-2">{orderData.deliveryZone.name}</span>
                    </Typography>
                  )}
                </>
              ) : (
                <>
                  <Typography variant="body2" className="flex items-center">
                    🏪 <span className="ml-2">Calle 23 #456, Santiago de Cuba</span>
                  </Typography>
                  <Typography variant="body2" className="flex items-center">
                    🕒 <span className="ml-2">Lunes a Domingo: 8:00 AM - 8:00 PM</span>
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#e0e0e0" }} />

          {/* Products with enhanced display */}
          <Box
            sx={{
              animation: "fadeInUp 0.6s ease-out 0.6s both",
              "@keyframes fadeInUp": {
                "0%": { transform: "translateY(30px)", opacity: 0 },
                "100%": { transform: "translateY(0)", opacity: 1 },
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold" className="mb-3">
              🛍️ {t("checkout.products")} ({orderData.cartItems.length})
            </Typography>
            <Box className="space-y-3">
              {orderData.cartItems.map((item, index) => (
                <Box
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(5px)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ${item.price} × {item.quantity}
                      {item.unit}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    ${item.total}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#e0e0e0" }} />

          {/* Cost Breakdown with enhanced styling */}
          <Box
            sx={{
              animation: "fadeInUp 0.6s ease-out 0.8s both",
            }}
          >
            <Typography variant="h6" fontWeight="bold" className="mb-3">
              💰 {t("checkout.costBreakdown")}
            </Typography>
            <Box className="space-y-2">
              <Box className="flex justify-between p-2 bg-blue-50 rounded">
                <Typography variant="body2">{t("cart.subtotal")}:</Typography>
                <Typography variant="body2" fontWeight="medium">
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Box className="flex justify-between p-2 bg-green-50 rounded">
                <Typography variant="body2">{t("cart.deliveryCharge")}:</Typography>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  color={deliveryFee === 0 ? "success.main" : "text.primary"}
                >
                  {deliveryFee === 0 ? t("cart.free") : `$${deliveryFee.toFixed(2)}`}
                </Typography>
              </Box>
              <Divider className="my-3" />
              <Box
                className="flex justify-between p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg"
                sx={{
                  animation: "glow 2s ease-in-out infinite alternate",
                  "@keyframes glow": {
                    "0%": { boxShadow: "0 0 5px rgba(76, 175, 80, 0.3)" },
                    "100%": { boxShadow: "0 0 20px rgba(76, 175, 80, 0.6)" },
                  },
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {t("cart.total")}:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  ${total.toFixed(2)} USD
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* WhatsApp Send Button with enhanced animation */}
      <Button
        fullWidth
        variant="contained"
        color="success"
        size="large"
        startIcon={isSending ? <CheckCircle /> : <WhatsApp />}
        onClick={handleSendWhatsApp}
        disabled={isSending}
        sx={{
          py: 2.5,
          fontSize: "1.2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          borderRadius: "16px",
          background: isSending
            ? "linear-gradient(45deg, #4caf50, #81c784)"
            : "linear-gradient(45deg, #25D366, #128C7E)",
          boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
          animation: isSending ? "pulse 1s infinite" : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(37, 211, 102, 0.6)",
            background: "linear-gradient(45deg, #128C7E, #25D366)",
          },
          "&:disabled": {
            background: "linear-gradient(45deg, #4caf50, #81c784)",
          },
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.02)" },
            "100%": { transform: "scale(1)" },
          },
        }}
      >
        {isSending ? (
          <span className="flex items-center">
            <CheckCircle className="mr-2 animate-spin" />
            {t("checkout.sendingToWhatsApp")}
          </span>
        ) : (
          <span className="flex items-center">
            <WhatsApp className="mr-2" />
            {t("checkout.sendToWhatsApp")}
          </span>
        )}
      </Button>

      {/* Info Text with animation */}
      <Typography
        variant="body2"
        color="text.secondary"
        className="text-center"
        sx={{
          animation: "fadeIn 1s ease-out 1s both",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        {t("checkout.whatsappInfo")}
      </Typography>
    </div>
  )
}

export default WhatsAppSender
