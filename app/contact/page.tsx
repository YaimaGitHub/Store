import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | ShopHub",
  description: "Get in touch with the ShopHub team. We're here to help with any questions or concerns.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
