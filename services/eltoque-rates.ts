"use client"

import { useState, useEffect } from "react"

// This interface represents the structure of data we expect from eltoque.com
interface ElToqueRateData {
  date: string // Date of the rate update
  usd: {
    informal: number // Informal USD to CUP rate
    official: number // Official USD to CUP rate
    trend: "up" | "down" | "stable" // Trend direction
    change: number // Percentage change
  }
  eur: {
    informal: number // Informal EUR to CUP rate
    official: number // Official EUR to CUP rate
    trend: "up" | "down" | "stable"
    change: number
  }
  mlc: {
    informal: number // Informal MLC to CUP rate
    official: number // Official MLC to CUP rate
    trend: "up" | "down" | "stable"
    change: number
  }
  source: string // Source of the data
  lastUpdated: string // Timestamp of last update
}

// In production, this would be a real API call to eltoque.com or a proxy service
// For now, we'll simulate the data based on recent observations
async function fetchElToqueRates(): Promise<ElToqueRateData> {
  // In production, replace this with a real API call:
  // const response = await fetch('https://your-proxy-api.com/eltoque-rates');
  // return await response.json();

  // Simulated delay to mimic network request
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Simulated data based on recent observations from eltoque.com
  // In production, this would come from the actual API
  return {
    date: new Date().toISOString().split("T")[0],
    usd: {
      informal: 360, // Example rate: 260 CUP per 1 USD in informal market
      official: 24, // Official rate: 24 CUP per 1 USD
      trend: "up",
      change: 0.7,
    },
    eur: {
      informal: 365, // Example rate: 365 CUP per 1 EUR in informal market
      official: 26.2, // Official rate
      trend: "up",
      change: 0.5,
    },
    mlc: {
      informal: 262, // Example rate: 262 CUP per 1 MLC in informal market
      official: 24, // Official rate
      trend: "stable",
      change: 0,
    },
    source: "El Toque - Informal Market Rates",
    lastUpdated: new Date().toISOString(),
  }
}

// Hook to get and periodically update currency rates from El Toque
export function useElToqueRates(updateInterval = 300000) {
  // Default: update every 5 minutes
  const [rateData, setRateData] = useState<ElToqueRateData | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Function to fetch fresh rates
  const updateRates = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchElToqueRates()
      setRateData(data)
      setLastUpdated(new Date())
    } catch (err) {
      console.error("Error fetching El Toque rates:", err)
      setError("Failed to fetch current exchange rates")
    } finally {
      setLoading(false)
    }
  }

  // Set up periodic updates
  useEffect(() => {
    // Initial update
    updateRates()

    // Set interval for updates
    const interval = setInterval(updateRates, updateInterval)

    // Clean up on unmount
    return () => clearInterval(interval)
  }, [updateInterval])

  return { rateData, lastUpdated, loading, error, updateRates }
}

// Convert a price from USD to the target currency using El Toque rates
export function convertPriceWithElToqueRates(
  priceInUSD: number,
  targetCurrency: string,
  rateData: ElToqueRateData | null,
  useInformalRate = false,
): number {
  if (!rateData) return priceInUSD // If no rate data, return original price

  // Handle different currencies
  switch (targetCurrency) {
    case "USD":
      return priceInUSD
    case "EUR":
      // For EUR, first convert USD to EUR using approximate rate
      return priceInUSD * 0.92
    case "CUP":
      // For CUP, use either official or informal rate
      return priceInUSD * (useInformalRate ? rateData.usd.informal : rateData.usd.official)
    case "CUP_INFORMAL":
      // Always use informal rate for CUP_INFORMAL
      return priceInUSD * rateData.usd.informal
    case "MLC":
      // For MLC, convert using MLC rate
      if (useInformalRate) {
        // First convert USD to CUP using informal rate, then CUP to MLC
        return (priceInUSD * rateData.usd.informal) / rateData.mlc.informal
      } else {
        // Use official rate (typically 1:1 with USD)
        return priceInUSD
      }
    default:
      return priceInUSD
  }
}

// Format currency with proper symbol and decimal places
export function formatCurrencyValue(amount: number, currencyCode: string) {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CUP: "₱",
    CUP_INFORMAL: "₱",
    MLC: "MLC$",
  }

  const symbol = currencySymbols[currencyCode] || currencyCode

  // JPY typically doesn't use decimal places
  const decimalPlaces = currencyCode === "JPY" ? 0 : 2

  return `${symbol}${amount.toFixed(decimalPlaces)}`
}
