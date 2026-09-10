import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "lucide-react";

import ConverterCard from "@/components/converter-ui/ConverterCard";
import PopularConversions from "@/components/converter-ui/PopularConversions";
import RateInfo from "@/components/converter-ui/RateInfo";
import { currencyRates } from "@/lib/mock/currencyRates";

type RateType = "average" | "buy" | "sell";

export const Route = createFileRoute("/converter")({
  component: ConverterPage,
});

function ConverterPage() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETB");
  const [rateType, setRateType] = useState<RateType>("average");

  const fromRate = useMemo(
    () => currencyRates.find((currency) => currency.code === fromCurrency),
    [fromCurrency],
  );

  const toRate = useMemo(
    () => currencyRates.find((currency) => currency.code === toCurrency),
    [toCurrency],
  );

  const rate = useMemo(() => {
    if (!fromRate || !toRate) return 0;

    const fromValue = fromRate[rateType];
    const toValue = toRate[rateType];

    if (fromCurrency === toCurrency) {
      return 1;
    }

    // All mock rates are expressed against ETB.
    // Convert source -> ETB -> target.
    return fromValue / toValue;
  }, [fromRate, toRate, fromCurrency, toCurrency, rateType]);

  const result = useMemo(() => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return 0;
    }

    return numericAmount * rate;
  }, [amount, rate]);

  function handleAmountChange(value: string) {
    if (value === "") {
      setAmount("");
      return;
    }

    if (Number(value) < 0) {
      return;
    }

    setAmount(value);
  }

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  function handlePopularConversion(currency: string) {
    setFromCurrency(currency);
    setToCurrency("ETB");
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header>
        <div className="mb-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <Calculator className="size-4" />
          Currency converter
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Convert Currency
        </h1>

        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Convert between currencies using Birrify&apos;s latest exchange rates.
        </p>
      </header>

      {/* Main converter */}
      <ConverterCard
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        rateType={rateType}
        result={result}
        rate={rate}
        fromRate={fromRate}
        toRate={toRate}
        onAmountChange={handleAmountChange}
        onFromCurrencyChange={setFromCurrency}
        onToCurrencyChange={setToCurrency}
        onRateTypeChange={setRateType}
        onSwap={handleSwap}
      />

      {/* Popular */}
      <PopularConversions onSelect={handlePopularConversion} />

      {/* Rate information */}
      {fromRate && fromCurrency !== "ETB" && <RateInfo currency={fromRate} />}

      {fromCurrency === "ETB" && toRate && toCurrency !== "ETB" && (
        <RateInfo currency={toRate} />
      )}
    </main>
  );
}
