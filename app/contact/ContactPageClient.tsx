"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "@/hooks/use-translations"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPageClient() {
  const { t } = useTranslations()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: t("contact.messageSent"),
      description: t("contact.thankYouMessage"),
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setLoading(false)
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">{t("contact.title")}</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">{t("contact.subtitle")}</p>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">{t("contact.contactInfo")}</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t("contact.email")}</p>
                  <a href="mailto:info@shophub.com" className="text-gray-600 dark:text-gray-400 hover:underline">
                    casimiroes@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t("contact.phone")}</p>
                  <a href="tel:+5354690878" className="text-gray-600 dark:text-gray-400 hover:underline">
                    +53 (54) 690-878
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t("contact.address")}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Holguín
                    <br />
                    Holguín 
                    <br />
                    Cuba, CU 90600
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t("contact.businessHours")}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("about.monday")} - {t("about.friday")}: 9:00 AM - 6:00 PM
                    <br />
                    {t("about.saturday")}: 10:00 AM - 5:00 PM
                    <br />
                    {t("about.sunday")}: {t("about.closed")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{t("contact.sendMessage")}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.name")}</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.emailAddress")}</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t("contact.subject")}</Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("contact.sending") : t("contact.send")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
