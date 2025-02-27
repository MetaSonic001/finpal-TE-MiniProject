// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Import components
import MarketCategories from "@/components/layout/MarketCategories";
import MarketIndicesGrid from "@/components/dashboard/MarketIndicesGrid";
import StockTable from "@/components/dashboard/StockTable";

// Import data
import { marketIndices } from "@/data/marketIndices";
import { stocksData } from "@/data/stocks";
import { Stock } from "@/components/shared/types";

export default function StockDashboard() {
  const [stocks, setStocks] = useState<Stock[]>(stocksData);
  const [currentTab, setCurrentTab] = useState("companies");
  const [currency, setCurrency] = useState("US");

  // Function to toggle favorite status
  const toggleFavorite = (id: number) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, isFavorite: !stock.isFavorite } : stock
      )
    );
  };

  // This would be where you fetch real data from the API
  useEffect(() => {
    // Example of how you might fetch data
    // const fetchStockData = async () => {
    //   try {
    //     const apiKey = 'GSHGAANBAIRCLAFW'
    //     const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${apiKey}`)
    //     const data = await response.json()
    //     console.log(data)
    //   } catch (error) {
    //     console.error('Error fetching stock data:', error)
    //   }
    // }
    // fetchStockData()
    // Note: Commented out to avoid using up API calls during development
    // In a real implementation, you would transform the API data and update the state
  }, []);

  return (
    <div className="p-4">
      {/* Market Categories */}
      <MarketCategories currency={currency} setCurrency={setCurrency} />

      {/* Market Indices Cards */}
      <MarketIndicesGrid indices={marketIndices} />

      {/* Tabs Section */}
      <div className="bg-white mt-6 shadow rounded-lg">
        <Tabs
          defaultValue="companies"
          value={currentTab}
          onValueChange={setCurrentTab}
        >
          <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
            <TabsList className="bg-transparent flex">
              {[
                "Companies",
                "Sectors",
                "Industries",
                "Trending",
                "Gainers & Losers",
                "Most Visited",
              ].map((tab) => {
                const value = tab
                  .toLowerCase()
                  .replace(" & ", "-")
                  .replace(/\s/g, "-");
                return (
                  <TabsTrigger
                    key={tab}
                    value={value}
                    className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-black"
                  >
                    {tab}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <Button variant="outline" size="sm" className="text-xs">
              Customize
            </Button>
          </div>

          {/* Tab Content */}
          <TabsContent value="companies" className="p-4">
            <StockTable stocks={stocks} toggleFavorite={toggleFavorite} />
          </TabsContent>

          {[
            "sectors",
            "industries",
            "trending",
            "gainers-losers",
            "most-visited",
          ].map((tab) => (
            <TabsContent key={tab} value={tab} className="p-4 text-center">
              <p className="text-gray-600">
                {tab.replace("-", " & ").charAt(0).toUpperCase() + tab.slice(1)}{" "}
                content coming soon.
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
