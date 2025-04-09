"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations } from "@/hooks/use-translations"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslations()

  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category") as string] : [],
  )

  const categories = [
    { id: "electronics", label: t("categories.electronics") },
    { id: "clothing", label: t("categories.clothing") },
    { id: "home", label: t("categories.home") },
    { id: "books", label: t("categories.books") },
    { id: "sports", label: t("categories.sports") },
    { id: "beauty", label: t("categories.beauty") },
  ]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0])
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString())
    }

    if (priceRange[1] < 1000) {
      params.set("maxPrice", priceRange[1].toString())
    }

    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t("common.filters")}</h3>
        <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
          {t("common.resetFilters")}
        </Button>
      </div>

      <Separator />

      <Accordion type="multiple" defaultValue={["categories", "price"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>{t("products.categories")}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>{t("products.priceRange")}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} min={0} max={1000} step={10} onValueChange={setPriceRange} />
              <div className="flex items-center space-x-4">
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="minPrice">{t("products.min")}</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    min={0}
                    max={priceRange[1]}
                  />
                </div>
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="maxPrice">{t("products.max")}</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    min={priceRange[0]}
                    max={1000}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>{t("products.availability")}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" />
                <Label htmlFor="in-stock">{t("common.inStock")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="out-of-stock" />
                <Label htmlFor="out-of-stock">{t("common.outOfStock")}</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ratings">
          <AccordionTrigger>{t("products.ratings")}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`}>{rating}+ Stars</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="w-full">
        {t("common.applyFilters")}
      </Button>
    </div>
  )
}
