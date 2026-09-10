import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencyRates } from "@/lib/mock/currencyRates";

type CurrencySelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CurrencySelect({
  value,
  onChange,
}: CurrencySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 w-[105px] border-0 bg-muted/50 shadow-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {currencyRates.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{currency.code}</span>
              <span className="text-muted-foreground">{currency.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
