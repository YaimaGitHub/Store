"use client"

import { Button, Fade, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { groceryContext } from "../../Layout/Layout"
import { useContext, useState } from "react"
import GoBackButton from "../GoBackButton/GoBackButton"
import { handleSessionStorage } from "../../../utils/utils"
import PopUpDialog from "../../PopUpDialog/PopUpDialog"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../../contexts/LanguageContext"

const DeliveryForm = () => {
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState
  const [openDialog, setOpenDialog] = useState(false)
  const { t } = useLanguage()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  // Handle PlaceOrder
  const onSubmit = (data) => {
    setOpenDialog(!openDialog)
    // Setting DeliveryDetails in Storage
    handleSessionStorage("set", "deliveryDetails", data)
  }
  // Handle Dialog
  const handleOK = () => {
    // Reset the Cart_items
    handleSessionStorage("remove", "cartItems")
    setCartItems([])
    setOpenDialog(!openDialog)
    navigate("/")
  }

  return (
    <>
      <PopUpDialog open={openDialog} message={t("checkout.orderSuccess")} handleOk={handleOK} placeOrder={true} />
      <div className="md:mx-0 mx-auto space-y-4 max-w-[37rem]">
        {/* Go back Btn */}
        <GoBackButton />
        <div className="space-y-9 lg:space-y-10 ">
          {/* Title */}
          <h1 className="lg:text-2xl text-xl font-semibold text-gray-600">{t("checkout.title")}</h1>

          {/* Delivery Form */}
          <Fade in={true}>
            <form action="post" className="lg:space-y-8  space-y-7" onSubmit={handleSubmit(onSubmit)}>
              {/* Full */}
              <TextField
                {...register("full_name", {
                  required: t("checkout.nameRequired"),
                })}
                defaultValue={"John Doe"}
                label={t("checkout.fullName")}
                size="small"
                error={errors.full_name ? true : false}
                helperText={errors.full_name ? errors.full_name.message : ""}
                fullWidth
                color="success"
                variant="outlined"
              />

              {/* Email */}
              <TextField
                {...register("email", {
                  required: t("checkout.emailRequired"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("checkout.invalidEmail"),
                  },
                })}
                defaultValue={"john@gmail.com"}
                label={t("checkout.email")}
                size="small"
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ""}
                fullWidth
                color="success"
                variant="outlined"
              />

              {/* Address */}
              <TextField
                {...register("address", {
                  required: t("checkout.addressRequired"),
                })}
                defaultValue={"456 Street, fake town, New York"}
                label={t("checkout.address")}
                size="small"
                error={errors.address ? true : false}
                helperText={errors.address ? errors.address.message : ""}
                fullWidth
                placeholder="street, city, state"
                color="success"
                variant="outlined"
              />

              {/* Submit Button */}
              <Button type="submit" fullWidth variant="contained" sx={{ textTransform: "capitalize" }} color="success">
                {t("checkout.placeOrder")}
              </Button>
            </form>
          </Fade>
        </div>
      </div>
    </>
  )
}

export default DeliveryForm
