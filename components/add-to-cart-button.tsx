"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "./cart-provider"
import { useLocale } from "./locale-provider"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "@/hooks/use-translations"
import { useCartAnimation } from "./cart-animation-provider"

export default function AddToCartButton({ product, disabled = false, compact = false }) {
  const { addToCart } = useCart()
  const { formatPrice } = useLocale()
  const { toast } = useToast()
  const { t } = useTranslations()
  const { animateToCart } = useCartAnimation()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleAddToCart = () => {
    // Ensure product has the necessary properties
    const productToAdd = {
      ...product,
      image: product.image || (product.images && product.images.length > 0 ? product.images[0] : null),
    }

    addToCart(productToAdd, quantity)

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)

    // Trigger animation if button ref is available
    if (buttonRef.current) {
      animateToCart(buttonRef.current, productToAdd.image || "/placeholder.svg?height=100&width=100")
    }

    // Enhanced toast notification with translation
    toast({
      title: t("cart.productAdded"),
      description: `${product.name} (${quantity}) ${t("cart.hasBeenAddedToCart")} ${formatPrice(product.price * quantity)}.`,
      variant: "success",
    })
  }

  if (compact) {
    return (
      <Button
        ref={buttonRef}
        onClick={handleAddToCart}
        disabled={disabled || isAdded}
        className="w-full"
        variant={isAdded ? "outline" : "default"}
      >
        {isAdded ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            {t("common.added")}
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t("common.addToCart")}
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <Button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
        >
          -
        </Button>
        <div className="h-8 px-4 flex items-center justify-center border-y">{quantity}</div>
        <Button
          onClick={() => setQuantity(quantity + 1)}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
        >
          +
        </Button>
      </div>

      <Button ref={buttonRef} onClick={handleAddToCart} disabled={disabled || isAdded} className="w-full" size="lg">
        {isAdded ? (
          <>
            <Check className="h-5 w-5 mr-2" />
            {t("cart.addedToCart")}
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5 mr-2" />
            {t("common.addToCart")}
          </>
        )}
      </Button>
    </div>
  )
}
