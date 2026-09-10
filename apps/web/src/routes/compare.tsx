import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import CompareHeader from "../components/compare-ui/CompareHeader";
import RateComparisonChart from "../components/compare-ui/RateComparisonChart";

import StatusCard from "../components/common-ui/StatusCard";
import DataTable from "../components/common-ui/Table";

import { bankColumns, type Bank } from "../lib/bankcolumn";

export const Route = createFileRoute("/compare")({
  component: ComparePage,
});

const banksByCurrency: Record<string, Bank[]> = {
  USD: [
    {
      name: "Commercial Bank of Ethiopia",
      currency: "USD",
      buy: 144.85,
      sell: 146.2,
      spread: 1.35,
      updated: "2 min ago",
    },
    {
      name: "Dashen Bank",
      currency: "USD",
      buy: 144.9,
      sell: 146.1,
      spread: 1.2,
      updated: "4 min ago",
    },
    {
      name: "Awash Bank",
      currency: "USD",
      buy: 144.75,
      sell: 146.05,
      spread: 1.3,
      updated: "5 min ago",
    },
    {
      name: "Bank of Abyssinia",
      currency: "USD",
      buy: 144.8,
      sell: 146.15,
      spread: 1.35,
      updated: "6 min ago",
    },
    {
      name: "Cooperative Bank of Oromia",
      currency: "USD",
      buy: 144.7,
      sell: 145.95,
      spread: 1.25,
      updated: "8 min ago",
    },
  ],

  EUR: [
    {
      name: "Commercial Bank of Ethiopia",
      currency: "EUR",
      buy: 169.4,
      sell: 171.2,
      spread: 1.8,
      updated: "2 min ago",
    },
    {
      name: "Dashen Bank",
      currency: "EUR",
      buy: 169.6,
      sell: 171.0,
      spread: 1.4,
      updated: "4 min ago",
    },
    {
      name: "Awash Bank",
      currency: "EUR",
      buy: 169.3,
      sell: 170.9,
      spread: 1.6,
      updated: "5 min ago",
    },
    {
      name: "Bank of Abyssinia",
      currency: "EUR",
      buy: 169.5,
      sell: 171.1,
      spread: 1.6,
      updated: "6 min ago",
    },
    {
      name: "Cooperative Bank of Oromia",
      currency: "EUR",
      buy: 169.2,
      sell: 170.8,
      spread: 1.6,
      updated: "8 min ago",
    },
  ],

  GBP: [
    {
      name: "Commercial Bank of Ethiopia",
      currency: "GBP",
      buy: 195.1,
      sell: 197.3,
      spread: 2.2,
      updated: "2 min ago",
    },
    {
      name: "Dashen Bank",
      currency: "GBP",
      buy: 195.4,
      sell: 197.0,
      spread: 1.6,
      updated: "4 min ago",
    },
    {
      name: "Awash Bank",
      currency: "GBP",
      buy: 194.9,
      sell: 196.9,
      spread: 2.0,
      updated: "5 min ago",
    },
    {
      name: "Bank of Abyssinia",
      currency: "GBP",
      buy: 195.2,
      sell: 197.1,
      spread: 1.9,
      updated: "6 min ago",
    },
    {
      name: "Cooperative Bank of Oromia",
      currency: "GBP",
      buy: 194.8,
      sell: 196.7,
      spread: 1.9,
      updated: "8 min ago",
    },
  ],

  AED: [
    {
      name: "Commercial Bank of Ethiopia",
      currency: "AED",
      buy: 39.35,
      sell: 39.8,
      spread: 0.45,
      updated: "2 min ago",
    },
    {
      name: "Dashen Bank",
      currency: "AED",
      buy: 39.4,
      sell: 39.75,
      spread: 0.35,
      updated: "4 min ago",
    },
    {
      name: "Awash Bank",
      currency: "AED",
      buy: 39.3,
      sell: 39.7,
      spread: 0.4,
      updated: "5 min ago",
    },
    {
      name: "Bank of Abyssinia",
      currency: "AED",
      buy: 39.35,
      sell: 39.78,
      spread: 0.43,
      updated: "6 min ago",
    },
    {
      name: "Cooperative Bank of Oromia",
      currency: "AED",
      buy: 39.25,
      sell: 39.65,
      spread: 0.4,
      updated: "8 min ago",
    },
  ],

  SAR: [
    {
      name: "Commercial Bank of Ethiopia",
      currency: "SAR",
      buy: 38.55,
      sell: 39.0,
      spread: 0.45,
      updated: "2 min ago",
    },
    {
      name: "Dashen Bank",
      currency: "SAR",
      buy: 38.6,
      sell: 38.95,
      spread: 0.35,
      updated: "4 min ago",
    },
    {
      name: "Awash Bank",
      currency: "SAR",
      buy: 38.5,
      sell: 38.9,
      spread: 0.4,
      updated: "5 min ago",
    },
    {
      name: "Bank of Abyssinia",
      currency: "SAR",
      buy: 38.55,
      sell: 38.98,
      spread: 0.43,
      updated: "6 min ago",
    },
    {
      name: "Cooperative Bank of Oromia",
      currency: "SAR",
      buy: 38.45,
      sell: 38.85,
      spread: 0.4,
      updated: "8 min ago",
    },
  ],
};

