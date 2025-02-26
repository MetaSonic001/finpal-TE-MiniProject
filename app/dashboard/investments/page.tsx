// app/investments/page.tsx
"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  PlusCircle, 
  Search, 
  CreditCard,
  BarChart,
  ArrowUp,
  ArrowDown,
  Calendar,
  Filter,
  Send,
  Download,
  TrendingUp,
  Wallet,
  Info,
  AlertTriangle,
  CheckCircle,
  PieChart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for the investments page
const investmentData = {
  portfolio: {
    totalValue: "₹5,85,423",
    initialInvestment: "₹4,12,500",
    roi: "41.92%",
    growthPercentage: "+28.2%",
    ytdPerformance: "+12.4%",
    allocation: [
      { name: "Equity", percentage: 60, value: "₹3,51,254", color: "bg-green-500" },
      { name: "Debt", percentage: 25, value: "₹1,46,356", color: "bg-blue-500" },
      { name: "Gold", percentage: 10, value: "₹58,542", color: "bg-yellow-500" },
      { name: "Others", percentage: 5, value: "₹29,271", color: "bg-gray-500" }
    ],
    performanceHistory: [
      { month: "Jan", value: 510000 },
      { month: "Feb", value: 525000 },
      { month: "Mar", value: 505000 },
      { month: "Apr", value: 530000 },
      { month: "May", value: 545000 },
      { month: "Jun", value: 560000 },
      { month: "Jul", value: 570000 },
      { month: "Aug", value: 565000 },
      { month: "Sep", value: 585423 }
    ]
  },
  upcomingSIPs: [
    { name: "HDFC Top 100", date: "March 01, 2025", amount: "₹5,000" },
    { name: "SBI Small Cap", date: "March 05, 2025", amount: "₹2,500" },
    { name: "Axis Bluechip", date: "March 10, 2025", amount: "₹3,000" },
    { name: "ICICI Prudential Value Discovery", date: "March 15, 2025", amount: "₹2,000" }
  ],
  equitySuggestions: [
    { 
      name: "HDFC Bank", 
      currentPrice: "₹1,650.25", 
      change: "+2.45%", 
      recommendation: "Buy", 
      potentialReturn: "+15%",
      sector: "Banking"
    },
    { 
      name: "Infosys", 
      currentPrice: "₹1,789.80", 
      change: "-0.75%", 
      recommendation: "Hold", 
      potentialReturn: "+8%",
      sector: "IT"
    },
    { 
      name: "Reliance Industries", 
      currentPrice: "₹2,456.30", 
      change: "+1.20%", 
      recommendation: "Buy", 
      potentialReturn: "+18%",
      sector: "Diversified"
    },
    { 
      name: "Tata Motors", 
      currentPrice: "₹578.90", 
      change: "+3.15%", 
      recommendation: "Strong Buy", 
      potentialReturn: "+25%",
      sector: "Automobile"
    }
  ],
  topFunds: [
    {
      name: "Quant Active Fund",
      category: "Equity - Small Cap",
      returns: {
        oneYear: "42.8%",
        threeYear: "36.2%",
        fiveYear: "28.7%"
      },
      rating: 5,
      minInvestment: "₹1,000"
    },
    {
      name: "Parag Parikh Flexi Cap",
      category: "Equity - Flexi Cap",
      returns: {
        oneYear: "28.4%",
        threeYear: "24.6%",
        fiveYear: "21.3%"
      },
      rating: 5,
      minInvestment: "₹1,000"
    },
    {
      name: "PGIM India Midcap",
      category: "Equity - Mid Cap",
      returns: {
        oneYear: "36.5%",
        threeYear: "30.1%",
        fiveYear: "25.2%"
      },
      rating: 4,
      minInvestment: "₹5,000"
    }
  ]
};

