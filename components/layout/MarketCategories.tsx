import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MarketCategoriesProps {
  currency: string;
  setCurrency: (value: string) => void;
}

export default function MarketCategories({ currency, setCurrency }: MarketCategoriesProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 py-2 flex space-x-6">
        {[
          "Stocks",
          "Crypto",
          "Indices",
          "ETFs",
          "Currencies",
          "Commodities",
          "Bonds",
        ].map((category) => (
          <Button key={category} variant="ghost" className="text-sm font-medium">
            {category}
          </Button>
        ))}

        <div className="ml-auto flex items-center">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-20 h-8">
              <SelectValue>
                <div className="flex items-center">
                  <div className="mr-1">🇺🇸</div>
                  <span>{currency}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">🇺🇸 US</SelectItem>
              <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
              <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
              <SelectItem value="JPY">🇯🇵 JPY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}