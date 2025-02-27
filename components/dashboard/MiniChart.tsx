import React from "react";

interface MiniChartProps {
  type: string;
}

export default function MiniChart({ type }: MiniChartProps) {
  return (
    <div className="w-16 h-8">
      <svg viewBox="0 0 100 30" className="w-full h-full">
        {type === "up" ? (
          <path
            d="M0,30 L10,25 L20,28 L30,20 L40,22 L50,15 L60,18 L70,10 L80,12 L90,5 L100,0"
            stroke="green"
            strokeWidth="2"
            fill="none"
          />
        ) : (
          <path
            d="M0,0 L10,5 L20,3 L30,10 L40,8 L50,15 L60,12 L70,20 L80,18 L90,25 L100,30"
            stroke="red"
            strokeWidth="2"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
}
