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
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material"
import { Edit, Delete, Add } from "@mui/icons-material"
import { useAdmin } from "../../contexts/AdminContext"

const SliderManager = () => {
  const { adminSettings, updateAdminSettings } = useAdmin()
  const [sliderImages, setSliderImages] = useState(adminSettings.sliderImages)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)
  const [success, setSuccess] = useState(false)

  const [slideForm, setSlideForm] = useState({
    background: "",
    image: "",
    title: "",
    subtitle: "",
  })

  const handleEditSlide = (index, slide) => {
    setEditingSlide(index)
    setSlideForm({
      background: slide.background,
      image: slide.image,
      title: slide.title,
      subtitle: slide.subtitle,
    })
    setOpenDialog(true)
  }

  const handleAddSlide = () => {
    setEditingSlide(null)
    setSlideForm({
      background: "",
      image: "",
      title: "",
      subtitle: "",
    })
    setOpenDialog(true)
  }

  const handleSaveSlide = () => {
    const newSlides = [...sliderImages]

    if (editingSlide !== null) {
      newSlides[editingSlide] = {
        ...newSlides[editingSlide],
        ...slideForm,
      }
    } else {
      const newId = Math.max(...sliderImages.map((s) => s.id)) + 1
      newSlides.push({
        id: newId,
        ...slideForm,
      })
    }

    setSliderImages(newSlides)
    updateAdminSettings({ sliderImages: newSlides })
    setOpenDialog(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleDeleteSlide = (index) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
      const newSlides = sliderImages.filter((_, i) => i !== index)
      setSliderImages(newSlides)
      updateAdminSettings({ sliderImages: newSlides })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión del Slider
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Slider actualizado correctamente
        </Alert>
      )}

      <Button variant="contained" startIcon={<Add />} onClick={handleAddSlide} sx={{ mb: 3 }}>
        Agregar Imagen
      </Button>

      <Grid container spacing={2}>
        {sliderImages.map((slide, index) => (
          <Grid item xs={12} md={6} key={slide.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={slide.background || "/placeholder.svg"}
                alt={slide.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {slide.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {slide.subtitle}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <IconButton size="small" onClick={() => handleEditSlide(index, slide)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteSlide(index)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingSlide !== null ? "Editar Imagen" : "Agregar Imagen"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="URL de Imagen de Fondo"
            value={slideForm.background}
            onChange={(e) => setSlideForm({ ...slideForm, background: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />

          <TextField
            fullWidth
            label="URL de Imagen Principal"
            value={slideForm.image}
            onChange={(e) => setSlideForm({ ...slideForm, image: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Título"
            value={slideForm.title}
            onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Subtítulo"
            value={slideForm.subtitle}
            onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveSlide} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SliderManager