export default function InvestmentsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Investment Portfolio</h1>
          <p className="text-muted-foreground">View and manage your investment portfolio</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search investments..."
              className="w-64 pl-8 rounded-full bg-background"
            />
          </div>
          <Button variant="default">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Investment
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold">{investmentData.portfolio.totalValue}</h2>
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                {investmentData.portfolio.growthPercentage}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Initial Investment: {investmentData.portfolio.initialInvestment}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Return on Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold text-green-600">{investmentData.portfolio.roi}</h2>
              <div className="ml-2 text-xs p-1 rounded bg-green-50 text-green-700">Lifetime</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">YTD Performance: {investmentData.portfolio.ytdPerformance}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">SIP Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold">₹12,500</h2>
              <p className="text-sm text-muted-foreground mt-1">Monthly SIP Amount</p>
              <div className="mt-2 text-xs p-1 rounded bg-blue-50 text-blue-700 w-fit">4 Active SIPs</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start">
              <PlusCircle className="mr-2 h-4 w-4" />
              Start SIP
            </Button>
            <Button variant="outline" className="justify-start">
              <Wallet className="mr-2 h-4 w-4" />
              Lumpsum
            </Button>
            <Button variant="outline" className="justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Market
            </Button>
            <Button variant="outline" className="justify-start">
              <PieChart className="mr-2 h-4 w-4" />
              Rebalance
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Chart & Allocation */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Portfolio Performance Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Portfolio Performance</CardTitle>
              <Tabs defaultValue="6m">
                <TabsList className="grid grid-cols-4 w-[200px]">
                  <TabsTrigger value="1m">1M</TabsTrigger>
                  <TabsTrigger value="3m">3M</TabsTrigger>
                  <TabsTrigger value="6m">6M</TabsTrigger>
                  <TabsTrigger value="1y">1Y</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
              {/* This would be a chart component in a real implementation */}
              <div className="text-center">
                <BarChart className="h-16 w-16 mx-auto text-primary opacity-70" />
                <p className="text-muted-foreground mt-2">Portfolio Performance Chart</p>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <div>
                <div className="text-muted-foreground">Starting Value</div>
                <div className="font-medium">₹4,12,500</div>
              </div>
              <div>
                <div className="text-muted-foreground">Current Value</div>
                <div className="font-medium">{investmentData.portfolio.totalValue}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Growth</div>
                <div className="font-medium text-green-600">{investmentData.portfolio.growthPercentage}</div>
              </div>
              <div>
                <div className="text-muted-foreground">XIRR</div>
                <div className="font-medium text-green-600">18.7%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-[200px] mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
              {/* This would be a pie chart in a real implementation */}
              <div className="text-center">
                <PieChart className="h-16 w-16 mx-auto text-primary opacity-70" />
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              {investmentData.portfolio.allocation.map((asset, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${asset.color} mr-2`}></div>
                      <span>{asset.name}</span>
                    </div>
                    <div className="font-medium">{asset.percentage}%</div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Value</span>
                    <span>{asset.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">Rebalance Portfolio</Button>
          </CardContent>
        </Card>
      </div>

      {/* Equity Suggestions & Upcoming SIPs */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Equity Suggestions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Equity Suggestions</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <CardDescription>Personalized stock recommendations based on your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {investmentData.equitySuggestions.map((stock, index) => (
                <Card key={index} className="bg-background border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-lg">{stock.name}</div>
                        <div className="text-xs text-muted-foreground">{stock.sector}</div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${stock.recommendation.includes('Buy') ? 'bg-green-50 text-green-700 border-green-200' : 
                            stock.recommendation === 'Hold' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                            'bg-red-50 text-red-700 border-red-200'}
                        `}
                      >
                        {stock.recommendation}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Current Price</div>
                        <div className="font-medium">{stock.currentPrice}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Potential Return</div>
                        <div className="font-medium text-green-600">{stock.potentialReturn}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className={`text-sm ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change} Today
                      </div>
                      <Button size="sm">Buy Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming SIPs & Top Funds */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upcoming SIPs */}
            <div>
              <h3 className="text-sm font-medium mb-3">Upcoming SIPs</h3>
              <ScrollArea className="h-[140px]">
                <div className="space-y-2">
                  {investmentData.upcomingSIPs.map((sip, index) => (
                    <div key={index} className="flex justify-between p-2 rounded bg-muted/50">
                      <div>
                        <div className="font-medium">{sip.name}</div>
                        <div className="text-xs text-muted-foreground">{sip.date}</div>
                      </div>
                      <div className="font-medium">{sip.amount}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Top Funds */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Best Funds to Buy</h3>
                <Button variant="link" size="sm" className="h-auto p-0">View All</Button>
              </div>
              <div className="space-y-3">
                {investmentData.topFunds.map((fund, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{fund.name}</div>
                        <div className="text-xs text-muted-foreground">{fund.category}</div>
                      </div>
                      <div className="flex">
                        {[...Array(fund.rating)].map((_, i) => (
                          <CheckCircle key={i} className="h-3 w-3 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground">1Y</div>
                        <div className="text-sm font-medium text-green-600">{fund.returns.oneYear}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">3Y</div>
                        <div className="text-sm font-medium text-green-600">{fund.returns.threeYear}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">5Y</div>
                        <div className="text-sm font-medium text-green-600">{fund.returns.fiveYear}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs">Min: {fund.minInvestment}</div>
                      <Button size="sm" variant="outline">Invest</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full">View Complete Investment Page</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}