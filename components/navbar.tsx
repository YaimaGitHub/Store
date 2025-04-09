"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "./cart-provider"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu } from "lucide-react"
import { Badge } from "./ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { usePathname } from "next/navigation"
import LocaleSelector from "./locale-selector"
import { useTranslations } from "@/hooks/use-translations"
import Logo from "./logo"
import SearchAutocomplete from "./search-autocomplete"
import MobileSearch from "./mobile-search"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslations()

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0)

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.products"), href: "/products" },
    { name: t("nav.categories"), href: "/products?view=categories" },
    { name: t("nav.exchangeRates"), href: "/exchange-rates" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="md:hidden mr-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Logo />

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center ml-auto">
          <LocaleSelector />
          <div className="hidden md:flex items-center mx-4 relative">
            <SearchAutocomplete />
          </div>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  {cartItemsCount}
                </Badge>
              )}
              <span className="sr-only">{t("common.cart")}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-2">
        <MobileSearch />
      </div>
    </header>
  )
}
