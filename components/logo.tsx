"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function Logo() {
  const { t } = useTranslations()

  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="bg-primary p-1 rounded-md">
        <ShoppingBag className="h-6 w-6 text-white" />
      </div>
      <span className="font-bold text-xl hidden sm:inline-block">{t("common.shopHub")}</span>
    </Link>
  )
}
