import { Coins } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Currency = {
  code: string;
  name: string;
};

export const currencies: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
  },
  {
    code: "EUR",
    name: "Euro",
  },
  {
    code: "GBP",
    name: "British Pound",
  },
  {
    code: "AED",
    name: "UAE Dirham",
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
  },
];

type CurrencySelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CurrencySelector({
  value,
  onChange,
}: CurrencySelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-[155px]">
        <Coins className="mr-2 size-4 text-blue-600" />
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {currency.code} / ETB
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
