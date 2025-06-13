"use client"

import React from "react"
import { useLanguage } from "../../contexts/LanguageContext"
import { Button, Menu, MenuItem } from "@mui/material"
import { ExpandMore, Language } from "@mui/icons-material"

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (language) => {
    changeLanguage(language)
    handleClose()
  }

  const languages = {
    es: "Español",
    en: "English",
  }

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<Language />}
        endIcon={<ExpandMore />}
        sx={{
          textTransform: "none",
          color: "#374151", // Color gris oscuro como los otros elementos
          fontWeight: "400",
          fontSize: "0.875rem", // text-sm
          minWidth: "auto",
          padding: "4px 8px",
          "&:hover": {
            color: "#1f2937", // hover:text-gray-800
            transform: "scale(0.99)", // hover:scale-[0.99]
            backgroundColor: "transparent",
          },
          "@media (min-width: 640px)": {
            fontSize: "1rem", // sm:text-base
          },
        }}
        size="small"
      >
        {languages[currentLanguage]}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
        }}
      >
        <MenuItem
          onClick={() => handleLanguageChange("es")}
          selected={currentLanguage === "es"}
          sx={{
            fontSize: "0.875rem",
            "&.Mui-selected": {
              backgroundColor: "#dcfce7", // green-100
              "&:hover": {
                backgroundColor: "#bbf7d0", // green-200
              },
            },
          }}
        >
          Español
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange("en")}
          selected={currentLanguage === "en"}
          sx={{
            fontSize: "0.875rem",
            "&.Mui-selected": {
              backgroundColor: "#dcfce7", // green-100
              "&:hover": {
                backgroundColor: "#bbf7d0", // green-200
              },
            },
          }}
        >
          English
        </MenuItem>
      </Menu>
    </>
  )
}

export default LanguageSelector
