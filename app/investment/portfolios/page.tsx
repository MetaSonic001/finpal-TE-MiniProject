/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Share,
  Settings,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for demonstration
const portfolioData = {
  value: "$1,080,543.86",
  invested: "$657,144.00 invested",
  profit: "+$423,399.00",
  profitPercentage: "+60.12% ATH",
  benchmark: "+12.12%",
  benchmarkText: "Portfolio is ahead of S&P 500",
  passiveIncome: "0.5%",
  passiveIncomeAnnually: "$5,403.00 annually",
  followers: 1322,
  assets: [
    {
      name: "Meta Platforms",
      ticker: "META",
      averagePrice: "$264.41",
      costBasis: "$50,644.00",
      currentValue: "$98,250.00",
      returnPercentage: "+96.83%",
      returnAmount: "+$47,706.00",
      weight: "9.8%",
    },
  ],
};

// Chart data (simplified)
const generateChartData = () => {
  const data = [];
  const years = [
    "Jul 21",
    "2022",
    "Jul 22",
    "2023",
    "Jul 23",
    "2024",
    "Jul 24",
  ];
  let value = 15000;

  for (let i = 0; i < 100; i++) {
    const random = Math.random() * 5000 - 1000;
    value = Math.max(15000, value + random);
    data.push({
      date: new Date(2021 + i / 12, 0, 1),
      value: value,
    });
  }

  return { data, years };
};

const { data: chartData, years } = generateChartData();

