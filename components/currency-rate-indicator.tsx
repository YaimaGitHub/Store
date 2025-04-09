"use client"

import { useLocale } from "./locale-provider"
import { useTranslations } from "@/hooks/use-translations"
import { Badge } from "./ui/badge"
import { TrendingUp, ExternalLink, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export default function CurrencyRateIndicator() {
  const { currency, rateSource, lastRateUpdate } = useLocale()
  const { t } = useTranslations()

  // Determine if this is an informal market rate
  const isInformalRate = currency.isInformal

  // If it's not an informal rate, don't show the indicator
  if (!isInformalRate) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center">
            <Badge
              variant="outline"
              className="text-xs bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/30 dark:to-red-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition-colors"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="flex items-center gap-1">
                {t("currency.informalMarketRate")}
                <Info className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              </span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <div className="space-y-2">
            <h4 className="font-medium">{t("currency.informalMarketRate")}</h4>
            <p className="text-sm">{t("currency.informalMarketExplanation")}</p>
            {rateSource && (
              <div className="text-xs flex items-center mt-2 pt-2 border-t">
                <span>{t("currency.dataSource")}:</span>
                <a
                  href="https://eltoque.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 flex items-center ml-1"
                >
                  {rateSource} <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            {lastRateUpdate && (
              <div className="text-xs mt-1">
                {t("currency.lastUpdated")}: {lastRateUpdate.toLocaleString()}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
