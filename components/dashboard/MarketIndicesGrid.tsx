import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MarketIndex } from "@/components/shared/types";

interface MarketIndicesGridProps {
  indices: MarketIndex[];
}

export default function MarketIndicesGrid({ indices }: MarketIndicesGridProps) {
  return (
    <div className="bg-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {indices.map((index) => (
        <Card key={index.name} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">{index.name}</div>
            <div className="flex items-end justify-between mt-2">
              <div className="text-xl font-semibold">{index.value}</div>
              <div
                className={`text-sm ${
                  index.percentChange.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {index.percentChange}
              </div>
            </div>
            <div className="mt-2 h-12">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <path
                  d={
                    index.percentChange.startsWith("+")
                      ? "M0,30 L10,25 L20,28 L30,20 L40,22 L50,15 L60,18 L70,10 L80,12 L90,5 L100,0"
                      : "M0,0 L10,5 L20,3 L30,10 L40,8 L50,15 L60,12 L70,20 L80,18 L90,25 L100,30"
                  }
                  stroke={
                    index.percentChange.startsWith("+") ? "green" : "red"
                  }
                  strokeWidth="2"
                  fill={
                    index.percentChange.startsWith("+")
                      ? "rgba(0, 128, 0, 0.1)"
                      : "rgba(255, 0, 0, 0.1)"
                  }
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}