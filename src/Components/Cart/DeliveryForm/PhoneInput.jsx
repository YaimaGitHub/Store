"use client"

import { TextField, MenuItem, Box, Typography } from "@mui/material"
import { useState } from "react"
import { useLanguage } from "../../../contexts/LanguageContext"

const PhoneInput = ({ value, onChange, error, helperText }) => {
  const { t } = useLanguage()
  const [selectedCountry, setSelectedCountry] = useState("cu")

  // Country codes with flags and dial codes
  const countries = [
    { code: "cu", name: "Cuba", dial: "+53", flag: "🇨🇺" },
    { code: "us", name: "United States", dial: "+1", flag: "🇺🇸" },
    { code: "mx", name: "Mexico", dial: "+52", flag: "🇲🇽" },
    { code: "es", name: "Spain", dial: "+34", flag: "🇪🇸" },
    { code: "ar", name: "Argentina", dial: "+54", flag: "🇦🇷" },
    { code: "br", name: "Brazil", dial: "+55", flag: "🇧🇷" },
    { code: "co", name: "Colombia", dial: "+57", flag: "🇨🇴" },
    { code: "ve", name: "Venezuela", dial: "+58", flag: "🇻🇪" },
    { code: "pe", name: "Peru", dial: "+51", flag: "🇵🇪" },
    { code: "cl", name: "Chile", dial: "+56", flag: "🇨🇱" },
    { code: "ec", name: "Ecuador", dial: "+593", flag: "🇪🇨" },
    { code: "uy", name: "Uruguay", dial: "+598", flag: "🇺🇾" },
    { code: "py", name: "Paraguay", dial: "+595", flag: "🇵🇾" },
    { code: "bo", name: "Bolivia", dial: "+591", flag: "🇧🇴" },
    { code: "cr", name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
    { code: "pa", name: "Panama", dial: "+507", flag: "🇵🇦" },
    { code: "gt", name: "Guatemala", dial: "+502", flag: "🇬🇹" },
    { code: "hn", name: "Honduras", dial: "+504", flag: "🇭🇳" },
    { code: "sv", name: "El Salvador", dial: "+503", flag: "🇸🇻" },
    { code: "ni", name: "Nicaragua", dial: "+505", flag: "🇳🇮" },
    { code: "do", name: "Dominican Republic", dial: "+1", flag: "🇩🇴" },
    { code: "pr", name: "Puerto Rico", dial: "+1", flag: "🇵🇷" },
    { code: "jm", name: "Jamaica", dial: "+1", flag: "🇯🇲" },
    { code: "ht", name: "Haiti", dial: "+509", flag: "🇭🇹" },
    { code: "ca", name: "Canada", dial: "+1", flag: "🇨🇦" },
    { code: "fr", name: "France", dial: "+33", flag: "🇫🇷" },
    { code: "de", name: "Germany", dial: "+49", flag: "🇩🇪" },
    { code: "it", name: "Italy", dial: "+39", flag: "🇮🇹" },
    { code: "pt", name: "Portugal", dial: "+351", flag: "🇵🇹" },
    { code: "gb", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
    { code: "ru", name: "Russia", dial: "+7", flag: "🇷🇺" },
    { code: "cn", name: "China", dial: "+86", flag: "🇨🇳" },
    { code: "jp", name: "Japan", dial: "+81", flag: "🇯🇵" },
    { code: "kr", name: "South Korea", dial: "+82", flag: "🇰🇷" },
    { code: "in", name: "India", dial: "+91", flag: "🇮🇳" },
    { code: "au", name: "Australia", dial: "+61", flag: "🇦🇺" },
  ]

  const selectedCountryData = countries.find((country) => country.code === selectedCountry)

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode)
    const country = countries.find((c) => c.code === countryCode)
    // Update the phone number with new country code
    const phoneNumber = value?.replace(/^\+\d+\s*/, "") || ""
    onChange(`${country.dial} ${phoneNumber}`)
  }

  const handlePhoneChange = (phoneNumber) => {
    // Keep the country code and update only the number part
    onChange(`${selectedCountryData.dial} ${phoneNumber}`)
  }

  // Extract phone number without country code
  const phoneNumber = value?.replace(/^\+\d+\s*/, "") || ""

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* Country Selector */}
        <TextField
          select
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
          sx={{ minWidth: 120 }}
          size="medium"
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            },
          }}
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span style={{ fontSize: "1.2em" }}>{country.flag}</span>
                <span>{country.dial}</span>
              </Box>
            </MenuItem>
          ))}
        </TextField>

        {/* Phone Number Input */}
        <TextField
          fullWidth
          value={phoneNumber}
          onChange={(e) => {
            // Only allow numbers, spaces, and dashes
            const cleaned = e.target.value.replace(/[^\d\s-]/g, "")
            handlePhoneChange(cleaned)
          }}
          placeholder="5X XXX XXXX"
          error={error}
          size="medium"
          InputProps={{
            startAdornment: (
              <Box sx={{ display: "flex", alignItems: "center", mr: 1, color: "text.secondary" }}>
                <span style={{ fontSize: "1.1em", marginRight: 4 }}>{selectedCountryData.flag}</span>
                <span>{selectedCountryData.dial}</span>
              </Box>
            ),
          }}
        />
      </Box>
      {helperText && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
          {helperText}
        </Typography>
      )}
    </Box>
  )
}

export default PhoneInput
