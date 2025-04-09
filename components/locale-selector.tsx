"use client"

import { useState } from "react"
import { Check, ChevronDown, Globe, RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "./locale-provider"
import { Badge } from "./ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useTranslations } from "@/hooks/use-translations"

export default function LocaleSelector() {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    languages,
    currencies,
    lastRateUpdate,
    isUpdatingRates,
    refreshRates,
    rateSource,
    rateError,
  } = useLocale()
  const { t } = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  // Format the last update time
  const formatLastUpdate = () => {
    if (!lastRateUpdate) return t("currency.neverUpdated")

    const now = new Date()
    const diffMs = now.getTime() - lastRateUpdate.getTime()
    const diffSec = Math.floor(diffMs / 1000)

    if (diffSec < 60) return t("currency.updatedSecondsAgo").replace("{seconds}", diffSec.toString())

    const diffMin = Math.floor(diffSec / 60)
    if (diffMin < 60) return t("currency.updatedMinutesAgo").replace("{minutes}", diffMin.toString())

    const diffHour = Math.floor(diffMin / 60)
    return t("currency.updatedHoursAgo").replace("{hours}", diffHour.toString())
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            {language.code.toUpperCase()} | {currency.code.replace("_INFORMAL", "")}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>{t("currency.settings")}</DropdownMenuLabel>

        <div className="px-2 py-1.5 text-xs text-muted-foreground flex items-center justify-between">
          <span>{t("currency.exchangeRates")}</span>
          <div className="flex items-center gap-1">
            {isUpdatingRates ? (
              <Badge variant="outline" className="text-xs py-0 h-5">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                {t("currency.updating")}
              </Badge>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        refreshRates()
                      }}
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("currency.refreshRates")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <span className="text-xs">{formatLastUpdate()}</span>
          </div>
        </div>

        {rateSource && (
          <div className="px-2 py-1.5 text-xs flex items-center justify-between">
            <span className="text-muted-foreground">{t("currency.dataSource")}:</span>
            <a
              href="https://eltoque.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {rateSource} <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        )}

        {rateError && (
          <div className="px-2 py-1.5 text-xs text-red-500">
            {t("currency.rateError")}: {rateError}
          </div>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuLabel>{t("currency.language")}</DropdownMenuLabel>
        <DropdownMenuGroup>
          {languages.map((lang) => (
            <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang)} className="cursor-pointer">
              {lang.name}
              {language.code === lang.code && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>{t("currency.currency")}</DropdownMenuLabel>
        <DropdownMenuGroup className="max-h-[200px] overflow-y-auto">
          {currencies.map((curr) => (
            <DropdownMenuItem key={curr.code} onClick={() => setCurrency(curr)} className="cursor-pointer">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span>
                    {curr.symbol} {curr.name} ({curr.code.replace("_INFORMAL", "")})
                  </span>
                  {currency.code === curr.code && <Check className="ml-auto h-4 w-4" />}
                </div>
                {curr.isInformal && (
                  <Badge variant="outline" className="mt-1 text-xs">
                    {t("currency.informalMarket")}
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