function ComparePage() {
  const [currency, setCurrency] = useState("USD");
  const [date, setDate] = useState<Date>(new Date());

  const banks = banksByCurrency[currency] ?? [];

  const comparison = useMemo(() => {
    if (!banks.length) {
      return {
        rateDifference: 0,
        averageSpread: 0,
        mostCompetitive: "-",
        bankCount: 0,
      };
    }

    const buyRates = banks.map((bank) => bank.buy);

    const spreads = banks.map((bank) => bank.spread);

    const highestBuy = Math.max(...buyRates);
    const lowestBuy = Math.min(...buyRates);

    const averageSpread =
      spreads.reduce((sum, spread) => sum + spread, 0) / spreads.length;

    const mostCompetitiveBank = banks.reduce((best, bank) =>
      bank.spread < best.spread ? bank : best,
    );

    return {
      rateDifference: highestBuy - lowestBuy,
      averageSpread,
      mostCompetitive: mostCompetitiveBank.name,
      bankCount: banks.length,
    };
  }, [banks]);

  const competitiveName =
    comparison.mostCompetitive === "Commercial Bank of Ethiopia"
      ? "CBE"
      : comparison.mostCompetitive
          .replace(" Bank", "")
          .replace("Cooperative Bank of Oromia", "Coop");

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <CompareHeader
          currency={currency}
          onCurrencyChange={setCurrency}
          date={date}
          onDateChange={setDate}
        />

        {/* Stats */}
        <section className="mt-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatusCard
              title="Largest Rate Gap"
              value={comparison.rateDifference.toFixed(2)}
              unit="ETB"
              footer="Difference between bank buy rates"
            />

            <StatusCard
              title="Average Spread"
              value={comparison.averageSpread.toFixed(2)}
              unit="ETB"
              footer={`Across ${currency} rates`}
            />

            <StatusCard
              title="Most Competitive"
              value={competitiveName}
              unit=""
              footer="Lowest spread"
            />

            <StatusCard
              title="Banks Compared"
              value={comparison.bankCount.toString()}
              unit="banks"
              footer={`${currency} / ETB`}
            />
          </div>
        </section>

        {/* Chart */}
        <section className="mt-8">
          <RateComparisonChart currency={currency} />
        </section>

        {/* Table */}
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Bank Comparison
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Detailed {currency} rates across Ethiopian banks.
              </p>
            </div>

            <span className="hidden rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 sm:block">
              {currency} / ETB
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border bg-card">
            <DataTable columns={bankColumns} data={banks} />
          </div>
        </section>
      </div>
    </main>
  );
}
