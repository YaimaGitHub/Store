"use client"

// This service would connect to a real API in production
// For now, we'll simulate real-time data with regular updates

import { useState, useEffect } from "react"

// Base exchange rates (relative to USD)
const baseRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.59,
  CUP: 24, // Official rate
  CUC: 1, // Cuban Convertible Peso (pegged to USD)
  MLC: 1.05, // Freely Convertible Currency in Cuba
}

// Informal market rates in Cuba (these fluctuate significantly)
const informalMarketRates = {
  CUP: {
    min: 120, // Minimum observed rate to USD
    max: 350, // Maximum observed rate to USD
  },
}

// Simulated inflation data for Cuba
const inflationData = {
  monthly: 0.05, // 5% monthly inflation (example)
  annual: 0.45, // 45% annual inflation (example)
}

// Function to get current rates with random fluctuations to simulate real-time changes
export function getCurrentRates() {
  // Add random fluctuation to simulate market changes
  const fluctuation = () => 1 + (Math.random() * 0.04 - 0.02) // ±2% random fluctuation

  // Calculate informal market rate for CUP with some randomness
  const informalCUP =
    informalMarketRates.CUP.min + Math.random() * (informalMarketRates.CUP.max - informalMarketRates.CUP.min)

  return {
    USD: baseRates.USD * fluctuation(),
    EUR: baseRates.EUR * fluctuation(),
    GBP: baseRates.GBP * fluctuation(),
    JPY: baseRates.JPY * fluctuation(),
    CUP: baseRates.CUP * fluctuation(), // Official rate
    CUP_INFORMAL: informalCUP, // Informal market rate
    CUC: baseRates.CUC * fluctuation(),
    MLC: baseRates.MLC * fluctuation(),
  }
}

// Hook to get and periodically update currency rates
export function useCurrencyRates(updateInterval = 60000) {
  // Default: update every minute
  const [rates, setRates] = useState(getCurrentRates())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [loading, setLoading] = useState(false)

  // Function to fetch fresh rates
  const updateRates = () => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setRates(getCurrentRates())
      setLastUpdated(new Date())
      setLoading(false)
    }, 500)
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

  return { rates, lastUpdated, loading, updateRates }
}

// Get inflation-adjusted rate
export function getInflationAdjustedRate(rate: number, months = 1) {
  // Compound monthly inflation
  return rate * Math.pow(1 + inflationData.monthly, months)
}

// Format currency with proper symbol and decimal places
export function formatCurrencyValue(amount: number, currencyCode: string) {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CUP: "₱",
    CUC: "CUC$",
    MLC: "MLC$",
  }

  const symbol = currencySymbols[currencyCode] || currencyCode

  // JPY typically doesn't use decimal places
  const decimalPlaces = currencyCode === "JPY" ? 0 : 2

  return `${symbol}${amount.toFixed(decimalPlaces)}`
}
