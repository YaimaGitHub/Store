"use client"

import { useRef } from "react"
import { useTranslations } from "@/hooks/use-translations"

// This is a simplified chart component using HTML/CSS
// In a production app, you might want to use a library like Chart.js, Recharts, or D3.js
export default function ExchangeRateChart({ rateData }) {
  const { t } = useTranslations()
  const chartRef = useRef(null)

  // Generate historical data based on current rates and trends
  // In a real app, you would fetch this data from an API
  const generateHistoricalData = () => {
    const currencies = ["USD", "EUR", "MLC"]
    const days = 7 // Last 7 days
    const today = new Date()

    const data = {}

    currencies.forEach((currency) => {
      const currentRate = rateData[currency.toLowerCase()].informal
      const trend = rateData[currency.toLowerCase()].trend
      const changePercent = rateData[currency.toLowerCase()].change / 100

      data[currency] = []

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Calculate a simulated historical rate based on current rate and trend
        // This is just for demonstration - real data would come from an API
        let factor = 1
        if (trend === "up") {
          factor = 1 - changePercent * (i / days)
        } else if (trend === "down") {
          factor = 1 + changePercent * (i / days)
        }

        const rate = currentRate * factor

        data[currency].push({
          date: date.toISOString().split("T")[0],
          rate: Math.round(rate * 100) / 100,
        })
      }
    })

    return data
  }

  const historicalData = generateHistoricalData()

  // Find the max rate to scale the chart properly
  const maxRate = Math.max(...Object.values(historicalData).flatMap((rates) => rates.map((item) => item.rate))) * 1.1 // Add 10% padding

  // Calculate the height percentage for each data point
  const getHeightPercentage = (rate) => {
    return (rate / maxRate) * 100
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
        <h3 className="text-lg font-medium mb-4">{t("currency.last7DaysTrend")}</h3>

        <div className="relative h-64" ref={chartRef}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
            <div>₱{Math.round(maxRate)}</div>
            <div>₱{Math.round(maxRate * 0.75)}</div>
            <div>₱{Math.round(maxRate * 0.5)}</div>
            <div>₱{Math.round(maxRate * 0.25)}</div>
            <div>₱0</div>
          </div>

          {/* Chart grid */}
          <div className="absolute left-12 right-0 top-0 bottom-0 border-l">
            <div className="h-1/4 border-b border-gray-200 dark:border-gray-700"></div>
            <div className="h-1/4 border-b border-gray-200 dark:border-gray-700"></div>
            <div className="h-1/4 border-b border-gray-200 dark:border-gray-700"></div>
            <div className="h-1/4 border-b border-gray-200 dark:border-gray-700"></div>
          </div>

          {/* Chart lines */}
          <div className="absolute left-12 right-0 top-0 bottom-0 flex">
            {Object.entries(historicalData).map(([currency, data], index) => {
              const colors = {
                USD: { line: "bg-blue-500", dot: "bg-blue-600" },
                EUR: { line: "bg-green-500", dot: "bg-green-600" },
                MLC: { line: "bg-purple-500", dot: "bg-purple-600" },
              }

              return (
                <div key={currency} className="flex-1 relative">
                  {/* Lines connecting dots */}
                  {data.map((point, i) => {
                    if (i === data.length - 1) return null

                    const currentHeight = getHeightPercentage(point.rate)
                    const nextHeight = getHeightPercentage(data[i + 1].rate)
                    const avgHeight = (currentHeight + nextHeight) / 2

                    return (
                      <div
                        key={`line-${i}`}
                        className={`absolute h-0.5 ${colors[currency].line}`}
                        style={{
                          left: `${(i / (data.length - 1)) * 100}%`,
                          right: `${100 - ((i + 1) / (data.length - 1)) * 100}%`,
                          bottom: `${avgHeight}%`,
                          transform: `rotate(${Math.atan2(nextHeight - currentHeight, 100 / (data.length - 1))}rad)`,
                          transformOrigin: "left bottom",
                        }}
                      ></div>
                    )
                  })}

                  {/* Data points */}
                  {data.map((point, i) => (
                    <div
                      key={`point-${i}`}
                      className={`absolute w-3 h-3 rounded-full ${colors[currency].dot} shadow-md`}
                      style={{
                        left: `${(i / (data.length - 1)) * 100}%`,
                        bottom: `${getHeightPercentage(point.rate)}%`,
                        transform: "translate(-50%, 50%)",
                      }}
                      title={`${currency}: ₱${point.rate} (${point.date})`}
                    ></div>
                  ))}
                </div>
              )
            })}
          </div>

          {/* X-axis labels */}
          <div className="absolute left-12 right-0 bottom-0 flex justify-between text-xs text-gray-500 pt-2">
            {historicalData.USD.map((point, i) => (
              <div key={`date-${i}`} className="text-center" style={{ width: `${100 / historicalData.USD.length}%` }}>
                {new Date(point.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center mt-6 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-sm">USD</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-sm">EUR</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
            <span className="text-sm">MLC</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-300 text-sm">
          <strong>{t("currency.note")}:</strong> {t("currency.simulatedDataDisclaimer")}
        </p>
      </div>
    </div>
  )
}
