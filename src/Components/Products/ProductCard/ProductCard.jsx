"use client"

import { Card, CardActions, CardContent, Fade, Rating, Skeleton, useMediaQuery, Button, Chip, Box } from "@mui/material"
import { Star, Visibility, ShoppingCart } from "@mui/icons-material"
import { useState, useContext } from "react"
import ProductDetail from "../../ProductDetail/ProductDetail"
import { useLanguage } from "../../../contexts/LanguageContext"
import { groceryContext } from "../../Layout/Layout"
import { handleSessionStorage } from "../../../utils/utils"

const ProductCard = ({ product }) => {
  const { img, images, name, price, originalPrice, reviews, reviewCount, quantity, unit, stock, category } = product
  const { t } = useLanguage()
  const [openDetail, setOpenDetail] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState

  // Media Query
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1024px)")
  const isSmallScreen = useMediaQuery("(max-width:768px)")

  const handleViewDetails = () => {
    setOpenDetail(true)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (stock === 0) return

    setIsAddingToCart(true)

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

      setIsAddingToCart(false)
    }, 800)
  }

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const isOutOfStock = stock === 0

  return (
    <div>
      <ProductDetail product={product} open={openDetail} onClose={() => setOpenDetail(false)} />

      <Fade in={true}>
        <Card
          sx={{
            maxWidth: isSmallScreen ? 275 : 295,
            mx: "auto",
            background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "1px solid rgba(0,0,0,0.08)",
            "&:hover": {
              transform: "translateY(-8px) scale(1.02)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              "& .product-image": {
                transform: "scale(1.1)",
              },
              "& .add-to-cart-btn": {
                transform: "translateY(0)",
                opacity: 1,
              },
            },
            ...(isOutOfStock && {
              opacity: 0.7,
              "&::after": {
                content: '"AGOTADO"',
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(-15deg)",
                background: "rgba(244, 67, 54, 0.9)",
                color: "white",
                padding: "8px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1.2rem",
                zIndex: 10,
                backdropFilter: "blur(2px)",
              },
            }),
          }}
          onClick={handleViewDetails}
        >
          {/* Discount Badge */}
          {discount > 0 && !isOutOfStock && (
            <Chip
              label={`-${discount}%`}
              color="error"
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                zIndex: 5,
                fontWeight: "bold",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            />
          )}

          {/* Category Badge */}
          <Chip
            label={category}
            variant="outlined"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 5,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              fontSize: "0.75rem",
            }}
          />

          {/* Stock Badge */}
          {stock <= 5 && stock > 0 && (
            <Chip
              label={`Solo ${stock} disponibles`}
              color="warning"
              size="small"
              sx={{
                position: "absolute",
                bottom: 12,
                left: 12,
                zIndex: 5,
                fontSize: "0.7rem",
                animation: "blink 1.5s infinite",
                "@keyframes blink": {
                  "0%, 50%": { opacity: 1 },
                  "51%, 100%": { opacity: 0.7 },
                },
              }}
            />
          )}

          {/* Product Image */}
          <Box
            sx={{
              height: 200,
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              className="product-image"
              style={{
                maxHeight: "160px",
                maxWidth: "90%",
                objectFit: "contain",
                transition: "transform 0.4s ease",
                filter: isOutOfStock ? "grayscale(100%)" : "none",
              }}
              loading="lazy"
              src={(images && images[0]) || img || "/placeholder.svg"}
              alt={name}
            />
          </Box>

          <CardContent sx={{ p: 3 }}>
            {/* Product Name */}
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "12px",
                textAlign: "center",
                lineHeight: "1.4",
                minHeight: "2.8rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {name}
            </h3>

            {/* Price Section */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mb: 1 }}>
                {originalPrice && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#9ca3af",
                      fontSize: "0.9rem",
                    }}
                  >
                    ${originalPrice}
                  </span>
                )}
                <span
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    color: "#059669",
                  }}
                >
                  ${price}
                </span>
              </Box>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#6b7280",
                }}
              >
                por {quantity} {unit}
              </span>
            </Box>

            {/* Rating */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mb: 2 }}>
              <Rating
                size="small"
                name="product_ratings"
                value={reviews}
                readOnly
                precision={0.1}
                emptyIcon={<Star fontSize="inherit" />}
              />
              <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>({reviewCount})</span>
            </Box>

            {/* Stock Info */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: stock > 10 ? "#059669" : stock > 0 ? "#d97706" : "#dc2626",
                  fontWeight: "500",
                }}
              >
                {stock > 10 ? "✅ En stock" : stock > 0 ? `⚠️ Quedan ${stock}` : "❌ Agotado"}
              </span>
            </Box>
          </CardContent>

          <CardActions sx={{ p: 2, pt: 0 }}>
            <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
              {/* View Details Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewDetails()
                }}
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<Visibility />}
                sx={{
                  flex: 1,
                  textTransform: "capitalize",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                Ver
              </Button>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
                variant="contained"
                color="success"
                size="small"
                startIcon={isAddingToCart ? null : <ShoppingCart />}
                sx={{
                  flex: 2,
                  textTransform: "capitalize",
                  borderRadius: "12px",
                  background: isAddingToCart
                    ? "linear-gradient(45deg, #4caf50, #81c784)"
                    : "linear-gradient(45deg, #2e7d32, #4caf50)",
                  transition: "all 0.3s ease",
                  animation: isAddingToCart ? "pulse 0.8s ease-in-out" : "none",
                  "&:hover": {
                    transform: "scale(1.05)",
                    background: "linear-gradient(45deg, #1b5e20, #2e7d32)",
                  },
                  "&:disabled": {
                    background: "#e0e0e0",
                    color: "#9e9e9e",
                  },
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                    "100%": { transform: "scale(1)" },
                  },
                }}
              >
                {isAddingToCart ? "..." : isOutOfStock ? "Agotado" : "Agregar"}
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Fade>
    </div>
  )
}

// ProductCard Skeleton remains the same
export const ProductCardSkeleton = () => (
  <div>
    <Card
      sx={{
        maxWidth: 308,
        mx: "auto",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        backgroundColor: "white",
        borderRadius: "20px",
      }}
    >
      {/* Product_img */}
      <Skeleton variant="rectangular" height={200} width={"100%"} />

      <div className="px-3 pb-2">
        <CardContent className="space-y-2" sx={{ pb: 1 }}>
          {/* title */}
          <Skeleton sx={{ mx: "auto" }} variant="text" height={"3rem"} width={"85%"} />

          <div className="space-y-2">
            <div className="flex justify-center space-x-2">
              {/* Price */}
              <Skeleton variant="text" height={"1.5rem"} width={"40%"} />
            </div>

            <div className="flex justify-center">
              {/* Ratings */}
              <Skeleton variant="text" height={"1.6rem"} width={"80%"} />
            </div>

            {/* Stock */}
            <Skeleton variant="text" height={"1.2rem"} width={"60%"} sx={{ mx: "auto" }} />
          </div>
        </CardContent>

        {/* Buttons */}
        <CardActions sx={{ pt: 0, px: 2 }}>
          <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            <Skeleton variant="rounded" height={"2.2rem"} width={"30%"} />
            <Skeleton variant="rounded" height={"2.2rem"} width={"70%"} />
          </Box>
        </CardActions>
      </div>
    </Card>
  </div>
)

export default ProductCard
