"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Paper,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Button,
  Alert,
} from "@mui/material"
import { useAdmin } from "../../contexts/AdminContext"

const DeliveryManager = () => {
  const { adminSettings, updateAdminSettings } = useAdmin()
  const [deliveryCharge, setDeliveryCharge] = useState(adminSettings.deliveryCharge)
  const [deliveryOptions, setDeliveryOptions] = useState(adminSettings.deliveryOptions)
  const [success, setSuccess] = useState(false)

  const handleSave = () => {
    updateAdminSettings({
      deliveryCharge: Number.parseFloat(deliveryCharge),
      deliveryOptions,
    })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleDeliveryOptionChange = (option, value) => {
    setDeliveryOptions((prev) => ({
      ...prev,
      [option]: value,
    }))
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de Entrega
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Configuración de entrega actualizada correctamente
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Cargo de Entrega
        </Typography>
        <TextField
          fullWidth
          label="Cargo de Entrega ($)"
          type="number"
          value={deliveryCharge}
          onChange={(e) => setDeliveryCharge(e.target.value)}
          inputProps={{ min: 0, step: 0.01 }}
          sx={{ mb: 2 }}
        />
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Opciones de Entrega
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={deliveryOptions.homeDelivery}
              onChange={(e) => handleDeliveryOptionChange("homeDelivery", e.target.checked)}
            />
          }
          label="Entrega a Domicilio"
          sx={{ mb: 2, display: "block" }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={deliveryOptions.storePickup}
              onChange={(e) => handleDeliveryOptionChange("storePickup", e.target.checked)}
            />
          }
          label="Recogida en Tienda"
          sx={{ mb: 2, display: "block" }}
        />

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Opción por Defecto</FormLabel>
          <RadioGroup
            value={deliveryOptions.defaultOption}
            onChange={(e) => handleDeliveryOptionChange("defaultOption", e.target.value)}
          >
            <FormControlLabel
              value="homeDelivery"
              control={<Radio />}
              label="Entrega a Domicilio"
              disabled={!deliveryOptions.homeDelivery}
            />
            <FormControlLabel
              value="storePickup"
              control={<Radio />}
              label="Recogida en Tienda"
              disabled={!deliveryOptions.storePickup}
            />
          </RadioGroup>
        </FormControl>
      </Paper>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Guardar Cambios
      </Button>
    </Box>
  )
}

export default DeliveryManager
