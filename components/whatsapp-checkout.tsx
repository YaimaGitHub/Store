"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "./cart-provider"
import { useLocale } from "./locale-provider"
import { WhatsappLogo } from "./icons/whatsapp-logo"
import QRCodeGenerator from "./qr-code"
import DeliveryOptions from "./delivery-options"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "@/hooks/use-translations"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define Cuban provinces and other locations
const locations = [
  // Cuban provinces
  { id: "havana", name: "La Habana", country: "Cuba" },
  { id: "santiago", name: "Santiago de Cuba", country: "Cuba" },
  { id: "camaguey", name: "Camagüey", country: "Cuba" },
  { id: "holguin", name: "Holguín", country: "Cuba" },
  { id: "guantanamo", name: "Guantánamo", country: "Cuba" },
  { id: "pinar_del_rio", name: "Pinar del Río", country: "Cuba" },
  { id: "matanzas", name: "Matanzas", country: "Cuba" },
  { id: "cienfuegos", name: "Cienfuegos", country: "Cuba" },
  { id: "villa_clara", name: "Villa Clara", country: "Cuba" },
  { id: "sancti_spiritus", name: "Sancti Spíritus", country: "Cuba" },
  { id: "ciego_de_avila", name: "Ciego de Ávila", country: "Cuba" },
  { id: "las_tunas", name: "Las Tunas", country: "Cuba" },
  { id: "granma", name: "Granma", country: "Cuba" },
  { id: "isla_juventud", name: "Isla de la Juventud", country: "Cuba" },
  { id: "artemisa", name: "Artemisa", country: "Cuba" },
  { id: "mayabeque", name: "Mayabeque", country: "Cuba" },

  // US states (just a few examples)
  { id: "new_york", name: "New York", country: "USA" },
  { id: "california", name: "California", country: "USA" },
  { id: "florida", name: "Florida", country: "USA" },
  { id: "texas", name: "Texas", country: "USA" },

  // Other countries (just a few examples)
  { id: "toronto", name: "Toronto", country: "Canada" },
  { id: "montreal", name: "Montreal", country: "Canada" },
  { id: "london", name: "London", country: "UK" },
  { id: "paris", name: "Paris", country: "France" },
  { id: "berlin", name: "Berlin", country: "Germany" },
  { id: "madrid", name: "Madrid", country: "Spain" },
]

