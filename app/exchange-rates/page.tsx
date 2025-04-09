import type { Metadata } from "next"
import ExchangeRateDisplay from "@/components/exchange-rate-display"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, DollarSign, Euro, Landmark } from "lucide-react"

export const metadata: Metadata = {
  title: "Tipos de Cambio en Cuba | ShopHub",
  description: "Real-time Cuban currency exchange rates from the informal market",
}

export default function ExchangeRatesPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Cuban Exchange Rates</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
           Tipos de cambio en tiempo real para las monedas cubanas, tanto de fuentes oficiales como del mercado informal. Todos los precios de los productos en nuestra tienda se actualizan automáticamente según estos tipos de cambio al cambiar su preferencia de moneda.
          </p>
        </div>

        <ExchangeRateDisplay />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                Official vs Informal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Cuba has a complex monetary system with multiple currencies and exchange rates. The official exchange
                rate set by the Cuban government often differs significantly from the informal market rate used in
                everyday transactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-green-500" />
                Currency Conversion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Our e-commerce platform uses real-time data from El Toque, a trusted source for Cuban informal market
                exchange rates. This allows us to provide the most accurate pricing for our customers, whether they're
                using USD, EUR, or Cuban currencies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-purple-500" />
                Shopping with Local Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                When you select a Cuban currency like CUP (Cuban Peso) with the informal market option, all prices will
                automatically be converted using the latest informal market rates, giving you a realistic view of costs
                in the local economy.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Cuban Currency Exchange</CardTitle>
              <CardDescription>A guide to navigating Cuba's complex monetary system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Cuba's monetary system has undergone significant changes in recent years. Currently, there are several
                currencies in circulation, each with different values and uses:
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Cuban Peso (CUP)</strong> - The official national currency. The government maintains an
                  official exchange rate, but the informal market rate is often much higher.
                </li>
                <li>
                  <strong>US Dollar (USD)</strong> - Not officially in circulation, but widely accepted in tourist areas
                  and the informal market. The USD/CUP exchange rate is a key economic indicator.
                </li>
                <li>
                  <strong>Freely Convertible Currency (MLC)</strong> - A digital currency used in certain stores, pegged
                  to the USD but with its own market dynamics.
                </li>
              </ul>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-start gap-3 mt-4">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800 dark:text-amber-300">Important for Travelers</h3>
                  <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
                    If you're planning to visit Cuba, it's advisable to stay informed about the current exchange rates.
                    The rates can fluctuate significantly, and using the most favorable exchange method can make a
                    substantial difference in your expenses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
