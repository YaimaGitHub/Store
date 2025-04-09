"use client"

import { useState } from "react"
import { useLocale } from "./locale-provider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useTranslations } from "@/hooks/use-translations"

// Define delivery locations with their prices
const deliveryLocations = [
  { id: "Ferreiro", name: "Ferreiro", price: 250 },
  { id: "Vista Alegre", name: "Vista Alegre", price: 250 },
  { id: "Pastorita", name: "Pastorita", price: 7 },
  { id: "Altamira", name: "Altamira", price: 8 },
  { id: "Versalles", name: "Versalles", price: 6 },
  { id: "Carretera del morro", name: "Carretera del morro", price: 6.5 },
  { id: "Los cangrejitos", name: "Los cangrejitos", price: 250 },
  { id: "Alameda", name: "Alameda", price: 250 },
  { id: "Vista hermosa", name: "Vista hermosa", price: 7.5 },
  { id: "Chicharrones", name: "Chicharrones", price: 5.5 },
  { id: "Distrito Jose Marti (hasta micro 9)", name: "Distrito Jose Marti (hasta micro 9)", price: 250 },
  { id: "Quintero", name: "Quintero", price: 250 },
  { id: "Marialina", name: "Marialina", price: 250 },
  { id: "Los pinos", name: "Los pinos", price: 250 },
  { id: "Portuondo", name: "Portuondo", price: 5.5 },
  { id: "Sorribe", name: "Sorribe", price: 6.5 },
  { id: "Los olmos", name: "Los olmos", price: 5.5 },
  { id: "Veguita de Galo", name: "Veguita de Galo", price: 5.5 },
  { id: "Nuevo vista alegre", name: "Nuevo vista alegre", price: 6.5 },
  { id: "Agüero", name: "Agüero", price: 5.5 },
  { id: "Reparto San Pedrito", name: "Reparto San Pedrito", price: 250 },
  { id: "Modelo", name: "Modelo", price: 6.5 },
  { id: "Martí (hasta la iglesia)", name: "Martí (hasta la iglesia)", price: 250 },
  { id: "Calle 4", name: "Calle 4", price: 6.5 },
  { id: "Reparto Sueño", name: "Reparto Sueño", price: 250 },
  { id: "30 de Noviembre", name: "30 de Noviembre", price: 6.5 },
  { id: "Micro 7", name: "Micro 7", price: 250 },
  { id: "Micro 8", name: "Micro 8", price: 250 },
  { id: "Reparto Rajayoga", name: "Reparto Rajayoga", price: 0.694 }, 
  { id: "Antonio maceo", name: "Antonio maceo", price: 0.694 },
]

// Define available delivery time slots
const deliveryTimeSlots = [
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "1:00 PM - 3:00 PM",
  "3:00 PM - 5:00 PM",
  "5:00 PM - 7:00 PM",
]

interface DeliveryOptionsProps {
  onDeliveryChange: (delivery: {
    location: string
    locationName: string
    price: number
    date: Date | undefined
    time: string
  }) => void
}

export default function DeliveryOptions({ onDeliveryChange }: DeliveryOptionsProps) {
  const { formatPrice } = useLocale()
  const { t } = useTranslations()
  const [location, setLocation] = useState(deliveryLocations[0].id)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>(deliveryTimeSlots[0])

  // Find the selected location object
  const selectedLocation = deliveryLocations.find((loc) => loc.id === location) || deliveryLocations[0]

  // Update parent component when delivery options change
  const handleLocationChange = (value: string) => {
    setLocation(value)
    const loc = deliveryLocations.find((l) => l.id === value) || deliveryLocations[0]
    onDeliveryChange({
      location: value,
      locationName: loc.name,
      price: loc.price,
      date,
      time,
    })
  }

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    onDeliveryChange({
      location,
      locationName: selectedLocation.name,
      price: selectedLocation.price,
      date: newDate,
      time,
    })
  }

  const handleTimeChange = (newTime: string) => {
    setTime(newTime)
    onDeliveryChange({
      location,
      locationName: selectedLocation.name,
      price: selectedLocation.price,
      date,
      time: newTime,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{t("checkout.deliveryLocation")}</h3>
        <RadioGroup value={location} onValueChange={handleLocationChange} className="space-y-2">
          {deliveryLocations.map((loc) => (
            <div key={loc.id} className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value={loc.id} id={`location-${loc.id}`} />
              <Label htmlFor={`location-${loc.id}`} className="flex justify-between w-full cursor-pointer">
                <span>{loc.name}</span>
                <span className="font-medium">{formatPrice(loc.price)}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="delivery-date" className="text-base mb-2 block">
            {t("checkout.deliveryDate")}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>{t("checkout.selectDate")}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                disabled={(date) => date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 14))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="delivery-time" className="text-base mb-2 block">
            {t("checkout.deliveryTime")}
          </Label>
          <Select value={time} onValueChange={handleTimeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("checkout.selectTime")} />
            </SelectTrigger>
            <SelectContent>
              {deliveryTimeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {slot}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
