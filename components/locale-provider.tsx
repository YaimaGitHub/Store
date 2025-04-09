"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type React from "react"
import { useElToqueRates, convertPriceWithElToqueRates, formatCurrencyValue } from "@/services/eltoque-rates"

type Currency = {
  code: string
  symbol: string
  name: string
  rate: number // Exchange rate relative to USD
  isInformal?: boolean // Whether this is an informal market rate
  useInformalRate?: boolean // Whether to use informal market rates for conversion
}

type Language = {
  code: string
  name: string
}

type LocaleContextType = {
  language: Language
  setLanguage: (language: Language) => void
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (price: number) => string
  languages: Language[]
  currencies: Currency[]
  lastRateUpdate: Date | null
  isUpdatingRates: boolean
  refreshRates: () => void
  rateSource: string | null
  rateError: string | null
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
]

// Base currencies - rates will be updated from El Toque
const baseCurrencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "CUP", symbol: "₱", name: "Cuban Peso (Official)", rate: 24 },
  {
    code: "CUP_INFORMAL",
    symbol: "₱",
    name: "Cuban Peso (Mercado informal)",
    rate: 360,
    isInformal: true,
    useInformalRate: true,
  },
  { code: "MLC", symbol: "MLC$", name: "Moneda Cubana Libremente Convertible", rate: 1 },
]

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(languages[0])
  const [currencies, setCurrencies] = useState<Currency[]>(baseCurrencies)
  const [currency, setCurrency] = useState<Currency>(currencies[0])
  const { rateData, lastUpdated, loading, error, updateRates } = useElToqueRates(300000) // Update every 5 minutes

  // Update currency rates when El Toque data changes
  useEffect(() => {
    if (rateData) {
      const updatedCurrencies = baseCurrencies.map((curr) => {
        let updatedRate = curr.rate

        // Update rates based on El Toque data
        if (curr.code === "CUP") {
          updatedRate = rateData.usd.official
        } else if (curr.code === "CUP_INFORMAL") {
          updatedRate = rateData.usd.informal
        } else if (curr.code === "EUR") {
          // Approximate EUR rate based on USD
          updatedRate = 0.92
        } else if (curr.code === "MLC") {
          // MLC is typically 1:1 with USD for official rate
          updatedRate = 1
        }

        return {
          ...curr,
          rate: updatedRate,
        }
      })

      setCurrencies(updatedCurrencies)

      // Also update the current selected currency if its rate changed
      const updatedSelectedCurrency = updatedCurrencies.find((c) => c.code === currency.code)
      if (updatedSelectedCurrency && updatedSelectedCurrency.rate !== currency.rate) {
        setCurrency(updatedSelectedCurrency)
      }
    }
  }, [rateData])

  // Load saved preferences from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    const savedCurrency = localStorage.getItem("currency")

    if (savedLanguage) {
      const foundLanguage = languages.find((lang) => lang.code === savedLanguage)
      if (foundLanguage) setLanguage(foundLanguage)
    }

    if (savedCurrency) {
      const foundCurrency = currencies.find((curr) => curr.code === savedCurrency)
      if (foundCurrency) setCurrency(foundCurrency)
    }
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("language", language.code)
    localStorage.setItem("currency", currency.code)
  }, [language, currency])

  const formatPrice = (price: number): string => {
    // Use El Toque rates for conversion if available
    if (rateData) {
      const convertedPrice = convertPriceWithElToqueRates(
        price,
        currency.code,
        rateData,
        currency.useInformalRate || false,
      )
      return formatCurrencyValue(convertedPrice, currency.code.replace("_INFORMAL", ""))
    }

    // Fallback to simple conversion if El Toque data is not available
    const convertedPrice = price * currency.rate
    return formatCurrencyValue(convertedPrice, currency.code.replace("_INFORMAL", ""))
  }

  return (
    <LocaleContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        formatPrice,
        languages,
        currencies,
        lastRateUpdate: lastUpdated,
        isUpdatingRates: loading,
        refreshRates: updateRates,
        rateSource: rateData ? "El Toque" : null,
        rateError: error,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
