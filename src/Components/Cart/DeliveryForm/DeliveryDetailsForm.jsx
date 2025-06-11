"use client"

import { Button, TextField, Typography, Box, Autocomplete } from "@mui/material"
import { ArrowBack, LocationOn } from "@mui/icons-material"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { useLanguage } from "../../../contexts/LanguageContext"
import PhoneInput from "./PhoneInput"

const DeliveryDetailsForm = ({ deliveryType, onSubmit, onBack, onZoneSelect, selectedZone }) => {
  const { t } = useLanguage()
  const [userLocation, setUserLocation] = useState(null)
  const [locationMethod, setLocationMethod] = useState("manual") // 'manual' or 'gps'

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm()

  // Santiago de Cuba zones with delivery prices
  const santiagoZones = [
    { name: "Centro Histórico", price: 2.0 },
    { name: "Reparto Sueño", price: 3.0 },
    { name: "Vista Alegre", price: 3.5 },
    { name: "Altamira", price: 4.0 },
    { name: "San Pedrito", price: 2.5 },
    { name: "Reparto Terrazas", price: 3.5 },
    { name: "Los Olmos", price: 4.5 },
    { name: "Reparto Flores", price: 3.0 },
    { name: "Micro 9", price: 5.0 },
    { name: "Micro 10", price: 5.5 },
  ]

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          setLocationMethod("gps")

          // Calculate distance to store (example coordinates for Santiago de Cuba)
          const storeLocation = { lat: 20.0247, lng: -75.8219 } // Santiago de Cuba center
          const distance = calculateDistance(latitude, longitude, storeLocation.lat, storeLocation.lng)

          // Calculate delivery price based on distance (example: $1 per km, minimum $2)
          const calculatedPrice = Math.max(2, Math.ceil(distance))
          const gpsZone = {
            name: `Ubicación GPS (${distance.toFixed(1)} km)`,
            price: calculatedPrice,
            isGPS: true,
            coordinates: { lat: latitude, lng: longitude },
          }

          onZoneSelect(gpsZone)
        },
        (error) => {
          console.error("Error getting location:", error)
          alert(t("checkout.locationError"))
        },
      )
    } else {
      alert(t("checkout.geolocationNotSupported"))
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
          {deliveryType === "home" ? t("checkout.homeDeliveryDetails") : t("checkout.pickupDetails")}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* WhatsApp Number */}
        <Box>
          <Typography variant="body1" fontWeight="medium" className="mb-2">
            {t("checkout.whatsappNumber")}
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
        </Box>

        {/* Who receives the order */}
        <Box>
          <Typography variant="body1" fontWeight="medium" className="mb-2">
            {t("checkout.whoReceives")}
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
            size="medium"
          />
        </Box>

        {/* ID Card Number */}
        <Box>
          <Typography variant="body1" fontWeight="medium" className="mb-2">
            {t("checkout.idCardNumber")}
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
            size="medium"
            inputProps={{
              maxLength: 11,
            }}
          />
        </Box>

        {/* Address for home delivery */}
        {deliveryType === "home" && (
          <>
            <Box>
              <Typography variant="body1" fontWeight="medium" className="mb-2">
                {t("checkout.exactAddress")}
              </Typography>
              <TextField
                {...register("address", {
                  required: t("checkout.addressRequired"),
                })}
                fullWidth
                multiline
                rows={2}
                placeholder={t("checkout.addressPlaceholder")}
                error={!!errors.address}
                helperText={errors.address?.message}
                variant="outlined"
              />
            </Box>

            {/* Delivery Zone Selection */}
            <Box>
              <Typography variant="body1" fontWeight="medium" className="mb-3">
                {t("checkout.deliveryZone")}
              </Typography>

              {/* Location Method Selector */}
              <Box className="mb-4 space-y-2">
                <Button
                  variant={locationMethod === "manual" ? "contained" : "outlined"}
                  color="success"
                  onClick={() => {
                    setLocationMethod("manual")
                    setUserLocation(null)
                    onZoneSelect(null)
                  }}
                  size="small"
                  sx={{ mr: 2, textTransform: "capitalize" }}
                >
                  {t("checkout.selectManually")}
                </Button>
                <Button
                  variant={locationMethod === "gps" ? "contained" : "outlined"}
                  color="success"
                  onClick={getCurrentLocation}
                  startIcon={<LocationOn />}
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                >
                  {t("checkout.useGPS")}
                </Button>
              </Box>

              {/* Manual Zone Selection */}
              {locationMethod === "manual" && (
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
                        <Box component="li" {...props}>
                          <Box>
                            <Typography variant="body1">{option.name}</Typography>
                            <Typography variant="caption" color="success.main">
                              {t("checkout.deliveryPrice")}: ${option.price}
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
                        />
                      )}
                      onChange={(_, value) => {
                        field.onChange(value)
                        onZoneSelect(value)
                      }}
                    />
                  )}
                />
              )}

              {/* GPS Location Display */}
              {locationMethod === "gps" && userLocation && selectedZone && (
                <Box className="p-4 bg-green-50 rounded-lg">
                  <Typography variant="body2" color="success.main" className="flex items-center">
                    <LocationOn className="mr-2" />
                    {t("checkout.locationDetected")}
                  </Typography>
                  <Typography variant="body2" className="mt-1">
                    {selectedZone.name}
                  </Typography>
                  <Typography variant="body2" color="success.main" className="font-semibold">
                    {t("checkout.deliveryPrice")}: ${selectedZone.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}
                  </Typography>
                </Box>
              )}

              {/* Show selected zone cost */}
              {selectedZone && (
                <Box className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <Typography variant="body2" color="primary" className="font-semibold">
                    📍 {t("checkout.selectedZone")}: {selectedZone.name}
                  </Typography>
                  <Typography variant="body2" color="success.main" className="font-bold">
                    💰 {t("checkout.deliveryPrice")}: ${selectedZone.price}
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}

        {/* Store Information for Pickup */}
        {deliveryType === "pickup" && (
          <Box className="p-4 bg-blue-50 rounded-lg">
            <Typography variant="h6" fontWeight="bold" className="mb-2">
              🏪 {t("checkout.storeInformation")}
            </Typography>
            <Typography variant="body2" className="mb-1">
              📍 <strong>{t("checkout.storeAddress")}:</strong> Calle 23 #456, Santiago de Cuba
            </Typography>
            <Typography variant="body2" className="mb-1">
              🕒 <strong>{t("checkout.storeHours")}:</strong> Lunes a Domingo: 8:00 AM - 8:00 PM
            </Typography>
            <Typography variant="body2">
              📞 <strong>{t("checkout.storePhone")}:</strong> +53 54690878
            </Typography>
          </Box>
        )}

        {/* Additional Information */}
        <Box>
          <Typography variant="body1" fontWeight="medium" className="mb-2">
            {t("checkout.additionalInfo")}
          </Typography>
          <TextField
            {...register("additionalInfo")}
            fullWidth
            multiline
            rows={3}
            placeholder={t("checkout.additionalInfoPlaceholder")}
            variant="outlined"
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          size="large"
          sx={{
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {t("checkout.placeOrder")}
        </Button>
      </form>
    </div>
  )
}

export default DeliveryDetailsForm
