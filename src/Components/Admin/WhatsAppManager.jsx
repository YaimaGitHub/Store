"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material"
import { WhatsApp, Verified } from "@mui/icons-material"
import { useAdmin } from "../../contexts/AdminContext"

const countryCodes = [
  { code: "+1", country: "Estados Unidos/Canadá", flag: "🇺🇸" },
  { code: "+34", country: "España", flag: "🇪🇸" },
  { code: "+52", country: "México", flag: "🇲🇽" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+55", country: "Brasil", flag: "🇧🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+51", country: "Perú", flag: "🇵🇪" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { code: "+53", country: "Cuba", flag: "🇨🇺" },
  { code: "+507", country: "Panamá", flag: "🇵🇦" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
  { code: "+503", country: "El Salvador", flag: "🇸🇻" },
  { code: "+502", country: "Guatemala", flag: "🇬🇹" },
  { code: "+504", country: "Honduras", flag: "🇭🇳" },
  { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
  { code: "+1809", country: "República Dominicana", flag: "🇩🇴" },
  { code: "+1787", country: "Puerto Rico", flag: "🇵🇷" },
]

const WhatsAppManager = () => {
  const { adminSettings, updateAdminSettings } = useAdmin()
  const [countryCode, setCountryCode] = useState(adminSettings.countryCode || "+1")
  const [phoneNumber, setPhoneNumber] = useState(
    adminSettings.whatsappNumber?.replace(adminSettings.countryCode || "+1", "") || "",
  )
  const [isVerified, setIsVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState("")
  const [success, setSuccess] = useState(false)

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleSendVerification = () => {
    const code = generateVerificationCode()
    setSentCode(code)
    // Simular envío de código
    alert(`Código de verificación enviado: ${code} (En producción se enviaría por SMS)`)
  }

  const handleVerifyCode = () => {
    if (verificationCode === sentCode) {
      setIsVerified(true)
      alert("Número verificado correctamente")
    } else {
      alert("Código incorrecto")
    }
  }

  const handleSave = () => {
    if (!isVerified) {
      alert("Debe verificar el número antes de guardar")
      return
    }

    const fullNumber = countryCode + phoneNumber
    updateAdminSettings({
      whatsappNumber: fullNumber,
      countryCode: countryCode,
    })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const formatPhoneNumber = (number) => {
    // Formato básico para mostrar el número
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de WhatsApp
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Número de WhatsApp actualizado correctamente
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Configuración del Número de WhatsApp
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Código de País</InputLabel>
            <Select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} label="Código de País">
              {countryCodes.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.flag} {country.code} - {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Número de Teléfono"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              setPhoneNumber(value)
              setIsVerified(false)
            }}
            placeholder="1234567890"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WhatsApp color="success" />
                </InputAdornment>
              ),
              endAdornment: isVerified && (
                <InputAdornment position="end">
                  <Verified color="success" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Número completo: {countryCode} {formatPhoneNumber(phoneNumber)}
        </Typography>

        {!isVerified && phoneNumber && (
          <Box sx={{ mb: 2 }}>
            <Button variant="outlined" onClick={handleSendVerification} sx={{ mr: 2 }}>
              Enviar Código de Verificación
            </Button>

            {sentCode && (
              <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
                <TextField
                  label="Código de Verificación"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                />
                <Button variant="contained" onClick={handleVerifyCode}>
                  Verificar
                </Button>
              </Box>
            )}
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!isVerified}
          startIcon={<WhatsApp />}
        >
          Guardar Número de WhatsApp
        </Button>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • El número de WhatsApp se utilizará para contacto directo con los clientes • Es necesario verificar el número
          antes de guardarlo • El código de verificación es simulado en esta demo • En producción, se enviaría un SMS
          real al número proporcionado
        </Typography>
      </Paper>
    </Box>
  )
}

export default WhatsAppManager
