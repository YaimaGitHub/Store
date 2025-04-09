import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopHub</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Su solución integral para todas sus necesidades. Productos de calidad, precios competitivos y un servicio excepcional.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=electronics"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Electrónica
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=clothing"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Ropa, calzado y accesorios
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=home"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Hogar y Cocina
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicio al Cliente</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Contacta con nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Política de Envío
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Devoluciones y Reembolsos
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  FAQ (Preguntas frecuentes)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Nuestra Historia
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Carreras
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 mt-8">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ShopHub. Reservados todos los derechos.
          </p>
        </div>
      </div>
    </footer>
  )
}
