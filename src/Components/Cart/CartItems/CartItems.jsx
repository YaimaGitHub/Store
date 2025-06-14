"use client"

import { useContext } from "react"
import CartItemCard from "../CartItemCard/CartItemCard"
import { groceryContext } from "../../Layout/Layout"
import { useLanguage } from "../../../contexts/LanguageContext"

const CartItems = () => {
  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState
  const { t } = useLanguage()

  return (
    <div className="lg:space-y-10 space-y-5">
      {/* Title */}
      <h2 className="lg:text-2xl sm:text-xl text-lg sm:font-semibold font-bold ">{t("cart.title")}</h2>

      {/* Items Card list */}
      <div className="space-y-3">
        {cartItems.map((cartItem) => (
          <CartItemCard item={cartItem} key={cartItem.id} />
        ))}
      </div>
    </div>
  )
}

export default CartItems