export default function PortfolioPage() {
  const [activeTimeframe, setActiveTimeframe] = useState("ALL");
  const [showTrades, setShowTrades] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeSection, setActiveSection] = useState("Assets");

  // Draw chart using canvas
  useEffect(() => {
    const canvas = document.getElementById("chart-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Draw chart line
    ctx.beginPath();
    ctx.strokeStyle = "#1E88E5";
    ctx.lineWidth = 2;

    // Scale the data to fit the canvas
    const maxValue = Math.max(...chartData.map((d) => d.value));
    const minValue = Math.min(...chartData.map((d) => d.value));

    chartData.forEach((point, index) => {
      const x = index * (canvas.width / (chartData.length - 1));
      const y =
        canvas.height -
        ((point.value - minValue) / (maxValue - minValue)) * canvas.height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Fill area under the chart
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(30, 136, 229, 0.2)");
    gradient.addColorStop(1, "rgba(30, 136, 229, 0.0)");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw year labels
    ctx.fillStyle = "#888";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";

    years.forEach((year, index) => {
      const x = index * (canvas.width / (years.length - 1));
      ctx.fillText(year, x, canvas.height - 5);
    });

    // Draw value labels on the right
    ctx.textAlign = "right";
    const valueLabels = ["15K", "30K", "60K", "90K", "120K", "150K", "180K"];
    valueLabels.forEach((label, index) => {
      const y =
        canvas.height - (index / (valueLabels.length - 1)) * canvas.height;
      ctx.fillText(label, canvas.width - 5, y);
    });
  }, [activeTimeframe]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Core Portfolio</h1>
            <ChevronDown className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            Public · Free access · {portfolioData.followers} Followers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <span className="font-semibold">Public</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Public</DropdownMenuItem>
              <DropdownMenuItem>Private</DropdownMenuItem>
              <DropdownMenuItem>Unlisted</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <Share className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Value</p>
            <h2 className="text-2xl font-bold">{portfolioData.value}</h2>
            <p className="text-xs text-muted-foreground">
              {portfolioData.invested}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total profit</p>
            <h2 className="text-2xl font-bold text-green-500">
              {portfolioData.profit}
            </h2>
            <p className="text-xs text-green-500 flex items-center">
              {portfolioData.profitPercentage}
              <ChevronDown className="h-4 w-4 ml-1" />
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Benchmark</p>
            <h2 className="text-2xl font-bold text-green-500">
              {portfolioData.benchmark}
            </h2>
            <p className="text-xs text-muted-foreground flex items-center">
              {portfolioData.benchmarkText}
              <ChevronDown className="h-4 w-4 ml-1" />
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Passive income</p>
            <h2 className="text-2xl font-bold">
              {portfolioData.passiveIncome}
            </h2>
            <p className="text-xs text-muted-foreground">
              {portfolioData.passiveIncomeAnnually}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="Overview"
        className="mb-6"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="Overview">Overview</TabsTrigger>
          <TabsTrigger value="Performance">Performance</TabsTrigger>
          <TabsTrigger value="Dividends">Dividends</TabsTrigger>
          <TabsTrigger value="Metrics">Metrics</TabsTrigger>
          <TabsTrigger value="Slices">Slices</TabsTrigger>
          <TabsTrigger value="Cash">Cash</TabsTrigger>
          <TabsTrigger value="Transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="Overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <span className="font-semibold">Value</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Value</DropdownMenuItem>
                <DropdownMenuItem>Return</DropdownMenuItem>
                <DropdownMenuItem>Return %</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm">Show Trades</p>
                <Toggle checked={showTrades} onCheckedChange={setShowTrades} />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <span className="font-semibold">S&P 500</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>S&P 500</DropdownMenuItem>
                  <DropdownMenuItem>NASDAQ</DropdownMenuItem>
                  <DropdownMenuItem>DOW 30</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["1D", "7D", "1M", "6M", "YTD", "1Y", "5Y", "ALL"].map(
              (timeframe) => (
                <Button
                  key={timeframe}
                  variant={
                    activeTimeframe === timeframe ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveTimeframe(timeframe)}
                >
                  {timeframe}
                </Button>
              )
            )}
          </div>

          <div className="relative h-80 border rounded-md overflow-hidden">
            <canvas id="chart-canvas" className="w-full h-full"></canvas>
          </div>

          <Tabs
            defaultValue="Assets"
            className="mt-4"
            onValueChange={setActiveSection}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="Assets">Assets</TabsTrigger>
              <TabsTrigger value="Allocation">Allocation</TabsTrigger>
              <TabsTrigger value="Slices">Slices</TabsTrigger>
              <TabsTrigger value="Sectors">Sectors</TabsTrigger>
              <TabsTrigger value="Classes">Classes</TabsTrigger>
              <TabsTrigger value="Currencies">Currencies</TabsTrigger>
              <TabsTrigger value="Regions">Regions</TabsTrigger>
              <TabsTrigger value="Countries">Countries</TabsTrigger>
            </TabsList>

            <div className="flex justify-between items-center mb-2">
              <div></div>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4 mr-1" />
                Customize
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex items-center">
                    Asset
                    <Plus className="h-4 w-4 ml-1" />
                  </TableHead>
                  <TableHead>Average price</TableHead>
                  <TableHead>Cost basis</TableHead>
                  <TableHead>Current value</TableHead>
                  <TableHead>Return % (tot.)</TableHead>
                  <TableHead>Return (tot.)</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Weight
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData.assets.map((asset, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                        M
                      </div>
                      {asset.name}
                    </TableCell>
                    <TableCell>{asset.averagePrice}</TableCell>
                    <TableCell>{asset.costBasis}</TableCell>
                    <TableCell>{asset.currentValue}</TableCell>
                    <TableCell className="text-green-500">
                      {asset.returnPercentage}
                    </TableCell>
                    <TableCell className="text-green-500">
                      {asset.returnAmount}
                    </TableCell>
                    <TableCell>{asset.weight}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </TabsContent>

        <TabsContent value="Performance">
          <div className="h-40 flex items-center justify-center text-muted-foreground">
            Performance data would appear here
          </div>
        </TabsContent>

        <TabsContent value="Dividends">
          <div className="h-40 flex items-center justify-center text-muted-foreground">
            Dividend data would appear here
          </div>
        </TabsContent>

        <TabsContent value="Metrics">
          <div className="h-40 flex items-center justify-center text-muted-foreground">
            Metrics data would appear here
          </div>
        </TabsContent>

        <TabsContent value="Slices">
          <div className="h-40 flex items-center justify-center text-muted-foreground">
            Slices data would appear here
          </div>
        </TabsContent>

        <TabsContent value="Cash">
          <div className="h-40 flex items-center justify-center text-muted-foreground">
            Cash data would appear here
          </div>
        </TabsContent>

        <TabsContent value="Transactions">
          <div className="h-40 flex items-center justify-center text-muted-foreground">
            Transaction data would appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
