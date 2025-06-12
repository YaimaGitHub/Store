"use client"

import { Button, TextField, Typography, Box, Autocomplete, Card, CardContent, Chip, Zoom } from "@mui/material"
import { ArrowBack, LocationOn, MyLocation, Store, Home } from "@mui/icons-material"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { useLanguage } from "../../../contexts/LanguageContext"
import PhoneInput from "./PhoneInput"

const DeliveryDetailsForm = ({ deliveryType, onSubmit, onBack, onZoneSelect, selectedZone }) => {
  const { t } = useLanguage()
  const [userLocation, setUserLocation] = useState(null)
  const [locationMethod, setLocationMethod] = useState("manual")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm()

  // Santiago de Cuba zones with delivery prices
  const santiagoZones = [
    { name: "Centro Histórico", price: 2.0, description: "Zona céntrica de la ciudad" },
    { name: "Reparto Sueño", price: 3.0, description: "Zona residencial norte" },
    { name: "Vista Alegre", price: 3.5, description: "Zona residencial este" },
    { name: "Altamira", price: 4.0, description: "Zona residencial sur" },
    { name: "San Pedrito", price: 2.5, description: "Zona céntrica oeste" },
    { name: "Reparto Terrazas", price: 3.5, description: "Zona residencial noreste" },
    { name: "Los Olmos", price: 4.5, description: "Zona periférica norte" },
    { name: "Reparto Flores", price: 3.0, description: "Zona residencial central" },
    { name: "Micro 9", price: 5.0, description: "Zona periférica este" },
    { name: "Micro 10", price: 5.5, description: "Zona periférica sureste" },
    { name: "Micro 11", price: 6.0, description: "Zona periférica sur" },
    { name: "Abel Santamaría", price: 4.0, description: "Zona residencial oeste" },
    { name: "30 de Noviembre", price: 3.5, description: "Zona residencial noroeste" },
    { name: "José Martí", price: 2.5, description: "Zona céntrica norte" },
    { name: "Frank País", price: 4.5, description: "Zona residencial suroeste" },
  ]

  // Store location (Santiago de Cuba center)
  const storeLocation = { lat: 20.0247, lng: -75.8219 }

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          setLocationMethod("gps")

          // Calculate distance to store
          const distance = calculateDistance(latitude, longitude, storeLocation.lat, storeLocation.lng)

          // Calculate delivery price based on distance ($2 base + $1 per km)
          const calculatedPrice = Math.max(2, Math.round(2 + distance))
          const gpsZone = {
            name: `📍 Ubicación GPS`,
            price: calculatedPrice,
            isGPS: true,
            distance: distance,
            coordinates: { lat: latitude, lng: longitude },
            description: `Distancia: ${distance.toFixed(1)} km desde la tienda`,
          }

          onZoneSelect(gpsZone)
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          alert(t("checkout.locationError"))
          setIsLoadingLocation(false)
        },
      )
    } else {
      alert(t("checkout.geolocationNotSupported"))
      setIsLoadingLocation(false)
    }
  }

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  const onFormSubmit = (data) => {
    onSubmit({
      ...data,
      locationMethod,
      userLocation,
    })
  }

  return (
    <Box
      sx={{
        animation: "slideInFromBottom 0.8s ease-out",
        "@keyframes slideInFromBottom": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      }}
    >
      <div className="space-y-8">
        {/* Header with enhanced styling */}
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
            size="medium"
            sx={{
              textTransform: "capitalize",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
              },
            }}
          >
            {t("cart.goBack")}
          </Button>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold" className="flex items-center">
              {deliveryType === "home" ? <Home className="mr-2" /> : <Store className="mr-2" />}
              {deliveryType === "home" ? t("checkout.homeDeliveryDetails") : t("checkout.pickupDetails")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {deliveryType === "home"
                ? "Completa los datos para la entrega a domicilio"
                : "Completa los datos para recoger en tienda"}
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          {/* WhatsApp Number */}
          <Card
            elevation={3}
            sx={{
              borderRadius: "16px",
              animation: "fadeInUp 0.6s ease-out 0.1s both",
              "@keyframes fadeInUp": {
                "0%": { transform: "translateY(30px)", opacity: 0 },
                "100%": { transform: "translateY(0)", opacity: 1 },
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" className="mb-4 flex items-center">
                📱 {t("checkout.whatsappNumber")}
              </Typography>
              <Controller
                name="whatsapp"
                control={control}
                rules={{ required: t("checkout.whatsappRequired") }}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value || ""}
                    onChange={field.onChange}
                    error={!!errors.whatsapp}
                    helperText={errors.whatsapp?.message}
                  />
                )}
              />
            </CardContent>
          </Card>

          {/* Who receives the order */}
          <Card
            elevation={3}
            sx={{
              borderRadius: "16px",
              animation: "fadeInUp 0.6s ease-out 0.2s both",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" className="mb-4 flex items-center">
                👨‍💼 {t("checkout.whoReceives")}
              </Typography>
              <TextField
                {...register("receiverName", {
                  required: t("checkout.receiverNameRequired"),
                })}
                fullWidth
                placeholder={t("checkout.receiverNamePlaceholder")}
                error={!!errors.receiverName}
                helperText={errors.receiverName?.message}
                variant="outlined"
                size="large"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* ID Card Number */}
          <Card
            elevation={3}
            sx={{
              borderRadius: "16px",
              animation: "fadeInUp 0.6s ease-out 0.3s both",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" className="mb-4 flex items-center">
                🆔 {t("checkout.idCardNumber")}
              </Typography>
              <TextField
                {...register("idCard", {
                  required: t("checkout.idCardRequired"),
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: t("checkout.idCardPattern"),
                  },
                })}
                fullWidth
                placeholder={t("checkout.idCardPlaceholder")}
                error={!!errors.idCard}
                helperText={errors.idCard?.message}
                variant="outlined"
                size="large"
                inputProps={{
                  maxLength: 11,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Address for home delivery */}
          {deliveryType === "home" && (
            <>
              <Card
                elevation={3}
                sx={{
                  borderRadius: "16px",
                  animation: "fadeInUp 0.6s ease-out 0.4s both",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" className="mb-4 flex items-center">
                    📍 {t("checkout.exactAddress")}
                  </Typography>
                  <TextField
                    {...register("address", {
                      required: t("checkout.addressRequired"),
                    })}
                    fullWidth
                    multiline
                    rows={3}
                    placeholder={t("checkout.addressPlaceholder")}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                </CardContent>
              </Card>

              {/* Delivery Zone Selection */}
              <Card
                elevation={3}
                sx={{
                  borderRadius: "16px",
                  animation: "fadeInUp 0.6s ease-out 0.5s both",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" className="mb-4 flex items-center">
                    🗺️ {t("checkout.deliveryZone")}
                  </Typography>

                  {/* Location Method Selector */}
                  <Box className="mb-6">
                    <Typography variant="body2" color="text.secondary" className="mb-3">
                      Selecciona cómo quieres elegir tu zona de entrega:
                    </Typography>
                    <Box className="flex gap-4">
                      <Button
                        variant={locationMethod === "manual" ? "contained" : "outlined"}
                        color="success"
                        onClick={() => {
                          setLocationMethod("manual")
                          setUserLocation(null)
                          onZoneSelect(null)
                        }}
                        size="medium"
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                        startIcon={<LocationOn />}
                      >
                        {t("checkout.selectManually")}
                      </Button>
                      <Button
                        variant={locationMethod === "gps" ? "contained" : "outlined"}
                        color="success"
                        onClick={getCurrentLocation}
                        disabled={isLoadingLocation}
                        startIcon={isLoadingLocation ? <MyLocation className="animate-spin" /> : <MyLocation />}
                        size="medium"
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        {isLoadingLocation ? "Obteniendo..." : t("checkout.useGPS")}
                      </Button>
                    </Box>
                  </Box>

                  {/* Manual Zone Selection */}
                  {locationMethod === "manual" && (
                    <Zoom in={true}>
                      <Box>
                        <Controller
                          name="deliveryZone"
                          control={control}
                          rules={{ required: t("checkout.zoneRequired") }}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              options={santiagoZones}
                              getOptionLabel={(option) => `${option.name} - $${option.price}`}
                              renderOption={(props, option) => (
                                <Box component="li" {...props} sx={{ p: 2 }}>
                                  <Box sx={{ width: "100%" }}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 1,
                                      }}
                                    >
                                      <Typography variant="body1" fontWeight="medium">
                                        📍 {option.name}
                                      </Typography>
                                      <Chip
                                        label={`$${option.price}`}
                                        color="success"
                                        size="small"
                                        sx={{ fontWeight: "bold" }}
                                      />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                      {option.description}
                                    </Typography>
                                  </Box>
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder={t("checkout.selectZone")}
                                  error={!!errors.deliveryZone}
                                  helperText={errors.deliveryZone?.message}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                    },
                                  }}
                                />
                              )}
                              onChange={(_, value) => {
                                field.onChange(value)
                                onZoneSelect(value)
                              }}
                              ListboxProps={{
                                style: {
                                  maxHeight: "300px",
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Zoom>
                  )}

                  {/* GPS Location Display */}
                  {locationMethod === "gps" && userLocation && selectedZone && (
                    <Zoom in={true}>
                      <Card
                        sx={{
                          background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                          border: "2px solid #4caf50",
                          borderRadius: "12px",
                          animation: "gpsGlow 2s ease-in-out infinite alternate",
                          "@keyframes gpsGlow": {
                            "0%": { boxShadow: "0 0 5px rgba(76, 175, 80, 0.3)" },
                            "100%": { boxShadow: "0 0 20px rgba(76, 175, 80, 0.6)" },
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="h6" color="success.main" className="flex items-center mb-2">
                            <MyLocation className="mr-2" />
                            {t("checkout.locationDetected")}
                          </Typography>
                          <Box className="space-y-2">
                            <Typography variant="body1" fontWeight="medium">
                              📍 {selectedZone.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {selectedZone.description}
                            </Typography>
                            <Box className="flex justify-between items-center">
                              <Typography variant="body2" color="success.main" fontWeight="bold">
                                💰 Costo de entrega: ${selectedZone.price}
                              </Typography>
                              <Chip label={`${selectedZone.distance?.toFixed(1)} km`} color="primary" size="small" />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              📍 Coordenadas: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Zoom>
                  )}

                  {/* Show selected zone cost */}
                  {selectedZone && !selectedZone.isGPS && (
                    <Zoom in={true}>
                      <Card
                        sx={{
                          mt: 3,
                          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                          border: "1px solid #2196f3",
                          borderRadius: "12px",
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="body1" color="primary" fontWeight="bold" className="mb-1">
                            📍 {t("checkout.selectedZone")}: {selectedZone.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" className="mb-2">
                            {selectedZone.description}
                          </Typography>
                          <Typography variant="h6" color="success.main" fontWeight="bold">
                            💰 {t("checkout.deliveryPrice")}: ${selectedZone.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Zoom>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Store Information for Pickup */}
          {deliveryType === "pickup" && (
            <Card
              elevation={3}
              sx={{
                borderRadius: "16px",
                background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                border: "1px solid #2196f3",
                animation: "fadeInUp 0.6s ease-out 0.4s both",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" className="mb-4 flex items-center">
                  🏪 {t("checkout.storeInformation")}
                </Typography>
                <Box className="space-y-3">
                  <Typography variant="body1" className="flex items-center">
                    📍 <strong className="ml-2">{t("checkout.storeAddress")}:</strong>
                    <span className="ml-2">Calle 23 #456, Santiago de Cuba</span>
                  </Typography>
                  <Typography variant="body1" className="flex items-center">
                    🕒 <strong className="ml-2">{t("checkout.storeHours")}:</strong>
                    <span className="ml-2">Lunes a Domingo: 8:00 AM - 8:00 PM</span>
                  </Typography>
                  <Typography variant="body1" className="flex items-center">
                    📞 <strong className="ml-2">{t("checkout.storePhone")}:</strong>
                    <span className="ml-2">+53 54690878</span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Additional Information */}
          <Card
            elevation={3}
            sx={{
              borderRadius: "16px",
              animation: "fadeInUp 0.6s ease-out 0.6s both",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" className="mb-4 flex items-center">
                📝 {t("checkout.additionalInfo")}
              </Typography>
              <TextField
                {...register("additionalInfo")}
                fullWidth
                multiline
                rows={4}
                placeholder={t("checkout.additionalInfoPlaceholder")}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Box
            sx={{
              animation: "fadeInUp 0.6s ease-out 0.7s both",
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              size="large"
              sx={{
                py: 2.5,
                fontSize: "1.2rem",
                fontWeight: "bold",
                textTransform: "capitalize",
                borderRadius: "16px",
                background: "linear-gradient(45deg, #2e7d32, #4caf50)",
                boxShadow: "0 4px 15px rgba(46, 125, 50, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(46, 125, 50, 0.6)",
                  background: "linear-gradient(45deg, #1b5e20, #2e7d32)",
                },
              }}
            >
              🚀 {t("checkout.placeOrder")}
            </Button>
          </Box>
        </form>
      </div>
    </Box>
  )
}

export default DeliveryDetailsForm
