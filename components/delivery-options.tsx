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
  { id: "havana_center", name: "Havana Center", price: 5 },
  { id: "havana_east", name: "Havana East", price: 7 },
  { id: "havana_west", name: "Havana West", price: 7 },
  { id: "marianao", name: "Marianao", price: 8 },
  { id: "playa", name: "Playa", price: 6 },
  { id: "cerro", name: "Cerro", price: 7.5 },
  { id: "vedado", name: "Vedado", price: 5.5 },
  { id: "miramar", name: "Miramar", price: 6.5 },
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
