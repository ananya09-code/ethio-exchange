import { useState } from "react";
import { ArrowDown, ArrowUp, CalendarDays } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CurrencySelector from "@/components/compare-ui/CurrencySelector";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

type HistoryPoint = {
  date: string;
  buy: number;
  sell: number;
  spread: number;
};

type HistoryResponse = {
  currency: string;
  base_currency: string;
  range: string;

  summary: {
    current_buy: number;
    current_sell: number;
    period_high: number;
    period_low: number;
    buy_change_percent: number;
    sell_change_percent: number;
  };

  history: HistoryPoint[];
};

function HistoryPage() {
  const [currency, setCurrency] = useState("USD");
  const [range, setRange] = useState("7D");

  /*
   * Replace this with your API hook.
   *
   * Example:
   *
   * const { data, isLoading, error } = useQuery({
   *   queryKey: ["history", currency, range],
   *   queryFn: () => getRateHistory(currency, range),
   * });
   */

  const data: HistoryResponse = {
    currency,
    base_currency: "ETB",
    range,

    summary: {
      current_buy: 148.52,
      current_sell: 151.48,
      period_high: 151.48,
      period_low: 147.82,
      buy_change_percent: 0.47,
      sell_change_percent: 0.46,
    },

    history: [
      {
        date: "Sep 04",
        buy: 147.82,
        sell: 150.78,
        spread: 2.96,
      },
      {
        date: "Sep 05",
        buy: 148.04,
        sell: 151.02,
        spread: 2.98,
      },
      {
        date: "Sep 06",
        buy: 148.18,
        sell: 151.16,
        spread: 2.98,
      },
      {
        date: "Sep 07",
        buy: 148.26,
        sell: 151.24,
        spread: 2.98,
      },
      {
        date: "Sep 08",
        buy: 148.42,
        sell: 151.38,
        spread: 2.96,
      },
      {
        date: "Sep 09",
        buy: 148.52,
        sell: 151.48,
        spread: 2.96,
      },
    ],
  };

  const { summary } = data;

  return (
    <main className="space-y-6">
      {/* Header */}
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Rate History</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Track how exchange rates have changed over time.
        </p>
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CurrencySelector value={currency} onChange={setCurrency} />

        <div className="flex w-full overflow-x-auto rounded-lg border bg-card p-1 sm:w-auto">
          {["7D", "30D", "3M", "6M", "1Y"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRange(option)}
              className={`h-8 min-w-12 rounded-md px-3 text-xs font-medium transition-colors ${
                range === option
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Current Buy"
          value={`${summary.current_buy.toFixed(2)} ETB`}
          change={summary.buy_change_percent}
        />

        <SummaryCard
          label="Current Sell"
          value={`${summary.current_sell.toFixed(2)} ETB`}
          change={summary.sell_change_percent}
        />

        <SummaryCard
          label="Period High"
          value={`${summary.period_high.toFixed(2)} ETB`}
        />

        <SummaryCard
          label="Period Low"
          value={`${summary.period_low.toFixed(2)} ETB`}
        />
      </section>

      {/* Chart */}
      <section className="rounded-xl border bg-card p-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">
              {data.currency} / {data.base_currency}
            </h2>

            <p className="text-sm text-muted-foreground">Buy and sell rates</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              Buy
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-muted-foreground" />
              Sell
            </div>
          </div>
        </div>

        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.history}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                width={55}
              />

              <Tooltip
                formatter={(value) => `${Number(value).toFixed(2)} ETB`}
              />

              <Line
                type="monotone"
                dataKey="buy"
                stroke="currentColor"
                className="text-primary"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="sell"
                stroke="currentColor"
                className="text-muted-foreground"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Historical Rates</h2>

            <p className="text-sm text-muted-foreground">
              Daily exchange rate history
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            {data.range}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Date
                </th>

                <th className="px-5 py-3 text-right font-medium text-muted-foreground">
                  Buy
                </th>

                <th className="px-5 py-3 text-right font-medium text-muted-foreground">
                  Sell
                </th>

                <th className="px-5 py-3 text-right font-medium text-muted-foreground">
                  Spread
                </th>
              </tr>
            </thead>

            <tbody>
              {data.history.map((item) => (
                <tr key={item.date} className="border-b last:border-0">
                  <td className="px-5 py-4 font-medium">{item.date}</td>

                  <td className="px-5 py-4 text-right">
                    {item.buy.toFixed(2)}
                  </td>

                  <td className="px-5 py-4 text-right">
                    {item.sell.toFixed(2)}
                  </td>

                  <td className="px-5 py-4 text-right text-muted-foreground">
                    {item.spread.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: number;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-2 text-2xl font-semibold">{value}</p>

      {change !== undefined && (
        <div
          className={`mt-2 flex items-center gap-1 text-xs ${
            change >= 0
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {change >= 0 ? (
            <ArrowUp className="size-3.5" />
          ) : (
            <ArrowDown className="size-3.5" />
          )}
          {Math.abs(change).toFixed(2)}%
        </div>
      )}
    </div>
  );
}
