"use client"

import { Button, Container, Fade } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../../contexts/LanguageContext"

const EmptyCart = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <Fade in={true}>
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <div className="text-center md:space-y-4 space-y-3.5 text-gray-500">
          <h6 className="text-sm">{t("cart.emptyCart")}</h6>
          <Button
            onClick={() => navigate("/products")}
            size="large"
            color="success"
            sx={{ textTransform: "capitalize" }}
            variant="outlined"
          >
            {t("cart.continueShopping")}
          </Button>
        </div>
      </Container>
    </Fade>
  )
}

export default EmptyCart
