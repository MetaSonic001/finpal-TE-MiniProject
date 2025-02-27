"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Share2 } from "lucide-react";

// Mock data for Warren Buffett's portfolio
const portfolioData = {
  size: "$279 B",
  numStocks: 41,
  lastUpdate: "Aug 29, 2024",
  holdings: [
    {
      company: "AAPL",
      name: "Apple",
      percentage: 31.7,
      avgBuyPrice: 39.63,
      profit: 479.8,
      currentPrice: 226.05,
      recentActivity: "Reduce -49.33%",
      value: "$91.9B",
    },
  ],
  transactions: [
    {
      period: "Q2 2024",
      percentage: 31.7,
      activity: "Reduce -49.33%",
      change: -29.29,
      priceRange: "$165.00 - $216.67",
    },
    {
      period: "Q1 2024",
      percentage: 40.81,
      activity: "Reduce -12.83%",
      change: -6.01,
      priceRange: "$169.00 - $195.18",
    },
  ],
};

const FundManagerPage = () => {
  const [activeTab, setActiveTab] = useState("holdings");
  const [timeRange, setTimeRange] = useState("1Y");
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center mb-2">
        <span className="text-sm text-gray-500">
          Fund Managers / Warren Buffet
        </span>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <img
            src="/api/placeholder/100/100"
            alt="Warren Buffett"
            className="rounded-full h-16 w-16 object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Warren Buffett</h1>
          <p className="text-gray-500">Berkshire Hathaway</p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant={isFollowing ? "outline" : "default"}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Size</p>
            <p className="text-2xl font-bold">{portfolioData.size}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">No. of stocks</p>
            <p className="text-2xl font-bold">
              {portfolioData.numStocks} Stocks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Last update</p>
            <p className="text-2xl font-bold">{portfolioData.lastUpdate}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-5 w-96">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="buys">Buys</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs>
        <TabsContent value="holdings" className="mt-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % of Portfolio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Buy Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recent Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {portfolioData.holdings.map((holding, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            src="/api/placeholder/40/40"
                            alt={holding.company}
                            className="rounded-md"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {holding.company}
                          </div>
                          <div className="text-sm text-gray-500">
                            {holding.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {holding.percentage}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${holding.avgBuyPrice}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600">
                        +{holding.profit}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${holding.currentPrice}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-red-500">
                        {holding.recentActivity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {holding.value}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Transactions section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>

        <div className="flex space-x-2 mb-4">
          <Button
            variant={timeRange === "1Y" ? "default" : "outline"}
            onClick={() => setTimeRange("1Y")}
            size="sm"
          >
            1Y
          </Button>
          <Button
            variant={timeRange === "3Y" ? "default" : "outline"}
            onClick={() => setTimeRange("3Y")}
            size="sm"
          >
            3Y
          </Button>
          <Button
            variant={timeRange === "5Y" ? "default" : "outline"}
            onClick={() => setTimeRange("5Y")}
            size="sm"
          >
            5Y
          </Button>
          <Button
            variant={timeRange === "15Y" ? "default" : "outline"}
            onClick={() => setTimeRange("15Y")}
            size="sm"
          >
            15Y
          </Button>
        </div>

        {/* Transaction chart placeholder */}
        <div className="bg-gray-100 rounded-lg h-48 mb-6 flex items-center justify-center">
          <p className="text-gray-500">Transaction chart would appear here</p>
        </div>

        {/* Transactions table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Portfolio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % Change to Portfolio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price Range
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portfolioData.transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {transaction.period}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {transaction.percentage}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-500">
                      {transaction.activity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-500">
                      {transaction.change}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {transaction.priceRange}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundManagerPage;
