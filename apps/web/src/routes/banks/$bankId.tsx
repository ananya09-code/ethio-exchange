import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Clock3,
  ExternalLink,
} from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
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
import { banks } from "@/lib/mock/banks";

export const Route = createFileRoute("/banks/$bankId")({
  component: BankDetailsPage,
});

const history = [
  { time: "09:00", buy: 147.92, sell: 150.88 },
  { time: "10:00", buy: 148.14, sell: 151.12 },
  { time: "11:00", buy: 148.28, sell: 151.26 },
  { time: "12:00", buy: 148.36, sell: 151.34 },
  { time: "13:00", buy: 148.44, sell: 151.42 },
  { time: "14:00", buy: 148.52, sell: 151.48 },
];

function BankDetailsPage() {
  const { bankId } = Route.useParams();

  const [currency, setCurrency] = useState("USD");

  const bank = useMemo(
    () => banks.find((item) => item.id === bankId),
    [bankId],
  );

  if (!bank) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Bank not found</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            The bank you are looking for does not exist.
          </p>

          <Link
            to="/banks"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <ArrowLeft className="size-4" />
            Back to Banks
          </Link>
        </div>
      </main>
    );
  }

  const rate = bank.rates[currency];

  if (!rate) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Rate information is unavailable.
        </p>
      </main>
    );
  }

  const spread = rate.sell - rate.buy;

  const firstBuy = history[0].buy;
  const latestBuy = history[history.length - 1].buy;

  const change = latestBuy - firstBuy;
  const changePercent = (change / firstBuy) * 100;
  const isPositive = change >= 0;

  return (
    <main className="space-y-6">
      {/* Back */}
      <Link
        to="/banks"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Banks
      </Link>

      {/* Bank Header */}
      <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              {bank.shortName}
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                {bank.name}
              </h1>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span>{bank.shortName}</span>

                <span className="size-1 rounded-full bg-muted-foreground/50" />

                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5" />
                  Updated {bank.updated}
                </span>
              </div>
            </div>
          </div>

          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>
      </section>

      {/* Current Rates */}
      <section className="grid gap-4 sm:grid-cols-3">
        <RateCard label="Buy Rate" value={rate.buy} suffix="ETB" highlighted />

        <RateCard label="Sell Rate" value={rate.sell} suffix="ETB" />

        <RateCard label="Spread" value={spread} suffix="ETB" />
      </section>

      {/* Rate History */}
      <section className="rounded-xl border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">{currency} / ETB Rate History</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Today's exchange-rate movement at {bank.shortName}.
            </p>
          </div>

          <div
            className={`flex items-center gap-1.5 text-sm font-medium ${
              isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {isPositive ? (
              <ArrowUp className="size-4" />
            ) : (
              <ArrowDown className="size-4" />
            )}
            {Math.abs(change).toFixed(2)} ETB (
            {Math.abs(changePercent).toFixed(2)}%)
          </div>
        </div>

        <div className="h-[320px] w-full p-4 sm:p-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={history}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value, name) => [
                  `${Number(value).toFixed(2)} ETB`,
                  name === "buy" ? "Buy" : "Sell",
                ]}
              />

              <Line
                type="monotone"
                dataKey="buy"
                stroke="currentColor"
                strokeWidth={2}
                dot={false}
                className="text-blue-600"
              />

              <Line
                type="monotone"
                dataKey="sell"
                stroke="currentColor"
                strokeWidth={2}
                dot={false}
                className="text-blue-300"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center gap-5 border-t px-5 py-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue-600" />
            Buy
          </div>

          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue-300" />
            Sell
          </div>
        </div>
      </section>

      {/* Other Currencies */}
      <section className="rounded-xl border bg-card shadow-sm">
        <div className="border-b p-5">
          <h2 className="font-semibold">Other Currency Rates</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Current exchange rates offered by {bank.shortName}.
          </p>
        </div>

        <div className="divide-y">
          {Object.entries(bank.rates)
            .filter(([code]) => code !== currency)
            .map(([code, values]) => (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-muted/40"
              >
                <div>
                  <p className="font-medium">{code} / ETB</p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Buy {values.buy.toFixed(2)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">{values.sell.toFixed(2)}</p>

                  <p className="mt-0.5 text-xs text-muted-foreground">Sell</p>
                </div>
              </button>
            ))}
        </div>
      </section>

      {/* About */}
      <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold">About {bank.name}</h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              View exchange rates, compare pricing, and track how this bank's
              rates change over time. More bank information will be added as
              Birrify's bank profiles are expanded.
            </p>
          </div>

          <ExternalLink className="hidden size-4 text-muted-foreground sm:block" />
        </div>
      </section>
    </main>
  );
}

type RateCardProps = {
  label: string;
  value: number;
  suffix: string;
  highlighted?: boolean;
};

function RateCard({
  label,
  value,
  suffix,
  highlighted = false,
}: RateCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span
          className={`text-2xl font-semibold tracking-tight ${
            highlighted ? "text-blue-600 dark:text-blue-400" : "text-foreground"
          }`}
        >
          {value.toFixed(2)}
        </span>

        <span className="text-sm text-muted-foreground">{suffix}</span>
      </div>
    </div>
  );
}