export default function WhatsAppCheckout() {
  const { cart } = useCart()
  const { formatPrice, language, currency } = useLocale()
  const { t } = useTranslations()
  // Replace the useState for phoneNumber with a fixed store owner number
  const [phoneNumber] = useState("1234567890") // Replace with the store owner's actual WhatsApp number
  const [isOpen, setIsOpen] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    location: "",
    phoneNumber: "",
  })
  const [delivery, setDelivery] = useState({
    location: "",
    locationName: "",
    price: 0,
    date: undefined as Date | undefined,
    time: "",
  })

  // Generate a random order number when the dialog opens
  const handleOpenChange = (open: boolean) => {
    if (open && !orderNumber) {
      setOrderNumber(`ORD-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`)
    }
    setIsOpen(open)
  }

  const handleDeliveryChange = (newDelivery: {
    location: string
    locationName: string
    price: number
    date: Date | undefined
    time: string
  }) => {
    setDelivery(newDelivery)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleLocationChange = (value: string) => {
    const selectedLocation = locations.find((loc) => loc.id === value)
    setCustomerInfo((prev) => ({
      ...prev,
      location: value,
    }))
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = delivery.price
  const total = subtotal + deliveryFee

  const formatWhatsAppMessage = () => {
    // Create a tracking URL with the order number
    const trackingUrl = `https://shop-hub.vercel.app/track/${orderNumber}`

    // Format the message with order details
    let message = `*${t("whatsapp.newOrder")}: ${orderNumber}*\n\n`

    // Add customer information
    message += `*${t("whatsapp.customerInfo")}:*\n`
    message += `${t("checkout.firstName")}: ${customerInfo.firstName}\n`
    message += `${t("checkout.lastName")}: ${customerInfo.lastName}\n`
    message += `${t("checkout.address")}: ${customerInfo.address}\n`

    // Add location
    const selectedLocation = locations.find((loc) => loc.id === customerInfo.location)
    if (selectedLocation) {
      message += `${t("checkout.city")}: ${selectedLocation.name}, ${selectedLocation.country}\n`
    }

    message += `${t("checkout.phone")}: ${customerInfo.phoneNumber}\n\n`

    message += `*${t("whatsapp.language")}:* ${language.name}\n`
    message += `*${t("whatsapp.currency")}:* ${currency.name}\n\n`
    message += `*${t("whatsapp.items")}:*\n`

    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`
    })

    message += `\n*${t("common.subtotal")}:* ${formatPrice(subtotal)}`
    message += `\n*${t("common.total")}:* ${formatPrice(total)}`

    if (delivery.date) {
      message += `\n\n*${t("checkout.deliveryDate")}:* ${delivery.date.toLocaleDateString()}`
      message += `\n*${t("checkout.deliveryTime")}:* ${delivery.time}`
    }

    message += `\n\n*${t("whatsapp.trackYourOrder")}:* ${trackingUrl}`
    message += `\n\n${t("whatsapp.thankYouOrder")}`

    return encodeURIComponent(message)
  }

  const handleSubmit = () => {
    // Format phone number (remove spaces, dashes, etc.)
    const formattedNumber = phoneNumber.replace(/\D/g, "")

    // Create WhatsApp URL with the message
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${formatWhatsAppMessage()}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  const isFormValid = () => {
    return (
      customerInfo.firstName.trim() !== "" &&
      customerInfo.lastName.trim() !== "" &&
      customerInfo.address.trim() !== "" &&
      customerInfo.location !== "" &&
      delivery.location !== "" &&
      delivery.date !== undefined &&
      delivery.time !== ""
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full bg-green-500 hover:bg-green-600 text-white">
          <WhatsappLogo className="mr-2 h-5 w-5" />
          {t("common.orderViaWhatsApp")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("common.orderViaWhatsApp")}</DialogTitle>
          <DialogDescription>{t("whatsapp.enterNumber")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-4">
            <h3 className="font-medium">{t("whatsapp.customerInfo")}</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="firstName">{t("checkout.firstName")}</Label>
                <Input id="firstName" name="firstName" value={customerInfo.firstName} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">{t("checkout.lastName")}</Label>
                <Input id="lastName" name="lastName" value={customerInfo.lastName} onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">{t("checkout.address")}</Label>
              <Input id="address" name="address" value={customerInfo.address} onChange={handleInputChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">{t("checkout.city")}</Label>
              <Select value={customerInfo.location} onValueChange={handleLocationChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t("checkout.selectCity")} />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  <div className="font-semibold px-2 py-1 text-xs text-gray-500">Cuba</div>
                  {locations
                    .filter((loc) => loc.country === "Cuba")
                    .map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}

                  <div className="font-semibold px-2 py-1 text-xs text-gray-500 mt-2">United States</div>
                  {locations
                    .filter((loc) => loc.country === "USA")
                    .map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}

                  <div className="font-semibold px-2 py-1 text-xs text-gray-500 mt-2">Other Countries</div>
                  {locations
                    .filter((loc) => loc.country !== "Cuba" && loc.country !== "USA")
                    .map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}, {location.country}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="customerPhone">{t("checkout.phone")}</Label>
              <Input
                id="customerPhone"
                name="phoneNumber"
                value={customerInfo.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="storePhone">{t("whatsapp.whatsappNumber")}</Label>
              <div className="p-2 border rounded-md bg-gray-50">
                <span>{phoneNumber}</span>
                <p className="text-xs text-gray-500 mt-1">{t("whatsapp.storeOwnerNumber")}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label>{t("orderConfirmation.orderNumber")}</Label>
            <div className="flex items-center justify-between p-2 border rounded-md">
              <span className="font-medium">{orderNumber}</span>
              <div className="flex justify-center">
                <QRCodeGenerator value={`https://shop-hub.vercel.app/track/${orderNumber}`} size={80} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{t("whatsapp.qrCodeMessage")}</p>
          </div>

          <Separator />

          <DeliveryOptions onDeliveryChange={handleDeliveryChange} />

          <Separator />

          <div className="space-y-2">
            <h3 className="font-medium">{t("common.orderSummary")}</h3>
            <div className="space-y-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm pt-2">
              <span>{t("common.subtotal")}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>
                {t("common.shipping")} ({delivery.locationName || t("checkout.deliveryLocation")})
              </span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>{t("common.total")}</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="bg-green-500 hover:bg-green-600"
          >
            <WhatsappLogo className="mr-2 h-5 w-5" />
            {t("whatsapp.sendToWhatsApp")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
