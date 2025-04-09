import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { getAllProducts } from "@/lib/products"
import { Skeleton } from "@/components/ui/skeleton"

export default async function ProductsPage({ searchParams }) {
  const products = await getAllProducts()

  // Filter products based on search params
  const category = searchParams.category || ""
  const minPrice = searchParams.minPrice ? Number.parseInt(searchParams.minPrice) : 0
  const maxPrice = searchParams.maxPrice ? Number.parseInt(searchParams.maxPrice) : Number.POSITIVE_INFINITY

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category ? product.category.toLowerCase() === category.toLowerCase() : true
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice
    return matchesCategory && matchesPrice
  })

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Todos los Productos</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters />
        </div>

        <div className="w-full md:w-3/4">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={filteredProducts} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
    </div>
  )
}
