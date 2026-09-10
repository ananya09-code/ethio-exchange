import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RateComparisonChartProps = {
  currency: string;
};

type BankRate = {
  bank: string;
  buy: number;
  sell: number;
};

const ratesByCurrency: Record<string, BankRate[]> = {
  USD: [
    {
      bank: "CBE",
      buy: 144.85,
      sell: 146.2,
    },
    {
      bank: "Dashen",
      buy: 144.9,
      sell: 146.1,
    },
    {
      bank: "Awash",
      buy: 144.75,
      sell: 146.05,
    },
    {
      bank: "Abyssinia",
      buy: 144.8,
      sell: 146.15,
    },
    {
      bank: "Coop",
      buy: 144.7,
      sell: 145.95,
    },
  ],

  EUR: [
    {
      bank: "CBE",
      buy: 169.4,
      sell: 171.2,
    },
    {
      bank: "Dashen",
      buy: 169.6,
      sell: 171.0,
    },
    {
      bank: "Awash",
      buy: 169.3,
      sell: 170.9,
    },
    {
      bank: "Abyssinia",
      buy: 169.5,
      sell: 171.1,
    },
    {
      bank: "Coop",
      buy: 169.2,
      sell: 170.8,
    },
  ],

  GBP: [
    {
      bank: "CBE",
      buy: 195.1,
      sell: 197.3,
    },
    {
      bank: "Dashen",
      buy: 195.4,
      sell: 197.0,
    },
    {
      bank: "Awash",
      buy: 194.9,
      sell: 196.9,
    },
    {
      bank: "Abyssinia",
      buy: 195.2,
      sell: 197.1,
    },
    {
      bank: "Coop",
      buy: 194.8,
      sell: 196.7,
    },
  ],

  AED: [
    {
      bank: "CBE",
      buy: 39.35,
      sell: 39.8,
    },
    {
      bank: "Dashen",
      buy: 39.4,
      sell: 39.75,
    },
    {
      bank: "Awash",
      buy: 39.3,
      sell: 39.7,
    },
    {
      bank: "Abyssinia",
      buy: 39.35,
      sell: 39.78,
    },
    {
      bank: "Coop",
      buy: 39.25,
      sell: 39.65,
    },
  ],

  SAR: [
    {
      bank: "CBE",
      buy: 38.55,
      sell: 39.0,
    },
    {
      bank: "Dashen",
      buy: 38.6,
      sell: 38.95,
    },
    {
      bank: "Awash",
      buy: 38.5,
      sell: 38.9,
    },
    {
      bank: "Abyssinia",
      buy: 38.55,
      sell: 38.98,
    },
    {
      bank: "Coop",
      buy: 38.45,
      sell: 38.85,
    },
  ],
};

export default function RateComparisonChart({
  currency,
}: RateComparisonChartProps) {
  const data = ratesByCurrency[currency] ?? [];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">Buy vs Sell Rates</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Compare {currency} exchange rates across banks.
            </p>
          </div>

          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            {currency} / ETB
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
              barGap={6}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-muted"
              />

              <XAxis
                dataKey="bank"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs"
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                width={48}
                tickMargin={8}
                tickFormatter={(value) => value.toFixed(1)}
                domain={["dataMin - 1", "dataMax + 1"]}
              />

              <Tooltip
                cursor={{
                  fill: "hsl(var(--muted) / 0.4)",
                }}
                formatter={(value: number, name: string) => [
                  value.toFixed(2),
                  name === "buy" ? "Buy" : "Sell",
                ]}
                labelFormatter={(label) => `${label} Bank`}
              />

              <Bar
                dataKey="buy"
                name="buy"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />

              <Bar
                dataKey="sell"
                name="sell"
                fill="#93c5fd"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 border-t pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-blue-600" />
            Buy rate
          </div>

          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-blue-300" />
            Sell rate
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
