"use client"

import { Button, useMediaQuery } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { checkoutContext } from "../Cart"
import { useContext } from "react"
import { useLanguage } from "../../../contexts/LanguageContext"

const GoBackButton = () => {
  const [isProceedToCheckout, setIsProceedToCheckout] = useContext(checkoutContext)
  const { t } = useLanguage()
  // Media Query
  const isSmallScreen = useMediaQuery("(min-width: 640px)")

  return (
    <Button
      color="success"
      onClick={() => setIsProceedToCheckout(!isProceedToCheckout)}
      size="small"
      sx={{ textTransform: "capitalize" }}
      variant="outlined"
      startIcon={<ArrowBack fontSize="inherit" />}
    >
      {t("cart.goBack")}
    </Button>
  )
}

export default GoBackButton
