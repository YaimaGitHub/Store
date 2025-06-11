"use client"

import { Fade } from "@mui/material"
import { useContext, useState, useEffect } from "react"
import { groceryContext } from "../../Layout/Layout"
import GoBackButton from "../GoBackButton/GoBackButton"
import { handleSessionStorage } from "../../../utils/utils"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../../contexts/LanguageContext"
import DeliveryTypeSelector from "./DeliveryTypeSelector"
import DeliveryDetailsForm from "./DeliveryDetailsForm"
import WhatsAppSender from "./WhatsAppSender"

const DeliveryForm = ({ onDeliveryDataChange }) => {
  const { cartItemsState } = useContext(groceryContext)
  const [cartItems, setCartItems] = cartItemsState
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [deliveryType, setDeliveryType] = useState("")
  const [deliveryZone, setDeliveryZone] = useState(null)
  const [step, setStep] = useState(1) // 1: delivery type, 2: details form, 3: whatsapp
  const [orderData, setOrderData] = useState(null)
  const { t } = useLanguage()

  const navigate = useNavigate()

  // Update parent component when delivery data changes
  useEffect(() => {
    onDeliveryDataChange({
      deliveryType,
      deliveryZone,
    })
  }, [deliveryType, deliveryZone, onDeliveryDataChange])

  // Handle delivery type selection
  const handleDeliveryTypeSelect = (type) => {
    setDeliveryType(type)
    setStep(2)
  }

  // Handle zone selection
  const handleZoneSelect = (zone) => {
    setDeliveryZone(zone)
  }

  // Handle form submission
  const handleFormSubmit = (data) => {
    const completeOrderData = {
      ...data,
      deliveryType,
      deliveryZone,
      cartItems,
      orderNumber: generateOrderNumber(),
      orderDate: new Date().toLocaleString(),
    }

    setOrderData(completeOrderData)
    setShowWhatsApp(true)
    setStep(3)

    // Setting DeliveryDetails in Storage
    handleSessionStorage("set", "deliveryDetails", completeOrderData)
  }

  // Generate unique order number
  const generateOrderNumber = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `ORD-${timestamp}-${random}`
  }

  // Handle successful WhatsApp send
  const handleWhatsAppSuccess = () => {
    // Reset the Cart_items
    handleSessionStorage("remove", "cartItems")
    setCartItems([])
    navigate("/")
  }

  const handleBackToDeliveryType = () => {
    setStep(1)
    setDeliveryType("")
    setDeliveryZone(null)
  }

  const handleBackToForm = () => {
    setStep(2)
    setShowWhatsApp(false)
  }

  return (
    <div className="md:mx-0 mx-auto space-y-4 max-w-[37rem]">
      {/* Go back Btn */}
      {step > 1 && <GoBackButton />}

      <div className="space-y-9 lg:space-y-10">
        <Fade in={true}>
          <div>
            {step === 1 ? (
              <DeliveryTypeSelector onSelect={handleDeliveryTypeSelect} />
            ) : step === 2 ? (
              <DeliveryDetailsForm
                deliveryType={deliveryType}
                onSubmit={handleFormSubmit}
                onBack={handleBackToDeliveryType}
                onZoneSelect={handleZoneSelect}
                selectedZone={deliveryZone}
              />
            ) : (
              <WhatsAppSender orderData={orderData} onSuccess={handleWhatsAppSuccess} onBack={handleBackToForm} />
            )}
          </div>
        </Fade>
      </div>
    </div>
  )
}

export default DeliveryForm
