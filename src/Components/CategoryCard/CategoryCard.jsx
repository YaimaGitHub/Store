"use client"

import { CardActionArea, Fade } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../contexts/LanguageContext"

const CategoryCard = ({ category, shadow }) => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const getCategoryRoute = (categoryName) => {
    const categoryMap = {
      [t("categories.meat")]: "meat",
      [t("categories.vegetables")]: "vegetables",
      [t("categories.fruits")]: "fruits",
      [t("categories.dairy")]: "dairy",
      [t("categories.grains")]: "grains",
    }
    return categoryMap[categoryName] || categoryName.toLowerCase()
  }

  return (
    <CardActionArea
      onClick={() => navigate(`/categories/${getCategoryRoute(category.name)}`)}
      sx={{ maxWidth: "19rem", mx: "auto", boxShadow: shadow ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none" }}
    >
      <div
        className="rounded-lg w-full cursor-pointer xl:h-[11rem]  h-[10rem] flex items-center shadow-sm justify-center"
        style={{ backgroundColor: category.bgColor }}
      >
        <div className="sm:space-y-2 space-y-3.5">
          {/* Img */}
          <Fade in={true}>
            <img
              className="xl:h-[5rem]  h-[4.5rem] m-auto"
              src={category.img || "/placeholder.svg"}
              loading="lazy"
              alt={category.name}
            />
          </Fade>

          <div className="space-y-1">
            {/* Name */}
            <h3 className="text-center text-xl capitalize font-semibold text-gray-700">{category.name}</h3>

            {/*Available Items*/}
            <h3 className="text-center  text-xs text-gray-600">(4 {t("categories.items")})</h3>
          </div>
        </div>
      </div>
    </CardActionArea>
  )
}

export default CategoryCard
