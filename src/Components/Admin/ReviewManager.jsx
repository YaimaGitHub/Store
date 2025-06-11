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
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Alert,
} from "@mui/material"
import { Edit, Delete, Add } from "@mui/icons-material"
import { useAdmin } from "../../contexts/AdminContext"

const ReviewManager = () => {
  const { adminSettings, updateAdminSettings } = useAdmin()
  const [reviews, setReviews] = useState(adminSettings.reviews)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  const [success, setSuccess] = useState(false)

  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
    avatar: "",
  })

  const handleEditReview = (index, review) => {
    setEditingReview(index)
    setReviewForm({
      name: review.name,
      rating: review.rating,
      comment: review.comment,
      avatar: review.avatar,
    })
    setOpenDialog(true)
  }

  const handleAddReview = () => {
    setEditingReview(null)
    setReviewForm({
      name: "",
      rating: 5,
      comment: "",
      avatar: "",
    })
    setOpenDialog(true)
  }

  const handleSaveReview = () => {
    const newReviews = [...reviews]

    if (editingReview !== null) {
      newReviews[editingReview] = {
        ...newReviews[editingReview],
        ...reviewForm,
      }
    } else {
      const newId = Math.max(...reviews.map((r) => r.id)) + 1
      newReviews.push({
        id: newId,
        ...reviewForm,
      })
    }

    setReviews(newReviews)
    updateAdminSettings({ reviews: newReviews })
    setOpenDialog(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleDeleteReview = (index) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reseña?")) {
      const newReviews = reviews.filter((_, i) => i !== index)
      setReviews(newReviews)
      updateAdminSettings({ reviews: newReviews })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de Reseñas
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Reseñas actualizadas correctamente
        </Alert>
      )}

      <Button variant="contained" startIcon={<Add />} onClick={handleAddReview} sx={{ mb: 3 }}>
        Agregar Reseña
      </Button>

      <Grid container spacing={2}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={4} key={review.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar src={review.avatar} alt={review.name} sx={{ width: 50, height: 50, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" component="div">
                      {review.name}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {review.comment}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => handleEditReview(index, review)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteReview(index)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingReview !== null ? "Editar Reseña" : "Agregar Reseña"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={reviewForm.name}
            onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Calificación</Typography>
            <Rating
              value={reviewForm.rating}
              onChange={(e, newValue) => setReviewForm({ ...reviewForm, rating: newValue })}
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Comentario"
            value={reviewForm.comment}
            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="URL del Avatar"
            value={reviewForm.avatar}
            onChange={(e) => setReviewForm({ ...reviewForm, avatar: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveReview} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ReviewManager
