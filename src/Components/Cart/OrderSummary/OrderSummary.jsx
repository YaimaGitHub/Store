"use client"

import { Button, useMediaQuery } from "@mui/material"
import { groceryContext } from "../../Layout/Layout"
import { useContext } from "react"
import { checkoutContext } from "../Cart"
import { useLanguage } from "../../../contexts/LanguageContext"

const OrderSummary = ({ deliveryZone, deliveryType }) => {
  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState
  const [isProceedToCheckout, setIsProceedToCheckout] = useContext(checkoutContext)
  const { t } = useLanguage()

  // Media Query
  const isMediumScreen = useMediaQuery("(max-width:1024px)")

  const subtotal = Number.parseFloat(cartItems.reduce((total, item) => total + Number.parseFloat(item.total), 0))

  // Calculate delivery cost based on delivery type and zone
  const getDeliveryFee = () => {
    if (deliveryType === "pickup") return 0
    if (deliveryType === "home" && deliveryZone) {
      return deliveryZone.price || 0
    }
    return 0
  }

  const deliveryFee = getDeliveryFee()
  const total = subtotal + deliveryFee

  return (
    <div className="flex justify-center md:pt-16 col md:col-span-4 lg:col-span-1">
      <div className={`lg:space-y-4 sticky top-0 bottom-0 w-full max-w-[25rem] space-y-3`}>
        {/* Title */}
        <h3 className="lg:text-xl text-lg sm:font-semibold font-bold tracking-wide">{t("cart.orderSummary")}</h3>

        {/* Total Bill */}
        <table className="table-auto h-32 text-sm w-full">
          <tbody>
            {/* Subtotal */}
            <tr className="font-medium lg:text-gray-800 text-gray-6000">
              <td>{t("cart.subtotal")}</td>
              <td>
                $ {subtotal.toFixed(2)} {t("common.usd")}
              </td>
            </tr>
            {/* Delivery Charge */}
            <tr className="font-medium text-sm lg:text-gray-800 text-gray-600">
              <td>{t("cart.deliveryCharge")}</td>
              <td className={deliveryFee === 0 ? "text-green-600 font-semibold" : "text-gray-800"}>
                {deliveryFee === 0 ? t("cart.free") : `$ ${deliveryFee.toFixed(2)} ${t("common.usd")}`}
              </td>
            </tr>
            {/* Zone info if applicable */}
            {deliveryType === "home" && deliveryZone && (
              <tr className="font-medium text-xs text-gray-500">
                <td colSpan={2} className="italic">
                  {deliveryZone.name}
                </td>
              </tr>
            )}
            {/* Total */}
            <tr className="lg:font-medium font-semibold lg:text-lg border-t pt-2">
              <td className="pt-2">{t("cart.total")}</td>
              <td className="pt-2" style={{ color: "green" }}>
                $ {total.toFixed(2)} {t("common.usd")}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Proceed to checkout */}
        <Button
          fullWidth
          onClick={() => setIsProceedToCheckout(!isProceedToCheckout)}
          sx={{
            textTransform: "capitalize",
            transition: "display 1000s ease-in-out",
            display: isProceedToCheckout ? "none" : "block",
          }}
          variant="contained"
          size={isMediumScreen ? "small" : "medium"}
          color="success"
        >
          {t("cart.proceedToCheckout")}
        </Button>
      </div>
    </div>
  )
}

export default OrderSummary
