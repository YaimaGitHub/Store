"use client"

import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { useLocale } from "@/components/locale-provider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, ShoppingBag, ArrowRight, Info } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import WhatsAppCheckout from "@/components/whatsapp-checkout"
import { useTranslations } from "@/hooks/use-translations"
import { useToast } from "@/hooks/use-toast"
import CurrencyRateIndicator from "@/components/currency-rate-indicator"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const { formatPrice, currency } = useLocale()
  const { t } = useTranslations()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  // Removed shipping calculation
  const discount = promoCode === "DISCOUNT20" ? subtotal * 0.2 : 0
  const total = subtotal - discount

  const handleRemoveItem = (item) => {
    removeFromCart(item.id)
    // Show toast notification when item is removed
    toast({
      title: t("cart.productRemoved"),
      description: `${item.name} ${t("cart.hasBeenRemovedFromCart")}`,
      variant: "destructive",
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: t("cart.cartCleared"),
      description: t("cart.allItemsRemoved"),
      variant: "destructive",
    })
  }

  if (cart.length === 0) {
    return (
      <div className="container px-4 py-16 mx-auto text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-4">{t("cart.emptyCart")}</h1>
        <p className="text-gray-500 mb-8">{t("cart.emptyCartMessage")}</p>
        <Link href="/products">
          <Button>{t("common.continueShopping")}</Button>
        </Link>
      </div>
    )
  }

  // Check if we're using a special currency that needs explanation
  const isSpecialCurrency = currency.isInformal || ["CUP", "CUP_INFORMAL", "CUC", "MLC"].includes(currency.code)

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t("cart.yourCart")}</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flow-root">
                <ul className="-my-6 divide-y">
                  {cart.map((item) => (
                    <li key={item.id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg?height=100&width=100"}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium">
                            <h3>
                              <Link href={`/products/${item.id}`} className="hover:underline">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{t(`categories.${item.category}`)}</p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 border rounded-l-md"
                            >
                              -
                            </button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-12 text-center border-y rounded-none"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 border rounded-r-md"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item)}
                              className="text-red-500 hover:text-red-700"
                              aria-label={`${t("cart.removeItem")} ${item.name}`}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t px-6 py-4">
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleClearCart}>
                  {t("cart.clearCart")}
                </Button>
                <Link href="/products">
                  <Button variant="outline">{t("common.continueShopping")}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-medium mb-4">{t("common.orderSummary")}</h2>

            {isSpecialCurrency && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md border text-sm">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">{t("currency.usingSpecialCurrency")}</p>
                    <p className="text-gray-600">{t("currency.pricesAdjustedExplanation")}</p>
                    <div className="mt-2">
                      <CurrencyRateIndicator />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flow-root">
              <div className="flex justify-between py-2">
                <p className="text-gray-600">{t("common.subtotal")}</p>
                <p className="font-medium">{formatPrice(subtotal)}</p>
              </div>

              {discount > 0 && (
                <div className="flex justify-between py-2 text-green-600">
                  <p>{t("cart.discount")}</p>
                  <p>-{formatPrice(discount)}</p>
                </div>
              )}

              <Separator className="my-4" />

              <div className="flex justify-between py-2">
                <p className="font-semibold">{t("common.total")}</p>
                <p className="font-bold">{formatPrice(total)}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex gap-2 mb-4">
                <Input
                  type="text"
                  placeholder={t("cart.promoCode")}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="outline" onClick={() => {}}>
                  {t("cart.apply")}
                </Button>
              </div>

              <div className="space-y-2">
                <Link href="/checkout">
                  <Button className="w-full">
                    {t("common.checkout")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <WhatsAppCheckout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
