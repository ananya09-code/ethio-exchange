import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Currency = "USD" | "EUR" | "GBP";
type RateType = "buy" | "sell" | "average";
type Period = "7D" | "30D" | "90D" | "1Y";

type RatePoint = {
  date: string;
  buy: number;
  sell: number;
  average: number;
};

const currencies: Currency[] = ["USD", "EUR", "GBP"];

const periods: Period[] = ["7D", "30D", "90D", "1Y"];

const rateLabels: Record<RateType, string> = {
  buy: "Buy",
  sell: "Sell",
  average: "Average",
};

/*
 * Temporary data.
 *
 * Replace this with data from your backend later.
 */
const chartData: Record<Currency, RatePoint[]> = {
  USD: [
    { date: "Sep 4", buy: 144.2, sell: 145.8, average: 145.0 },
    { date: "Sep 5", buy: 144.5, sell: 146.0, average: 145.25 },
    { date: "Sep 6", buy: 144.7, sell: 146.1, average: 145.4 },
    { date: "Sep 7", buy: 144.8, sell: 146.2, average: 145.5 },
    { date: "Sep 8", buy: 145.0, sell: 146.4, average: 145.7 },
    { date: "Sep 9", buy: 145.2, sell: 146.5, average: 145.85 },
    { date: "Sep 10", buy: 145.4, sell: 146.7, average: 146.05 },
  ],

  EUR: [
    { date: "Sep 4", buy: 168.2, sell: 170.0, average: 169.1 },
    { date: "Sep 5", buy: 168.5, sell: 170.3, average: 169.4 },
    { date: "Sep 6", buy: 168.8, sell: 170.5, average: 169.65 },
    { date: "Sep 7", buy: 169.0, sell: 170.8, average: 169.9 },
    { date: "Sep 8", buy: 169.3, sell: 171.0, average: 170.15 },
    { date: "Sep 9", buy: 169.5, sell: 171.2, average: 170.35 },
    { date: "Sep 10", buy: 169.7, sell: 171.4, average: 170.55 },
  ],

  GBP: [
    { date: "Sep 4", buy: 194.2, sell: 196.0, average: 195.1 },
    { date: "Sep 5", buy: 194.5, sell: 196.3, average: 195.4 },
    { date: "Sep 6", buy: 194.8, sell: 196.5, average: 195.65 },
    { date: "Sep 7", buy: 195.0, sell: 196.8, average: 195.9 },
    { date: "Sep 8", buy: 195.2, sell: 197.0, average: 196.1 },
    { date: "Sep 9", buy: 195.5, sell: 197.2, average: 196.35 },
    { date: "Sep 10", buy: 195.8, sell: 197.5, average: 196.65 },
  ],
};

export default function ExchangeRateChart() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rateType, setRateType] = useState<RateType>("average");
  const [period, setPeriod] = useState<Period>("7D");

  const data = useMemo(() => {
    return chartData[currency];
  }, [currency]);

  const currentRate = data[data.length - 1]?.[rateType] ?? 0;
  const previousRate = data[data.length - 2]?.[rateType] ?? currentRate;

  const change = currentRate - previousRate;
  const changePercent = previousRate === 0 ? 0 : (change / previousRate) * 100;

  return (
    <Card className="h-full">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-base">Exchange Rate History</CardTitle>

            <CardDescription>
              Historical {currency}/ETB exchange rate
            </CardDescription>
          </div>

          {/* Currency */}
          <div className="flex rounded-lg border bg-muted/40 p-1">
            {currencies.map((item) => (
              <Button
                key={item}
                variant={currency === item ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setCurrency(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Rate + change */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight">
                {currentRate.toFixed(2)}
              </span>

              <span className="text-sm text-muted-foreground">ETB</span>
            </div>

            <p
              className={`mt-1 text-xs ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </p>
          </div>

          {/* Buy / Sell / Average */}
          <div className="flex rounded-lg border bg-muted/40 p-1">
            {(Object.keys(rateLabels) as RateType[]).map((type) => (
              <Button
                key={type}
                variant={rateType === type ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setRateType(type)}
              >
                {rateLabels[type]}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} className="stroke-muted" />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs"
              />

              <YAxis
                domain={["auto", "auto"]}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={45}
                tickFormatter={(value: any) => Number(value).toFixed(0)}
                className="text-xs"
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                }}
                formatter={(value: any) => [
                  `${Number(value).toFixed(2)} ETB`,
                  rateLabels[rateType],
                ]}
              />

              <Line
                type="monotone"
                dataKey={rateType}
                stroke="currentColor"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                className="text-primary"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Period */}
        <div className="mt-4 flex justify-end">
          <div className="flex rounded-lg border bg-muted/40 p-1">
            {periods.map((item) => (
              <Button
                key={item}
                variant={period === item ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2.5 text-xs"
                onClick={() => setPeriod(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
