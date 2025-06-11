"use client"

import { createContext, useContext, useState } from "react"
import { translations } from "../translations/translations"

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("es") // Español por defecto

  const t = (key) => {
    const keys = key.split(".")
    let translation = translations[currentLanguage]

    for (const k of keys) {
      translation = translation?.[k]
    }

    return translation || key
  }

  const changeLanguage = (language) => {
    setCurrentLanguage(language)
  }

  return <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>{children}</LanguageContext.Provider>
}
