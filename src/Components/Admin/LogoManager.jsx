"use client"

import { useState } from "react"
import { Box, Typography, Button, TextField, Paper, Alert } from "@mui/material"
import { CloudUpload } from "@mui/icons-material"
import { useAdmin } from "../../contexts/AdminContext"

const LogoManager = () => {
  const { adminSettings, updateAdminSettings } = useAdmin()
  const [logoUrl, setLogoUrl] = useState(adminSettings.logo || "/src/assets/logo.svg")
  const [success, setSuccess] = useState(false)

  const handleSave = () => {
    updateAdminSettings({ logo: logoUrl })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión del Logo
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Logo actualizado correctamente
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Logo Actual
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src={logoUrl || "/src/assets/logo.svg"}
            alt="Logo actual"
            style={{ maxHeight: "100px", maxWidth: "200px" }}
          />
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Cambiar Logo
        </Typography>

        <TextField
          fullWidth
          label="URL del Logo"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button component="label" variant="outlined" startIcon={<CloudUpload />} sx={{ mb: 2, mr: 2 }}>
          Subir Archivo
          <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
        </Button>

        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mb: 2 }}>
          Guardar Cambios
        </Button>
      </Paper>
    </Box>
  )
}

export default LogoManager
