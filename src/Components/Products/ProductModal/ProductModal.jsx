"use client"

import { Dialog, DialogContent, Button, Rating, IconButton, Backdrop, Zoom, useMediaQuery } from "@mui/material"
import { Close, ShoppingCart, Star } from "@mui/icons-material"
import { useContext, useState } from "react"
import { groceryContext } from "../../Layout/Layout"
import { handleSessionStorage } from "../../../utils/utils"
import SuccessAlert from "../../SuccessAlert/SuccessAlert"
import { useLanguage } from "../../../contexts/LanguageContext"

const ProductModal = ({ open, onClose, product }) => {
  const { img, name, price, reviews, reviewCount, quantity, unit, id } = product
  const { t } = useLanguage()
  const [openAlert, setOpenAlert] = useState(false)
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState

  const isMobile = useMediaQuery("(max-width:768px)")

  // Get product description based on category and product
  const getProductDescription = (productName) => {
    const descriptions = {
      // Meat descriptions
      "Beef Meat":
        "Carne de res premium, perfecta para asados y parrillas. Rica en proteínas y hierro, ideal para una alimentación balanceada.",
      "Chicken Meat":
        "Pollo fresco y tierno, ideal para cualquier preparación culinaria. Bajo en grasa y alto en proteínas de calidad.",
      "Pork Meat":
        "Carne de cerdo jugosa y sabrosa, perfecta para guisos y asados. Fuente excelente de vitaminas del complejo B.",
      "Lamb Meat":
        "Cordero tierno de la más alta calidad, ideal para ocasiones especiales. Sabor único y textura excepcional.",

      // Vegetables descriptions
      Tomato:
        "Tomates frescos y jugosos, ricos en vitaminas C y licopeno. Perfectos para ensaladas, salsas y preparaciones culinarias.",
      Carrot:
        "Zanahorias crujientes y dulces, ricas en vitamina A y betacarotenos. Excelentes para la salud visual y el sistema inmune.",
      Spinach:
        "Espinacas frescas y nutritivas, ricas en hierro, ácido fólico y vitaminas. Perfectas para ensaladas y platos cocidos.",
      Broccoli:
        "Brócoli fresco y crujiente, rico en vitaminas C, K y antioxidantes. Ideal para mantener una dieta saludable.",

      // Fruits descriptions
      Apple:
        "Manzanas crujientes y dulces, ricas en fibra y vitaminas. Perfectas como snack saludable o para postres naturales.",
      Banana:
        "Plátanos maduros y dulces, ricos en potasio y energía natural. Ideales para deportistas y desayunos nutritivos.",
      Orange:
        "Naranjas jugosas y refrescantes, ricas en vitamina C y antioxidantes. Perfectas para jugos naturales y meriendas.",
      Grapes:
        "Uvas dulces y jugosas, ricas en antioxidantes y resveratrol. Perfectas como snack saludable o para acompañar quesos.",

      // Dairy descriptions
      Milk: "Leche fresca y cremosa, rica en calcio y proteínas de alta calidad. Esencial para el desarrollo y mantenimiento óseo.",
      Cheese: "Queso artesanal de la más alta calidad, perfecto para cualquier ocasión. Rico en calcio y proteínas.",
      Yogurt:
        "Yogurt cremoso y natural, rico en probióticos y calcio. Ideal para la salud digestiva y el bienestar general.",
      Butter: "Mantequilla cremosa y natural, perfecta para cocinar y hornear. Elaborada con los mejores ingredientes.",

      // Grains descriptions
      Rice: "Arroz de grano largo y alta calidad, perfecto como acompañamiento. Fuente de energía y carbohidratos complejos.",
      Wheat:
        "Trigo integral de primera calidad, rico en fibra y nutrientes. Ideal para una alimentación saludable y balanceada.",
      Oats: "Avena natural y nutritiva, perfecta para desayunos saludables. Rica en fibra soluble y proteínas vegetales.",
      Barley:
        "Cebada de alta calidad, rica en fibra y minerales. Perfecta para sopas, guisos y preparaciones nutritivas.",
    }

    return descriptions[productName] || "Producto fresco de la más alta calidad, seleccionado especialmente para ti."
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
            {/* Product Image */}
            <div className="bg-gray-50 flex items-center justify-center p-8">
              <div className="transform transition-transform duration-300 hover:scale-105">
                <img
                  src={img || "/placeholder.svg"}
                  alt={name}
                  className={`${isMobile ? "max-h-64" : "max-h-80"} w-auto object-contain`}
                />
              </div>
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

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-700">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">{getProductDescription(name)}</p>
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
