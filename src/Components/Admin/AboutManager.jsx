"use client"

import { useState } from "react"
import { Box, Typography, TextField, Paper, Tabs, Tab, Button, Alert } from "@mui/material"
import { useAdmin } from "../../contexts/AdminContext"

function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>
}

const AboutManager = () => {
  const { adminSettings, updateAdminSettings } = useAdmin()
  const [tabValue, setTabValue] = useState(0)
  const [aboutText, setAboutText] = useState(adminSettings.aboutText)
  const [success, setSuccess] = useState(false)

  const handleSave = () => {
    updateAdminSettings({ aboutText })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleTextChange = (language, field, value) => {
    setAboutText((prev) => ({
      ...prev,
      [language]: {
        ...prev[language],
        [field]: value,
      },
    }))
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de Contenido "Acerca de"
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Contenido actualizado correctamente
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Español" />
          <Tab label="English" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <TextField
            fullWidth
            label="Título"
            value={aboutText.es.title}
            onChange={(e) => handleTextChange("es", "title", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Contenido 1"
            value={aboutText.es.content1}
            onChange={(e) => handleTextChange("es", "content1", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Contenido 2"
            value={aboutText.es.content2}
            onChange={(e) => handleTextChange("es", "content2", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Contenido 3"
            value={aboutText.es.content3}
            onChange={(e) => handleTextChange("es", "content3", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Contenido 4"
            value={aboutText.es.content4}
            onChange={(e) => handleTextChange("es", "content4", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Contenido 5"
            value={aboutText.es.content5}
            onChange={(e) => handleTextChange("es", "content5", e.target.value)}
            sx={{ mb: 2 }}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TextField
            fullWidth
            label="Title"
            value={aboutText.en.title}
            onChange={(e) => handleTextChange("en", "title", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Content 1"
            value={aboutText.en.content1}
            onChange={(e) => handleTextChange("en", "content1", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Content 2"
            value={aboutText.en.content2}
            onChange={(e) => handleTextChange("en", "content2", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Content 3"
            value={aboutText.en.content3}
            onChange={(e) => handleTextChange("en", "content3", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Content 4"
            value={aboutText.en.content4}
            onChange={(e) => handleTextChange("en", "content4", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Content 5"
            value={aboutText.en.content5}
            onChange={(e) => handleTextChange("en", "content5", e.target.value)}
            sx={{ mb: 2 }}
          />
        </TabPanel>

        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
          Guardar Cambios
        </Button>
      </Paper>
    </Box>
  )
}

export default AboutManager
