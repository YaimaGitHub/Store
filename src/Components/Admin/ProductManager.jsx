"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material"
import { Edit, Delete, Add } from "@mui/icons-material"
import { useProducts } from "../../contexts/ProductContext"

const ProductManager = () => {
  const { products, updateProduct, addProduct, deleteProduct } = useProducts()
  const [openDialog, setOpenDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [success, setSuccess] = useState(false)

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    img: "",
    unit: "kg",
    reviews: 4.5,
    reviewCount: 0,
  })

  const handleEditProduct = (categoryIndex, productIndex, product) => {
    setEditingProduct({ categoryIndex, productIndex })
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      img: product.img,
      unit: product.unit,
      reviews: product.reviews,
      reviewCount: product.reviewCount,
    })
    setOpenDialog(true)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setProductForm({
      name: "",
      price: "",
      img: "",
      unit: "kg",
      reviews: 4.5,
      reviewCount: 0,
    })
    setOpenDialog(true)
  }

  const handleSaveProduct = () => {
    const productData = {
      ...productForm,
      price: Number.parseFloat(productForm.price),
      total: Number.parseFloat(productForm.price),
      quantity: 1,
    }

    if (editingProduct) {
      updateProduct(editingProduct.categoryIndex, editingProduct.productIndex, {
        ...products[editingProduct.categoryIndex].items[editingProduct.productIndex],
        ...productData,
      })
    } else {
      addProduct(selectedCategory, productData)
    }

    setOpenDialog(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleDeleteProduct = (categoryIndex, productIndex) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      deleteProduct(categoryIndex, productIndex)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de Productos
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Producto actualizado correctamente
        </Alert>
      )}

      <Button variant="contained" startIcon={<Add />} onClick={handleAddProduct} sx={{ mb: 3 }}>
        Agregar Producto
      </Button>

      {products.map((category, categoryIndex) => (
        <Paper key={categoryIndex} elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {category.category}
          </Typography>
          <Grid container spacing={2}>
            {category.items.map((product, productIndex) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.img || "/placeholder.svg"}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price} / {product.unit}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ⭐ {product.reviews} ({product.reviewCount} reseñas)
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <IconButton size="small" onClick={() => handleEditProduct(categoryIndex, productIndex, product)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteProduct(categoryIndex, productIndex)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProduct ? "Editar Producto" : "Agregar Producto"}</DialogTitle>
        <DialogContent>
          {!editingProduct && (
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <InputLabel>Categoría</InputLabel>
              <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {products.map((category, index) => (
                  <MenuItem key={index} value={index}>
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            fullWidth
            label="Nombre del Producto"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Precio"
            type="number"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="URL de la Imagen"
            value={productForm.img}
            onChange={(e) => setProductForm({ ...productForm, img: e.target.value })}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Unidad</InputLabel>
            <Select value={productForm.unit} onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}>
              <MenuItem value="kg">kg</MenuItem>
              <MenuItem value="ltr">ltr</MenuItem>
              <MenuItem value="pcs">pcs</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Calificación"
            type="number"
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            value={productForm.reviews}
            onChange={(e) => setProductForm({ ...productForm, reviews: Number.parseFloat(e.target.value) })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Número de Reseñas"
            type="number"
            value={productForm.reviewCount}
            onChange={(e) => setProductForm({ ...productForm, reviewCount: Number.parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveProduct} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProductManager
