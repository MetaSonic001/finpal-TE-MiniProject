import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Stock } from "@/components/shared/types";
import MiniChart from "./MiniChart";

interface StockTableProps {
  stocks: Stock[];
  toggleFavorite: (id: number) => void;
}

export default function StockTable({
  stocks,
  toggleFavorite,
}: StockTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center"></TableHead>
          <TableHead className="w-10">#</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">1D %</TableHead>
          <TableHead className="text-right">1M %</TableHead>
          <TableHead className="text-right">YTD %</TableHead>
          <TableHead className="text-right">M Cap</TableHead>
          <TableHead className="text-right">PE</TableHead>
          <TableHead className="text-right">Last 5 Days</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => toggleFavorite(stock.id)}
              >
                <Star
                  className="h-4 w-4"
                  fill={stock.isFavorite ? "gold" : "none"}
                  color={stock.isFavorite ? "gold" : "gray"}
                />
              </Button>
            </TableCell>
            <TableCell>{stock.id}</TableCell>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mr-2">
                  <span className="text-xs">
                    {stock.ticker.substring(0, 1)}
                  </span>
                </div>
                <div>
                  <div>{stock.name}</div>
                  <div className="text-xs text-gray-500">{stock.ticker}</div>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">
              ${stock.price.toFixed(2)}
            </TableCell>
            <TableCell
              className={`text-right ${
                stock.percentChange.startsWith("+")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stock.percentChange}
            </TableCell>
            <TableCell
              className={`text-right ${
                stock.tm.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {stock.tm}
            </TableCell>
            <TableCell
              className={`text-right ${
                stock.ytd.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {stock.ytd}
            </TableCell>
            <TableCell className="text-right">{stock.marketCap}</TableCell>
            <TableCell className="text-right">{stock.pe}</TableCell>
            <TableCell className="text-right">
              <MiniChart type={stock.chart} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
