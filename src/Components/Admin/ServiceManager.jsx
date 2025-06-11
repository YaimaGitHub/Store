"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Alert,
} from "@mui/material"
import { Edit, Delete, Add } from "@mui/icons-material"
import { useAdmin } from "../../contexts/AdminContext"

function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>
}

const ServiceManager = () => {
  const { adminSettings, updateAdminSettings } = useAdmin()
  const [services, setServices] = useState(adminSettings.services)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [success, setSuccess] = useState(false)

  const [serviceForm, setServiceForm] = useState({
    name: { es: "", en: "" },
    icon: "",
  })

  const handleEditService = (index, service) => {
    setEditingService(index)
    setServiceForm({
      name: service.name,
      icon: service.icon,
    })
    setOpenDialog(true)
  }

  const handleAddService = () => {
    setEditingService(null)
    setServiceForm({
      name: { es: "", en: "" },
      icon: "",
    })
    setOpenDialog(true)
  }

  const handleSaveService = () => {
    const newServices = [...services]

    if (editingService !== null) {
      newServices[editingService] = {
        ...newServices[editingService],
        ...serviceForm,
      }
    } else {
      const newId = Math.max(...services.map((s) => s.id)) + 1
      newServices.push({
        id: newId,
        ...serviceForm,
      })
    }

    setServices(newServices)
    updateAdminSettings({ services: newServices })
    setOpenDialog(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleDeleteService = (index) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      const newServices = services.filter((_, i) => i !== index)
      setServices(newServices)
      updateAdminSettings({ services: newServices })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de Servicios
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Servicios actualizados correctamente
        </Alert>
      )}

      <Button variant="contained" startIcon={<Add />} onClick={handleAddService} sx={{ mb: 3 }}>
        Agregar Servicio
      </Button>

      <Grid container spacing={2}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <img
                    src={service.icon || "/placeholder.svg"}
                    alt={service.name.es}
                    style={{ width: 40, height: 40, marginRight: 16 }}
                  />
                  <Typography variant="h6" component="div">
                    {service.name.es}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  EN: {service.name.en}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => handleEditService(index, service)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteService(index)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingService !== null ? "Editar Servicio" : "Agregar Servicio"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="URL del Icono"
            value={serviceForm.icon}
            onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />

          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
            <Tab label="Español" />
            <Tab label="English" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <TextField
              fullWidth
              label="Nombre del Servicio (Español)"
              value={serviceForm.name.es}
              onChange={(e) =>
                setServiceForm({
                  ...serviceForm,
                  name: { ...serviceForm.name, es: e.target.value },
                })
              }
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TextField
              fullWidth
              label="Service Name (English)"
              value={serviceForm.name.en}
              onChange={(e) =>
                setServiceForm({
                  ...serviceForm,
                  name: { ...serviceForm.name, en: e.target.value },
                })
              }
            />
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveService} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ServiceManager
