"use client"

import { Card, CardContent, Fade, Rating, Skeleton, useMediaQuery, CardActions } from "@mui/material"
import { Star } from "@mui/icons-material"
import { useState } from "react"
import ProductModal from "../ProductModal/ProductModal"
import { useLanguage } from "../../../contexts/LanguageContext"

const ProductCard = ({ product }) => {
  const { img, name, price, reviews, reviewCount, quantity, unit } = product
  const { t } = useLanguage()
  const [openModal, setOpenModal] = useState(false)

  // Media Query
  const isSmallScreen = useMediaQuery("(max-width:768px)")

  const handleProductClick = () => {
    setOpenModal(true)
  }

  return (
    <>
      <ProductModal open={openModal} onClose={() => setOpenModal(false)} product={product} />

      <Fade in={true}>
        <Card
          onClick={handleProductClick}
          sx={{
            maxWidth: isSmallScreen ? 275 : 295,
            mx: "auto",
            boxShadow: "0 2px 4px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "white",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-8px) scale(1.02)",
              boxShadow: "0 12px 30px -5px rgb(0 0 0 / 0.15), 0 15px 15px -5px rgb(0 0 0 / 0.08)",
            },
          }}
        >
          {/* Product_img */}
          <div className="md:h-36 py-3 w-full bg-white flex items-center justify-center overflow-hidden">
            <img
              className="md:max-h-28 max-h-24 transition-transform duration-300 hover:scale-110"
              loading="lazy"
              src={img || "/placeholder.svg"}
              alt={name}
            />
          </div>
          <div className="p-1.5">
            <CardContent className="md:space-y-2 space-y-1.5 ">
              {/* title */}
              <h3 className="md:text-xl lg:text-2xl text-xl text-gray-700 font-semibold text-center capitalize">
                {name}
              </h3>
              <div className="md:space-y-1.5 space-y-2 lg:space-y-2">
                <div className="flex justify-center space-x-5">
                  {/* Amount */}
                  <span className="block text-sm md:text-xs lg:text-sm">
                    ± {quantity} {unit}
                  </span>
                  {/* Price */}
                  <span className="block text-sm md:text-xs lg:text-sm font-semibold text-green-600">
                    $ {price} {t("common.usd")}
                  </span>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center space-x-1">
                    {/* Rating */}
                    <Rating
                      size="small"
                      name="product_ratings"
                      value={reviews}
                      readOnly
                      precision={0.5}
                      emptyIcon={<Star fontSize="inherit" />}
                    />

                    {/*Number of Reviews*/}
                    <span className="text-sm md:text-xs lg:text-sm text-gray-500">
                      ( {reviewCount} {t("products.reviews")} )
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Fade>
    </>
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
      }}
    >
      {/* Product_img */}
      <Skeleton variant="rectangular" height={170} width={"100%"} />

      <div className="px-1.5 pb-2">
        <CardContent className="space-y-2" sx={{ pb: 1 }}>
          {/* title */}
          <Skeleton sx={{ mx: "auto" }} variant="text" height={"3rem"} width={"55%"} />

          <div className="md:space-y-1.5 space-y-2 lg:space-y-2">
            <div className="flex justify-center space-x-5">
              {/* Amount */}
              <Skeleton variant="text" height={"1.3rem"} width={"30%"} />

              {/* Price */}
              <Skeleton variant="text" height={"1.3rem"} width={"25%"} />
            </div>

            <div className="flex justify-center">
              {/* Ratings */}
              <Skeleton variant="text" height={"1.6rem"} width={"80%"} />
            </div>
          </div>
        </CardContent>

        {/* Add To Cart Btn */}
        <CardActions sx={{ pt: 0 }}>
          <Skeleton variant="rounded" height={"1.9rem"} width={"100%"} />
        </CardActions>
      </div>
    </Card>
  </div>
)

export default ProductCard
