"use client"

import { Dialog, DialogContent, IconButton, Button, Typography, Box, Chip, Divider, useMediaQuery } from "@mui/material"
import { Close, ShoppingCart } from "@mui/icons-material"
import { useContext, useState } from "react"
import { groceryContext } from "../Layout/Layout"
import { handleSessionStorage } from "../../utils/utils"
import SuccessAlert from "../SuccessAlert/SuccessAlert"
import { useLanguage } from "../../contexts/LanguageContext"

const ProductDetail = ({ product, open, onClose }) => {
  const { t } = useLanguage()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [openAlert, setOpenAlert] = useState(false)
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState

  if (!product) return null

  const { img, name, price, reviews, reviewCount, quantity, unit, category, originalPrice } = product

  // Handle Add To Cart
  const handleAddToCartBtn = () => {
    let targetedProduct = product
    let latestCartItems = cartItems

    const isTargetedProductAlreadyExist = cartItems.find((item) => item.id === product.id)
    if (isTargetedProductAlreadyExist) {
      targetedProduct = {
        ...isTargetedProductAlreadyExist,
        quantity: isTargetedProductAlreadyExist.quantity + 1,
        total: ((isTargetedProductAlreadyExist.quantity + 1) * isTargetedProductAlreadyExist.price).toFixed(2),
      }
      latestCartItems = cartItems.filter((item) => item.id !== targetedProduct.id)
    }
    setCartItems([targetedProduct, ...latestCartItems])
    handleSessionStorage("set", "cartItems", [targetedProduct, ...latestCartItems])

    setOpenAlert(true)
    onClose()
  }

  // Get category-specific information
  const getCategoryInfo = (category) => {
    switch (category?.toLowerCase()) {
      case "meat":
        return {
          brand: t("productDetail.meat.brand"),
          origin: t("productDetail.meat.origin"),
          cut: t("productDetail.meat.cut"),
          description: t("productDetail.meat.description"),
          specifications: [
            { label: t("productDetail.meat.freshness"), value: t("productDetail.meat.freshnessValue") },
            { label: t("productDetail.meat.storage"), value: t("productDetail.meat.storageValue") },
            { label: t("productDetail.meat.shelfLife"), value: t("productDetail.meat.shelfLifeValue") },
          ],
        }
      case "vegetables":
        return {
          brand: t("productDetail.vegetables.brand"),
          origin: t("productDetail.vegetables.origin"),
          type: t("productDetail.vegetables.type"),
          description: t("productDetail.vegetables.description"),
          specifications: [
            { label: t("productDetail.vegetables.organic"), value: t("productDetail.vegetables.organicValue") },
            { label: t("productDetail.vegetables.harvest"), value: t("productDetail.vegetables.harvestValue") },
            { label: t("productDetail.vegetables.storage"), value: t("productDetail.vegetables.storageValue") },
          ],
        }
      case "fruits":
        return {
          brand: t("productDetail.fruits.brand"),
          origin: t("productDetail.fruits.origin"),
          variety: t("productDetail.fruits.variety"),
          description: t("productDetail.fruits.description"),
          specifications: [
            { label: t("productDetail.fruits.ripeness"), value: t("productDetail.fruits.ripenessValue") },
            { label: t("productDetail.fruits.season"), value: t("productDetail.fruits.seasonValue") },
            { label: t("productDetail.fruits.nutrition"), value: t("productDetail.fruits.nutritionValue") },
          ],
        }
      case "dairy":
        return {
          brand: t("productDetail.dairy.brand"),
          origin: t("productDetail.dairy.origin"),
          type: t("productDetail.dairy.type"),
          description: t("productDetail.dairy.description"),
          specifications: [
            { label: t("productDetail.dairy.fatContent"), value: t("productDetail.dairy.fatContentValue") },
            { label: t("productDetail.dairy.pasteurized"), value: t("productDetail.dairy.pasteurizedValue") },
            { label: t("productDetail.dairy.expiry"), value: t("productDetail.dairy.expiryValue") },
          ],
        }
      case "grains":
        return {
          brand: t("productDetail.grains.brand"),
          origin: t("productDetail.grains.origin"),
          type: t("productDetail.grains.type"),
          description: t("productDetail.grains.description"),
          specifications: [
            { label: t("productDetail.grains.processing"), value: t("productDetail.grains.processingValue") },
            { label: t("productDetail.grains.protein"), value: t("productDetail.grains.proteinValue") },
            { label: t("productDetail.grains.storage"), value: t("productDetail.grains.storageValue") },
          ],
        }
      default:
        return {
          brand: "Premium Quality",
          origin: "Local Farm",
          type: "Fresh Product",
          description: "High quality fresh product sourced from trusted suppliers.",
          specifications: [
            { label: "Quality", value: "Premium" },
            { label: "Freshness", value: "Daily Fresh" },
            { label: "Source", value: "Local" },
          ],
        }
    }
  }

  const categoryInfo = getCategoryInfo(category)
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <>
      <SuccessAlert state={[openAlert, setOpenAlert]} massage={t("cart.itemAdded")} />

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 2,
            maxHeight: isMobile ? "100vh" : "90vh",
            margin: isMobile ? 0 : 2,
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
            }}
          >
            <Close />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              minHeight: isMobile ? "100vh" : "auto",
            }}
          >
            {/* Product Image */}
            <Box
              sx={{
                flex: isMobile ? "0 0 300px" : "0 0 400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f8f9fa",
                p: 3,
              }}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={name}
                style={{
                  maxWidth: "100%",
                  maxHeight: isMobile ? "250px" : "350px",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Product Information */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Product Title */}
              <Typography variant={isMobile ? "h5" : "h4"} component="h1" fontWeight="bold">
                {name}
              </Typography>

              {/* Price Section */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {originalPrice && (
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                      fontSize: "1rem",
                    }}
                  >
                    ${originalPrice}
                  </Typography>
                )}
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  ${price}
                </Typography>
                {discount > 0 && (
                  <Chip label={`${discount}% off`} color="error" size="small" sx={{ fontWeight: "bold" }} />
                )}
              </Box>

              {/* Product Specifications */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1">
                  <strong>{t("productDetail.brand")}:</strong> {categoryInfo.brand}
                </Typography>
                <Typography variant="body1">
                  <strong>{t("productDetail.origin")}:</strong> {categoryInfo.origin}
                </Typography>
                <Typography variant="body1">
                  <strong>{t("productDetail.quantity")}:</strong> {quantity} {unit}
                </Typography>
                <Typography variant="body1">
                  <strong>{t("productDetail.rating")}:</strong> {reviews} ⭐ ({reviewCount} {t("products.reviews")})
                </Typography>
              </Box>

              <Divider />

              {/* About this product */}
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {t("productDetail.aboutProduct")}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {categoryInfo.description}
                </Typography>

                {/* Additional Specifications */}
                <Box sx={{ mt: 2 }}>
                  {categoryInfo.specifications.map((spec, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                      <strong>{spec.label}:</strong> {spec.value}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Add to Cart Button */}
              <Box sx={{ mt: "auto", pt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCartBtn}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  {t("products.addToCart")}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProductDetail
