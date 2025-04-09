import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"
import ProductCarousel from "@/components/product-carousel"
import { getFeaturedProducts, getAllProducts } from "@/lib/products"
import { TranslatedText } from "@/components/translated-text"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()
  const allProducts = await getAllProducts()

  // Get new arrivals (products marked as new)
  const newArrivals = allProducts.filter((product) => product.isNew).slice(0, 8)

  // Get discounted products
  const discountedProducts = allProducts.filter((product) => product.discount > 0).slice(0, 8)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  <TranslatedText section="home" textKey="heroTitle" />
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  <TranslatedText section="home" textKey="heroDescription" />
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="gap-1.5">
                    <TranslatedText section="home" textKey="shopNow" />
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Featured products showcase"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Carousels */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <ProductCarousel products={newArrivals} title={<TranslatedText section="home" textKey="newArrivals" />} />
        </div>
      </section>

      <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <ProductCarousel
            products={discountedProducts}
            title={<TranslatedText section="home" textKey="specialOffers" />}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <TranslatedText section="home" textKey="featuredProducts" />
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                <TranslatedText section="home" textKey="featuredDescription" />
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <ProductGrid products={featuredProducts} />
          </div>
          <div className="flex justify-center">
            <Link href="/products">
              <Button variant="outline" size="lg">
                <TranslatedText section="home" textKey="viewAllProducts" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <TranslatedText section="home" textKey="shopByCategory" />
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                <TranslatedText section="home" textKey="categoryDescription" />
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {["Electronics", "Clothing", "Home & Kitchen"].map((category) => (
              <Link href={`/products?category=${category.toLowerCase()}`} key={category} className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={`/placeholder.svg?height=300&width=400&text=${category}`}
                    alt={category}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
