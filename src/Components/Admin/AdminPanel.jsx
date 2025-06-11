"use client"

import { useState } from "react"
import { Container, Tabs, Tab, Box, Typography, Paper } from "@mui/material"
import { useAdmin } from "../../contexts/AdminContext"
import LogoManager from "./LogoManager"
import ProductManager from "./ProductManager"
import DeliveryManager from "./DeliveryManager"
import AboutManager from "./AboutManager"
import SliderManager from "./SliderManager"
import ServiceManager from "./ServiceManager"
import ReviewManager from "./ReviewManager"
import WhatsAppManager from "./WhatsAppManager"
import { useLanguage } from "../../contexts/LanguageContext"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const AdminPanel = () => {
  const [tabValue, setTabValue] = useState(0)
  const { isAdmin } = useAdmin()
  const { t } = useLanguage()

  // Scrolling Bug Fixed
  window.scroll({ top: 0 })

  if (!isAdmin) {
    return (
      <Container sx={{ pt: 12, textAlign: "center" }}>
        <Typography variant="h4">Acceso Denegado</Typography>
        <Typography>No tienes permisos para acceder a esta página.</Typography>
      </Container>
    )
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <Container>
        <Paper elevation={3} sx={{ mt: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h4" sx={{ p: 3, textAlign: "center", color: "primary.main" }}>
              Panel de Administración
            </Typography>
            <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ px: 2 }}>
              <Tab label="Logo" />
              <Tab label="Productos" />
              <Tab label="Entrega" />
              <Tab label="Acerca de" />
              <Tab label="Slider" />
              <Tab label="Servicios" />
              <Tab label="Reseñas" />
              <Tab label="WhatsApp" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <LogoManager />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ProductManager />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <DeliveryManager />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <AboutManager />
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <SliderManager />
          </TabPanel>
          <TabPanel value={tabValue} index={5}>
            <ServiceManager />
          </TabPanel>
          <TabPanel value={tabValue} index={6}>
            <ReviewManager />
          </TabPanel>
          <TabPanel value={tabValue} index={7}>
            <WhatsAppManager />
          </TabPanel>
        </Paper>
      </Container>
    </div>
  )
}

export default AdminPanel
