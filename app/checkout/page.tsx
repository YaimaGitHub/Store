"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { useLocale } from "@/components/locale-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import WhatsAppCheckout from "@/components/whatsapp-checkout"
import DeliveryOptions from "@/components/delivery-options"
import QRCodeGenerator from "@/components/qr-code"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { formatPrice, language, currency } = useLocale()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [delivery, setDelivery] = useState({
    location: "",
    locationName: "",
    price: 0,
    date: undefined as Date | undefined,
    time: "",
  })

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = delivery.price
  const tax = subtotal * 0.07
  const total = subtotal + deliveryFee + tax

  const handleDeliveryChange = (newDelivery: {
    location: string
    locationName: string
    price: number
    date: Date | undefined
    time: string
  }) => {
    setDelivery(newDelivery)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Generate order number
    const generatedOrderNumber = `ORD-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`
    setOrderNumber(generatedOrderNumber)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    setOrderComplete(true)
    clearCart()

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    })
  }

  if (cart.length === 0 && !orderComplete) {
    router.push("/cart")
    return null
  }

  if (orderComplete) {
    return (
      <div className="container px-4 py-16 mx-auto max-w-3xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been received and is being processed. You will receive a
          confirmation email shortly.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Order Number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Order Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total Amount:</span>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>

          <div className="flex justify-center mb-4">
            <QRCodeGenerator value={`https://shop-hub.vercel.app/track/${orderNumber}`} size={150} />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Scan this QR code to track your order or share it with the recipient.
          </p>

          {delivery.date && (
            <div className="mt-4 text-left">
              <h3 className="font-medium mb-2">Delivery Information</h3>
              <p>Location: {delivery.locationName}</p>
              <p>Date: {delivery.date.toLocaleDateString()}</p>
              <p>Time: {delivery.time}</p>
            </div>
          )}
        </div>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Link href="/cart" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to cart
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" required className="mt-1" />
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
                <DeliveryOptions onDeliveryChange={handleDeliveryChange} />
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                <Tabs defaultValue="card">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" required className="mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiration">Expiration Date</Label>
                          <Input id="expiration" placeholder="MM/YY" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" required className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal" className="mt-4">
                    <div className="text-center py-8">
                      <p className="mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                      <Button type="button" variant="outline" className="mx-auto">
                        <img src="/placeholder.svg?height=20&width=80&text=PayPal" alt="PayPal" className="h-5" />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !delivery.location || !delivery.date || !delivery.time}
                >
                  {loading ? "Processing..." : "Place Order"}
                  {!loading && <CreditCard className="ml-2 h-4 w-4" />}
                </Button>
                <div className="mt-4">
                  <p className="text-center text-sm text-muted-foreground mb-2">Or checkout via WhatsApp</p>
                  <WhatsAppCheckout />
                </div>
              </>
            </div>
          </form>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

            <div className="max-h-80 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex py-2 border-b">
                  <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg?height=64&width=64"}
                      alt={item.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flow-root">
              <div className="flex justify-between py-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">{formatPrice(subtotal)}</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="text-gray-600">Delivery ({delivery.locationName || "Not selected"})</p>
                <p className="font-medium">{formatPrice(deliveryFee)}</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="text-gray-600">Tax</p>
                <p className="font-medium">{formatPrice(tax)}</p>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between py-2">
                <p className="font-semibold">Total</p>
                <p className="font-bold">{formatPrice(total)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
