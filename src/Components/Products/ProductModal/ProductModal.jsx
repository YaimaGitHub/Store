"use client"

import { Dialog, DialogContent, Button, Rating, IconButton, Backdrop, Zoom, useMediaQuery } from "@mui/material"
import { Close, ShoppingCart, Star, ArrowForward, ArrowBack } from "@mui/icons-material"
import { useContext, useState, useEffect } from "react"
import { groceryContext } from "../../Layout/Layout"
import { handleSessionStorage } from "../../../utils/utils"
import SuccessAlert from "../../SuccessAlert/SuccessAlert"
import { useLanguage } from "../../../contexts/LanguageContext"

// Replace the image imports with a function that generates placeholder images
const ProductModal = ({ open, onClose, product }) => {
  const { img, name, price, reviews, reviewCount, quantity, unit, id } = product
  const { t, currentLanguage } = useLanguage()
  const [openAlert, setOpenAlert] = useState(false)
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const isMobile = useMediaQuery("(max-width:768px)")

  // Reset image index when modal opens
  useEffect(() => {
    if (open) {
      setCurrentImageIndex(0)
    }
  }, [open])

  // Generate placeholder images based on product name
  const getProductImages = (productName) => {
    // Create an array with the main product image and 3 placeholder images
    return [
      img,
      `https://source.unsplash.com/300x300/?${encodeURIComponent(productName.toLowerCase())}`,
      `https://source.unsplash.com/300x300/?${encodeURIComponent(productName.toLowerCase() + " food")}`,
      `https://source.unsplash.com/300x300/?${encodeURIComponent(productName.toLowerCase() + " fresh")}`,
    ]
  }

  const productImages = getProductImages(name)

  // Get product details based on product name
  const getProductDetails = (productName) => {
    const productDetails = {
      // Meat products
      "Beef Meat": {
        brand: "Premium Beef",
        model: "Corte Especial",
        color: currentLanguage === "es" ? "Rojo Natural" : "Natural Red",
        description:
          currentLanguage === "es"
            ? "Carne de res premium, perfecta para asados y parrillas. Rica en proteínas y hierro, ideal para una alimentación balanceada."
            : "Premium beef, perfect for roasting and grilling. Rich in protein and iron, ideal for a balanced diet.",
      },
      "Chicken Meat": {
        brand: "Farm Fresh",
        model: "Pollo Entero",
        color: currentLanguage === "es" ? "Blanco Natural" : "Natural White",
        description:
          currentLanguage === "es"
            ? "Pollo fresco y tierno, ideal para cualquier preparación culinaria. Bajo en grasa y alto en proteínas de calidad."
            : "Fresh and tender chicken, ideal for any culinary preparation. Low in fat and high in quality protein.",
      },
      "Pork Meat": {
        brand: "Quality Pork",
        model: "Lomo Premium",
        color: currentLanguage === "es" ? "Rosa Natural" : "Natural Pink",
        description:
          currentLanguage === "es"
            ? "Carne de cerdo jugosa y sabrosa, perfecta para guisos y asados. Fuente excelente de vitaminas del complejo B."
            : "Juicy and tasty pork meat, perfect for stews and roasts. Excellent source of B-complex vitamins.",
      },
      "Lamb Meat": {
        brand: "Gourmet Lamb",
        model: "Cordero Tierno",
        color: currentLanguage === "es" ? "Rojo Intenso" : "Deep Red",
        description:
          currentLanguage === "es"
            ? "Cordero tierno de la más alta calidad, ideal para ocasiones especiales. Sabor único y textura excepcional."
            : "Tender lamb of the highest quality, ideal for special occasions. Unique flavor and exceptional texture.",
      },

      // Vegetables
      Tomato: {
        brand: "Fresh Garden",
        model: "Tomate Cherry",
        color: currentLanguage === "es" ? "Rojo Brillante" : "Bright Red",
        description:
          currentLanguage === "es"
            ? "Tomates frescos y jugosos, ricos en vitaminas C y licopeno. Perfectos para ensaladas, salsas y preparaciones culinarias."
            : "Fresh and juicy tomatoes, rich in vitamin C and lycopene. Perfect for salads, sauces, and culinary preparations.",
      },
      Carrot: {
        brand: "Organic Farm",
        model: "Zanahoria Baby",
        color: currentLanguage === "es" ? "Naranja Vibrante" : "Vibrant Orange",
        description:
          currentLanguage === "es"
            ? "Zanahorias crujientes y dulces, ricas en vitamina A y betacarotenos. Excelentes para la salud visual y el sistema inmune."
            : "Crunchy and sweet carrots, rich in vitamin A and beta-carotene. Excellent for eye health and immune system.",
      },
      Spinach: {
        brand: "Green Leaf",
        model: "Espinaca Tierna",
        color: currentLanguage === "es" ? "Verde Intenso" : "Deep Green",
        description:
          currentLanguage === "es"
            ? "Espinacas frescas y nutritivas, ricas en hierro, ácido fólico y vitaminas. Perfectas para ensaladas y platos cocidos."
            : "Fresh and nutritious spinach, rich in iron, folic acid, and vitamins. Perfect for salads and cooked dishes.",
      },
      Broccoli: {
        brand: "Healthy Green",
        model: "Brócoli Premium",
        color: currentLanguage === "es" ? "Verde Oscuro" : "Dark Green",
        description:
          currentLanguage === "es"
            ? "Brócoli fresco y crujiente, rico en vitaminas C, K y antioxidantes. Ideal para mantener una dieta saludable."
            : "Fresh and crunchy broccoli, rich in vitamins C, K, and antioxidants. Ideal for maintaining a healthy diet.",
      },

      // Fruits
      Apple: {
        brand: "Orchard Fresh",
        model: "Manzana Gala",
        color: currentLanguage === "es" ? "Rojo con Verde" : "Red with Green",
        description:
          currentLanguage === "es"
            ? "Manzanas crujientes y dulces, ricas en fibra y vitaminas. Perfectas como snack saludable o para postres naturales."
            : "Crisp and sweet apples, rich in fiber and vitamins. Perfect as a healthy snack or for natural desserts.",
      },
      Banana: {
        brand: "Tropical Best",
        model: "Plátano Cavendish",
        color: currentLanguage === "es" ? "Amarillo Dorado" : "Golden Yellow",
        description:
          currentLanguage === "es"
            ? "Plátanos maduros y dulces, ricos en potasio y energía natural. Ideales para deportistas y desayunos nutritivos."
            : "Ripe and sweet bananas, rich in potassium and natural energy. Ideal for athletes and nutritious breakfasts.",
      },
      Orange: {
        brand: "Citrus Gold",
        model: "Naranja Valencia",
        color: currentLanguage === "es" ? "Naranja Brillante" : "Bright Orange",
        description:
          currentLanguage === "es"
            ? "Naranjas jugosas y refrescantes, ricas en vitamina C y antioxidantes. Perfectas para jugos naturales y meriendas."
            : "Juicy and refreshing oranges, rich in vitamin C and antioxidants. Perfect for natural juices and snacks.",
      },
      Grapes: {
        brand: "Vineyard Select",
        model: "Uva Sin Semilla",
        color: currentLanguage === "es" ? "Verde Esmeralda" : "Emerald Green",
        description:
          currentLanguage === "es"
            ? "Uvas dulces y jugosas, ricas en antioxidantes y resveratrol. Perfectas como snack saludable o para acompañar quesos."
            : "Sweet and juicy grapes, rich in antioxidants and resveratrol. Perfect as a healthy snack or to accompany cheeses.",
      },

      // Dairy
      Milk: {
        brand: "Dairy Pure",
        model: "Leche Entera",
        color: currentLanguage === "es" ? "Blanco Cremoso" : "Creamy White",
        description:
          currentLanguage === "es"
            ? "Leche fresca y cremosa, rica en calcio y proteínas de alta calidad. Esencial para el desarrollo y mantenimiento óseo."
            : "Fresh and creamy milk, rich in calcium and high-quality proteins. Essential for bone development and maintenance.",
      },
      Cheese: {
        brand: "Artisan Cheese",
        model: "Queso Cheddar",
        color: currentLanguage === "es" ? "Amarillo Dorado" : "Golden Yellow",
        description:
          currentLanguage === "es"
            ? "Queso artesanal de la más alta calidad, perfecto para cualquier ocasión. Rico en calcio y proteínas."
            : "Artisanal cheese of the highest quality, perfect for any occasion. Rich in calcium and protein.",
      },
      Yogurt: {
        brand: "Probiotic Plus",
        model: "Yogurt Natural",
        color: currentLanguage === "es" ? "Blanco Puro" : "Pure White",
        description:
          currentLanguage === "es"
            ? "Yogurt cremoso y natural, rico en probióticos y calcio. Ideal para la salud digestiva y el bienestar general."
            : "Creamy and natural yogurt, rich in probiotics and calcium. Ideal for digestive health and general well-being.",
      },
      Butter: {
        brand: "Creamy Best",
        model: "Mantequilla Sin Sal",
        color: currentLanguage === "es" ? "Amarillo Pálido" : "Pale Yellow",
        description:
          currentLanguage === "es"
            ? "Mantequilla cremosa y natural, perfecta para cocinar y hornear. Elaborada con los mejores ingredientes."
            : "Creamy and natural butter, perfect for cooking and baking. Made with the finest ingredients.",
      },

      // Grains
      Rice: {
        brand: "Golden Grain",
        model: "Arroz Basmati",
        color: currentLanguage === "es" ? "Blanco Perlado" : "Pearly White",
        description:
          currentLanguage === "es"
            ? "Arroz de grano largo y alta calidad, perfecto como acompañamiento. Fuente de energía y carbohidratos complejos."
            : "Long-grain, high-quality rice, perfect as a side dish. Source of energy and complex carbohydrates.",
      },
      Wheat: {
        brand: "Whole Grain",
        model: "Trigo Integral",
        color: currentLanguage === "es" ? "Dorado Natural" : "Natural Golden",
        description:
          currentLanguage === "es"
            ? "Trigo integral de primera calidad, rico en fibra y nutrientes. Ideal para una alimentación saludable y balanceada."
            : "Premium whole wheat, rich in fiber and nutrients. Ideal for a healthy and balanced diet.",
      },
      Oats: {
        brand: "Morning Fresh",
        model: "Avena Integral",
        color: currentLanguage === "es" ? "Beige Natural" : "Natural Beige",
        description:
          currentLanguage === "es"
            ? "Avena natural y nutritiva, perfecta para desayunos saludables. Rica en fibra soluble y proteínas vegetales."
            : "Natural and nutritious oats, perfect for healthy breakfasts. Rich in soluble fiber and vegetable proteins.",
      },
      Barley: {
        brand: "Ancient Grain",
        model: "Cebada Perlada",
        color: currentLanguage === "es" ? "Marrón Claro" : "Light Brown",
        description:
          currentLanguage === "es"
            ? "Cebada de alta calidad, rica en fibra y minerales. Perfecta para sopas, guisos y preparaciones nutritivas."
            : "High-quality barley, rich in fiber and minerals. Perfect for soups, stews, and nutritious preparations.",
      },
    }

    return (
      productDetails[productName] || {
        brand: currentLanguage === "es" ? "Marca Premium" : "Premium Brand",
        model: currentLanguage === "es" ? "Modelo Estándar" : "Standard Model",
        color: currentLanguage === "es" ? "Color Natural" : "Natural Color",
        description:
          currentLanguage === "es"
            ? "Producto fresco de la más alta calidad, seleccionado especialmente para ti."
            : "Fresh product of the highest quality, specially selected for you.",
      }
    )
  }

  const handleAddToCart = () => {
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

  const handleNextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length)
  }

  const handlePrevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length)
  }

  const productDetails = getProductDetails(name)

  return (
    <>
      <SuccessAlert state={[openAlert, setOpenAlert]} massage={`${name} ${t("cart.itemAdded")}`} />

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
        TransitionProps={{
          timeout: 400,
        }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            maxHeight: "90vh",
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

          <div className={`grid ${isMobile ? "grid-cols-1" : "md:grid-cols-2"} gap-0`}>
            {/* Product Image with Slider */}
            <div className="bg-gray-50 flex items-center justify-center p-8 relative">
              <div className="relative transition-all duration-300">
                <img
                  src={productImages[currentImageIndex] || img}
                  alt={name}
                  className={`${isMobile ? "max-h-64" : "max-h-80"} w-auto object-contain transition-transform duration-300 hover:scale-105`}
                />
              </div>

              {/* Image Navigation Controls */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <IconButton
                    onClick={handlePrevImage}
                    aria-label={t("product.prevImage")}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                    }}
                  >
                    <ArrowBack />
                  </IconButton>

                  <IconButton
                    onClick={handleNextImage}
                    aria-label={t("product.nextImage")}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                    }}
                  >
                    <ArrowForward />
                  </IconButton>
                </div>
              )}

              {/* Image Indicators */}
              {productImages.length > 1 && (
                <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${currentImageIndex === index ? "bg-green-600" : "bg-gray-300"}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Product Name */}
                <h2 className="text-3xl font-bold text-gray-800 capitalize">{name}</h2>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <Rating value={reviews} readOnly precision={0.5} emptyIcon={<Star fontSize="inherit" />} />
                  <span className="text-gray-600">
                    ({reviewCount} {t("products.reviews")})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-green-600">${price}</span>
                  <span className="text-gray-500">
                    ± {quantity} {unit}
                  </span>
                </div>

                {/* Product Details */}
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">{t("product.brand")}:</span>
                      <p className="text-gray-600">{productDetails.brand}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">{t("product.model")}:</span>
                      <p className="text-gray-600">{productDetails.model}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold text-gray-700">{t("product.color")}:</span>
                      <p className="text-gray-600">{productDetails.color}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-700">{t("product.description")}</h3>
                  <p className="text-gray-600 leading-relaxed">{productDetails.description}</p>
                </div>

                {/* Quality Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  ✓ {t("products.bestQuality")}
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                sx={{
                  mt: 4,
                  py: 1.5,
                  backgroundColor: "#16a34a",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  borderRadius: 2,
                  boxShadow: "0 4px 14px 0 rgba(22, 163, 74, 0.4)",
                  "&:hover": {
                    backgroundColor: "#15803d",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px 0 rgba(22, 163, 74, 0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
                fullWidth
              >
                {t("products.addToCart")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProductModal
