"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function MobileSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useTranslations()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={t("common.search")}
        className="w-full pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
        <span className="sr-only">{t("search.search")}</span>
      </Button>
    </form>
  )
}
