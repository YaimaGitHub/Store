// This is a mock data service that would be replaced with a real API or database in production

// Mock product data
const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium noise-cancelling headphones with crystal-clear sound quality and comfortable over-ear design. Perfect for music lovers and professionals alike.",
    price: 129.99,
    originalPrice: 159.99,
    category: "electronics",
    inStock: true,
    isNew: true,
    discount: 20,
    rating: 4.5,
    reviewCount: 128,
    images: [
      "/untitled-7.png?height=600&width=600",
      "/untitled-7.png?height=600&width=600&text=Side",
      "/untitled-7.png?height=600&width=600&text=Back",
    ],
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
    ],
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    description:
      "Track your fitness goals with this advanced smart tracker. Features heart rate monitoring, sleep tracking, and water resistance up to 50 meters.",
    price: 89.99,
    category: "electronics",
    inStock: true,
    isNew: false,
    discount: 0,
    rating: 4.2,
    reviewCount: 95,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600&text=Side"],
    features: ["Heart rate monitoring", "Sleep tracking", "Water resistant (50m)", "7-day battery life"],
  },
  {
    id: "3",
    name: "Zapato de mujer (Fashion)",
    description:
      "Zapatos de mujer muy comodos. Talla: # 42",
    price: 11.11111111111111,
    originalPrice: 9.722222222222222,
    category: "clothing",
    inStock: true,
    isNew: false,
    discount: 15,
    rating: 4.0,
    reviewCount: 42,
    images: ["/Ropa_calzado_accesorios/Zapato de mujer (Fashion).jpg?height=600&width=600", "/Ropa_calzado_accesorios/Zapato de mujer (Fashion).jpg?height=600&width=600&text=Back"],
  },
  {
    id: "4",
    name: "Professional Chef's Knife",
    description:
      "High-quality stainless steel chef's knife with ergonomic handle. Perfect for professional chefs and home cooking enthusiasts.",
    price: 79.99,
    category: "home",
    inStock: true,
    isNew: false,
    discount: 0,
    rating: 4.8,
    reviewCount: 67,
    images: ["/placeholder.svg?height=600&width=600"],
    features: ["8-inch blade", "High-carbon stainless steel", "Ergonomic handle", "Dishwasher safe"],
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    description:
      "Compact and powerful Bluetooth speaker with 360° sound and waterproof design. Perfect for outdoor adventures or home use.",
    price: 59.99,
    originalPrice: 69.99,
    category: "electronics",
    inStock: false,
    isNew: false,
    discount: 15,
    rating: 4.3,
    reviewCount: 89,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600&text=Back"],
    features: ["10-hour battery life", "Waterproof (IPX7)", "Bluetooth 5.0", "Built-in microphone"],
  },
  {
    id: "6",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic coffee mugs. Each mug holds 12 oz and is microwave and dishwasher safe.",
    price: 34.99,
    category: "home",
    inStock: true,
    isNew: true,
    discount: 0,
    rating: 4.6,
    reviewCount: 23,
    images: ["/placeholder.svg?height=600&width=600"],
  },
  {
    id: "7",
    name: "Leather Wallet",
    description:
      "Genuine leather wallet with multiple card slots and RFID blocking technology. Slim design fits comfortably in your pocket.",
    price: 49.99,
    originalPrice: 59.99,
    category: "accessories",
    inStock: true,
    isNew: false,
    discount: 15,
    rating: 4.4,
    reviewCount: 56,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600&text=Inside"],
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    description:
      "Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly and BPA-free.",
    price: 29.99,
    category: "home",
    inStock: true,
    isNew: false,
    discount: 0,
    rating: 4.7,
    reviewCount: 112,
    images: ["/placeholder.svg?height=600&width=600"],
    features: ["24oz capacity", "Double-walled insulation", "BPA-free", "Leak-proof lid"],
  },
]

// Get all products
export async function getAllProducts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products
}

// Get featured products
export async function getFeaturedProducts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.filter((product) => product.isNew || product.discount > 0).slice(0, 4)
}

// Get product by ID
export async function getProductById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.find((product) => product.id === id)
}

// Get related products
export async function getRelatedProducts(category: string, currentProductId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.filter((product) => product.category === category && product.id !== currentProductId).slice(0, 4)
}
