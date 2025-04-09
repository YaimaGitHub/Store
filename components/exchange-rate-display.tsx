"use client"

import { useElToqueRates } from "@/services/eltoque-rates"
import { useTranslations } from "@/hooks/use-translations"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, TrendingUp, TrendingDown, Minus, ExternalLink, AlertCircle } from "lucide-react"
import { useState } from "react"
import ExchangeRateChart from "./exchange-rate-chart"

export default function ExchangeRateDisplay() {
  const { rateData, lastUpdated, loading, error, updateRates } = useElToqueRates()
  const { t } = useTranslations()
  const [activeView, setActiveView] = useState<"table" | "chart">("table")

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-red-500"
      case "down":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gray-50 dark:bg-gray-800 rounded-t-lg border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{t("currency.exchangeRates")}</CardTitle>
            <CardDescription className="mt-1">
              {t("currency.cubanInformalMarket")} - {rateData ? formatDate(rateData.lastUpdated) : ""}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={updateRates}
              disabled={loading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? t("currency.updating") : t("currency.refresh")}
            </Button>
          </div>
        </div>
      </CardHeader>

      <Tabs
        defaultValue="table"
        className="w-full"
        onValueChange={(value) => setActiveView(value as "table" | "chart")}
      >
        <div className="px-6 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="table">{t("currency.tableView")}</TabsTrigger>
            <TabsTrigger value="chart">{t("currency.chartView")}</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-6">
          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-300">{t("currency.errorLoadingRates")}</h3>
                <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
              </div>
            </div>
          ) : !rateData ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ) : (
            <>
              <TabsContent value="table" className="mt-0">
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="px-4 py-3 text-left font-medium">{t("currency.currency")}</th>
                        <th className="px-4 py-3 text-center font-medium">{t("currency.officialRate")}</th>
                        <th className="px-4 py-3 text-center font-medium">{t("currency.informalRate")}</th>
                        <th className="px-4 py-3 text-center font-medium">{t("currency.change")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">USD</span>
                            <span className="text-xs text-gray-500">{t("currency.usDollar")}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-mono">₱ {rateData.usd.official.toFixed(2)}</td>
                        <td className="px-4 py-4 text-center font-mono font-bold">
                          ₱ {rateData.usd.informal.toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center">
                            <Badge
                              variant={
                                rateData.usd.trend === "up"
                                  ? "destructive"
                                  : rateData.usd.trend === "down"
                                    ? "default"
                                    : "outline"
                              }
                              className="gap-1"
                            >
                              {getTrendIcon(rateData.usd.trend)}
                              <span className={getTrendColor(rateData.usd.trend)}>
                                {rateData.usd.change > 0 ? "+" : ""}
                                {rateData.usd.change.toFixed(1)}%
                              </span>
                            </Badge>
                          </div>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">EUR</span>
                            <span className="text-xs text-gray-500">{t("currency.euro")}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-mono">₱ {rateData.eur.official.toFixed(2)}</td>
                        <td className="px-4 py-4 text-center font-mono font-bold">
                          ₱ {rateData.eur.informal.toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center">
                            <Badge
                              variant={
                                rateData.eur.trend === "up"
                                  ? "destructive"
                                  : rateData.eur.trend === "down"
                                    ? "default"
                                    : "outline"
                              }
                              className="gap-1"
                            >
                              {getTrendIcon(rateData.eur.trend)}
                              <span className={getTrendColor(rateData.eur.trend)}>
                                {rateData.eur.change > 0 ? "+" : ""}
                                {rateData.eur.change.toFixed(1)}%
                              </span>
                            </Badge>
                          </div>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">MLC</span>
                            <span className="text-xs text-gray-500">{t("currency.mlc")}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-mono">₱ {rateData.mlc.official.toFixed(2)}</td>
                        <td className="px-4 py-4 text-center font-mono font-bold">
                          ₱ {rateData.mlc.informal.toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center">
                            <Badge
                              variant={
                                rateData.mlc.trend === "up"
                                  ? "destructive"
                                  : rateData.mlc.trend === "down"
                                    ? "default"
                                    : "outline"
                              }
                              className="gap-1"
                            >
                              {getTrendIcon(rateData.mlc.trend)}
                              <span className={getTrendColor(rateData.mlc.trend)}>
                                {rateData.mlc.change > 0 ? "+" : ""}
                                {rateData.mlc.change.toFixed(1)}%
                              </span>
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                    {t("currency.whatDoesThisMean")}
                  </h3>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">{t("currency.exchangeRateExplanation")}</p>
                </div>
              </TabsContent>

              <TabsContent value="chart" className="mt-0">
                <ExchangeRateChart rateData={rateData} />
              </TabsContent>
            </>
          )}
        </CardContent>
      </Tabs>

      <CardFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-lg border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="text-xs text-gray-500">{t("currency.ratesDisclaimer")}</div>
        <a
          href="https://eltoque.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:text-blue-700 flex items-center"
        >
          {t("currency.dataSource")}: El Toque <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </CardFooter>
    </Card>
  )
}
