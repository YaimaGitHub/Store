"use client"

import {
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  useMediaQuery,
  Zoom,
  Slide,
} from "@mui/material"
import { Close, ShoppingCart, CheckCircle, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import { useContext, useState } from "react"
import { groceryContext } from "../Layout/Layout"
import { handleSessionStorage } from "../../utils/utils"
import SuccessAlert from "../SuccessAlert/SuccessAlert"
import { useLanguage } from "../../contexts/LanguageContext"

const ProductDetail = ({ product, open, onClose }) => {
  const { t } = useLanguage()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [openAlert, setOpenAlert] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState

  if (!product) return null

  const {
    images,
    img,
    name,
    price,
    originalPrice,
    reviews,
    reviewCount,
    quantity,
    unit,
    category,
    stock,
    description,
    specifications,
  } = product

  const productImages = images || [img]
  const isOutOfStock = stock === 0

  // Handle Add To Cart with animation
  const handleAddToCartBtn = () => {
    if (isOutOfStock) return

    setIsAdding(true)

    setTimeout(() => {
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

      setIsAdding(false)
      setOpenAlert(true)
      onClose()
    }, 1200)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <>
      <SuccessAlert state={[openAlert, setOpenAlert]} massage={t("cart.itemAdded")} />

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
        TransitionComponent={Slide}
        TransitionProps={{
          direction: "up",
          timeout: 600,
        }}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 3,
            maxHeight: isMobile ? "100vh" : "90vh",
            margin: isMobile ? 0 : 2,
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            animation: "modalSlideIn 0.6s ease-out",
            "@keyframes modalSlideIn": {
              "0%": { transform: "scale(0.8)", opacity: 0 },
              "100%": { transform: "scale(1)", opacity: 1 },
            },
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
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
                transform: "scale(1.1) rotate(90deg)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
            {/* Product Images with Slider */}
            <Box
              sx={{
                flex: isMobile ? "0 0 400px" : "0 0 500px",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Main Image */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  p: 3,
                }}
              >
                <img
                  src={productImages[currentImageIndex] || "/placeholder.svg"}
                  alt={name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "350px",
                    objectFit: "contain",
                    filter: isOutOfStock ? "grayscale(100%)" : "none",
                    transition: "all 0.4s ease",
                    animation: "productFloat 4s ease-in-out infinite",
                  }}
                />

                {/* Navigation Arrows */}
                {productImages.length > 1 && (
                  <>
                    <IconButton
                      onClick={prevImage}
                      sx={{
                        position: "absolute",
                        left: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          transform: "translateY(-50%) scale(1.1)",
                        },
                      }}
                    >
                      <ArrowBackIos />
                    </IconButton>
                    <IconButton
                      onClick={nextImage}
                      sx={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          transform: "translateY(-50%) scale(1.1)",
                        },
                      }}
                    >
                      <ArrowForwardIos />
                    </IconButton>
                  </>
                )}

                {/* Out of Stock Overlay */}
                {isOutOfStock && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) rotate(-15deg)",
                      background: "rgba(244, 67, 54, 0.9)",
                      color: "white",
                      padding: "12px 32px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      backdropFilter: "blur(2px)",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    AGOTADO
                  </Box>
                )}
              </Box>

              {/* Image Thumbnails */}
              {productImages.length > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    p: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {productImages.map((image, index) => (
                    <Box
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: currentImageIndex === index ? "3px solid #4caf50" : "2px solid transparent",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${name} ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* Product Information */}
            <Box
              sx={{
                flex: 1,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                animation: "slideInRight 0.8s ease-out",
                "@keyframes slideInRight": {
                  "0%": { transform: "translateX(50px)", opacity: 0 },
                  "100%": { transform: "translateX(0)", opacity: 1 },
                },
              }}
            >
              {/* Category Badge */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Chip
                  label={category}
                  color="primary"
                  variant="outlined"
                  sx={{
                    fontWeight: "bold",
                    animation: "fadeIn 0.6s ease-out 0.2s both",
                  }}
                />
                {stock <= 5 && stock > 0 && (
                  <Chip
                    label={`Solo ${stock} disponibles`}
                    color="warning"
                    size="small"
                    sx={{
                      animation: "blink 1.5s infinite",
                      "@keyframes blink": {
                        "0%, 50%": { opacity: 1 },
                        "51%, 100%": { opacity: 0.7 },
                      },
                    }}
                  />
                )}
              </Box>

              {/* Product Title */}
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h1"
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(45deg, #2e7d32, #4caf50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "titleGlow 2s ease-in-out infinite alternate",
                  "@keyframes titleGlow": {
                    "0%": { filter: "brightness(1)" },
                    "100%": { filter: "brightness(1.2)" },
                  },
                }}
              >
                {name}
              </Typography>

              {/* Price Section */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  animation: "priceSlide 0.6s ease-out 0.2s both",
                  "@keyframes priceSlide": {
                    "0%": { transform: "translateY(20px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                  },
                }}
              >
                {originalPrice && (
                  <Typography
                    variant="h5"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                      position: "relative",
                    }}
                  >
                    ${originalPrice}
                  </Typography>
                )}
                <Typography
                  variant="h3"
                  color="success.main"
                  fontWeight="bold"
                  sx={{
                    animation: "priceGlow 2s ease-in-out infinite alternate",
                    "@keyframes priceGlow": {
                      "0%": { textShadow: "0 0 5px rgba(76, 175, 80, 0.5)" },
                      "100%": { textShadow: "0 0 20px rgba(76, 175, 80, 0.8)" },
                    },
                  }}
                >
                  ${price}
                </Typography>
                {discount > 0 && (
                  <Zoom in={true} style={{ transitionDelay: "0.5s" }}>
                    <Chip
                      label={`${discount}% off`}
                      color="error"
                      sx={{
                        fontWeight: "bold",
                        animation: "bounce 1s ease-in-out infinite",
                        "@keyframes bounce": {
                          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
                          "40%": { transform: "translateY(-10px)" },
                          "60%": { transform: "translateY(-5px)" },
                        },
                      }}
                    />
                  </Zoom>
                )}
              </Box>

              {/* Product Specifications */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  animation: "fadeInUp 0.6s ease-out 0.4s both",
                  "@keyframes fadeInUp": {
                    "0%": { transform: "translateY(30px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                  },
                }}
              >
                <Typography variant="body1">
                  <strong>📦 {t("productDetail.quantity")}:</strong> {quantity} {unit}
                </Typography>
                <Typography variant="body1">
                  <strong>⭐ {t("productDetail.rating")}:</strong> {reviews} ({reviewCount} {t("products.reviews")})
                </Typography>
                <Typography variant="body1">
                  <strong>📦 Stock:</strong>{" "}
                  <span style={{ color: stock > 10 ? "#059669" : stock > 0 ? "#d97706" : "#dc2626" }}>
                    {stock > 10 ? `${stock} disponibles` : stock > 0 ? `Solo ${stock} disponibles` : "Agotado"}
                  </span>
                </Typography>
                {specifications && (
                  <>
                    <Typography variant="body1">
                      <strong>🏭 {t("productDetail.origin")}:</strong> {specifications.origin}
                    </Typography>
                    <Typography variant="body1">
                      <strong>📋 Tipo:</strong> {specifications.type || specifications.variety || specifications.cut}
                    </Typography>
                  </>
                )}
              </Box>

              <Divider sx={{ borderColor: "#e0e0e0" }} />

              {/* Product Description */}
              <Box
                sx={{
                  animation: "fadeIn 0.8s ease-out 0.8s both",
                  "@keyframes fadeIn": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                  },
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {t("productDetail.aboutProduct")}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{
                    lineHeight: 1.7,
                    textAlign: "justify",
                  }}
                >
                  {description}
                </Typography>

                {/* Additional Specifications */}
                {specifications && (
                  <Box sx={{ mt: 2 }}>
                    {Object.entries(specifications).map(([key, value], index) => (
                      <Typography
                        key={key}
                        variant="body2"
                        sx={{
                          mb: 0.5,
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: index % 2 === 0 ? "#f8f9fa" : "transparent",
                        }}
                      >
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Add to Cart Button */}
              <Box sx={{ mt: "auto", pt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  fullWidth
                  startIcon={isAdding ? <CheckCircle /> : <ShoppingCart />}
                  onClick={handleAddToCartBtn}
                  disabled={isAdding || isOutOfStock}
                  sx={{
                    py: 2.5,
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "16px",
                    background: isAdding
                      ? "linear-gradient(45deg, #4caf50, #81c784)"
                      : isOutOfStock
                        ? "#e0e0e0"
                        : "linear-gradient(45deg, #2e7d32, #4caf50)",
                    boxShadow: isOutOfStock ? "none" : "0 4px 15px rgba(46, 125, 50, 0.4)",
                    transition: "all 0.3s ease",
                    animation: isAdding ? "addingPulse 1.2s ease-in-out" : "none",
                    "&:hover": {
                      transform: isOutOfStock ? "none" : "translateY(-2px)",
                      boxShadow: isOutOfStock ? "none" : "0 6px 20px rgba(46, 125, 50, 0.6)",
                      background: isOutOfStock ? "#e0e0e0" : "linear-gradient(45deg, #1b5e20, #2e7d32)",
                    },
                    "&:disabled": {
                      background: "#e0e0e0",
                      color: "#9e9e9e",
                    },
                    "@keyframes addingPulse": {
                      "0%": { transform: "scale(1)" },
                      "25%": { transform: "scale(1.05)" },
                      "50%": { transform: "scale(1)" },
                      "75%": { transform: "scale(1.02)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                >
                  {isAdding ? (
                    <span className="flex items-center">
                      <CheckCircle className="mr-2 animate-spin" />
                      Agregando al carrito...
                    </span>
                  ) : isOutOfStock ? (
                    "Producto Agotado"
                  ) : (
                    t("products.addToCart")
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes productFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-1deg); }
        }
      `}</style>
    </>
  )
}

export default ProductDetail
