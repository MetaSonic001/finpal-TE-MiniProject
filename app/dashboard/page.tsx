// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
  Calendar,
  Filter,
  Send,
  Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for the dashboard
const accountData = {
  totalBalance: "₹1,20,456.32",
  growthPercentage: "+24.17%",
  monthlyBudget: {
    spent: 68,
    remaining: 32,
    amount: "₹35,620",
    total: "₹50,000"
  },
  transactions: [
    { 
      id: 1, 
      name: "Amazon India", 
      type: "expense", 
      amount: "₹2,450.00", 
      date: "Feb 24, 2025", 
      category: "Shopping",
      status: "Completed",
      method: "HDFC Debit Card"
    },
    { 
      id: 2, 
      name: "Salary Credit", 
      type: "income", 
      amount: "₹75,000.00", 
      date: "Feb 20, 2025", 
      category: "Income",
      status: "Completed",
      method: "Bank Transfer"
    },
    { 
      id: 3, 
      name: "Zomato", 
      type: "expense", 
      amount: "₹750.00", 
      date: "Feb 18, 2025", 
      category: "Food",
      status: "Completed",
      method: "ICICI Credit Card"
    },
    { 
      id: 4, 
      name: "Netflix", 
      type: "expense", 
      amount: "₹649.00", 
      date: "Feb 15, 2025", 
      category: "Entertainment",
      status: "Recurring",
      method: "SBI Credit Card"
    },
    { 
      id: 5, 
      name: "Electricity Bill", 
      type: "expense", 
      amount: "₹2,100.00", 
      date: "Feb 14, 2025", 
      category: "Utilities",
      status: "Pending",
      method: "Auto Debit - HDFC"
    }
  ],
  cards: [
    {
      id: 1,
      bank: "HDFC",
      type: "VISA",
      number: "•••• •••• •••• 3560",
      expiry: "09/26",
      balance: "₹35,450",
      color: "bg-emerald-700"
    },
    {
      id: 2,
      bank: "ICICI",
      type: "Mastercard",
      number: "•••• •••• •••• 7823",
      expiry: "04/25",
      balance: "₹48,200",
      color: "bg-blue-700"
    },
    {
      id: 3,
      bank: "SBI",
      type: "RuPay",
      number: "•••• •••• •••• 9032",
      expiry: "11/27",
      balance: "₹22,800",
      color: "bg-purple-700"
    }
  ],
  investments: {
    totalValue: "₹5,85,423",
    growthPercentage: "+28.2%",
    allocation: [
      { name: "Equity", percentage: 60, color: "bg-green-500" },
      { name: "Debt", percentage: 25, color: "bg-blue-500" },
      { name: "Gold", percentage: 10, color: "bg-yellow-500" },
      { name: "Others", percentage: 5, color: "bg-gray-500" }
    ],
    upcomingSIPs: [
      { name: "HDFC Top 100", date: "March 01, 2025", amount: "₹5,000" },
      { name: "SBI Small Cap", date: "March 05, 2025", amount: "₹2,500" }
    ]
  },
  bills: [
    { name: "Electricity", dueDate: "March 03, 2025", amount: "₹2,100", status: "Upcoming" },
    { name: "Broadband", dueDate: "March 10, 2025", amount: "₹1,299", status: "Upcoming" },
    { name: "Mobile Postpaid", dueDate: "March 07, 2025", amount: "₹899", status: "Upcoming" },
    { name: "Home Loan EMI", dueDate: "March 05, 2025", amount: "₹28,450", status: "Upcoming" }
  ]
};

// Calendar data for the month
const calendarData = [
  { day: 1, month: "Mar", hasTransaction: false },
  { day: 2, month: "Mar", hasTransaction: false },
  { day: 3, month: "Mar", hasTransaction: true },
  { day: 4, month: "Mar", hasTransaction: false },
  { day: 5, month: "Mar", hasTransaction: true },
  { day: 6, month: "Mar", hasTransaction: false },
  { day: 7, month: "Mar", hasTransaction: true },
  { day: 8, month: "Mar", hasTransaction: false },
  { day: 9, month: "Mar", hasTransaction: false },
  { day: 10, month: "Mar", hasTransaction: true },
];

export default function DashboardPage() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Rahul!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 rounded-full bg-background"
            />
          </div>
          <Button variant="outline" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold">{accountData.totalBalance}</h2>
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                {accountData.growthPercentage}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Across all accounts</p>
            <div className="flex justify-between items-center mt-4">
              <Button size="sm" variant="outline">View Details</Button>
              <div className="text-sm text-muted-foreground">Updated just now</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Spent</div>
              <div className="text-sm font-medium">{accountData.monthlyBudget.amount} / {accountData.monthlyBudget.total}</div>
            </div>
            <Progress value={accountData.monthlyBudget.spent} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>{accountData.monthlyBudget.spent}% spent</div>
              <div>{accountData.monthlyBudget.remaining}% remaining</div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button size="sm" variant="outline">Manage Budget</Button>
              <div className="text-sm text-muted-foreground">21 days left</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start">
              <Send className="mr-2 h-4 w-4" />
              Send Money
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Request Money
            </Button>
            <Button variant="outline" className="justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Bills
            </Button>
            <Button variant="outline" className="justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              Investments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Cards & Calendar Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Your Cards */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Your Cards</CardTitle>
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Card
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex overflow-x-auto snap-x space-x-4 pb-4">
                {accountData.cards.map((card, index) => (
                  <div 
                    key={card.id}
                    className={`snap-center shrink-0 ${index === activeCard ? 'scale-100' : 'scale-95 opacity-70'}`}
                    onClick={() => setActiveCard(index)}
                  >
                    <div 
                      className={`w-80 h-48 rounded-xl p-6 flex flex-col justify-between text-white ${card.color} transition-all duration-200 cursor-pointer`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="text-xl font-semibold">{card.bank}</div>
                        <div className="text-lg">{card.type}</div>
                      </div>
                      <div className="text-xl mt-6">{card.number}</div>
                      <div className="flex justify-between items-end mt-6">
                        <div>
                          <div className="text-xs opacity-80">Balance</div>
                          <div className="text-xl font-semibold">{card.balance}</div>
                        </div>
                        <div className="text-sm">{card.expiry}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-2 mt-2">
                {accountData.cards.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === activeCard ? 'bg-primary' : 'bg-gray-300'}`}
                    onClick={() => setActiveCard(index)}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarData.map((day, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-center h-10 w-10 rounded-full mx-auto ${
                    day.hasTransaction 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted cursor-pointer'
                  }`}
                >
                  <span className="text-sm">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Upcoming Bills</span>
                <span className="text-muted-foreground">Mar 2025</span>
              </div>
              <div className="space-y-2">
                {accountData.bills.slice(0, 2).map((bill, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <div>
                      <div className="font-medium">{bill.name}</div>
                      <div className="text-xs text-muted-foreground">{bill.dueDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{bill.amount}</div>
                      <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                        {bill.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions & Investments Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accountData.transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowUp className="h-5 w-5 text-red-600 transform rotate-180" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-xs text-muted-foreground">{transaction.date} • {transaction.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">{transaction.method}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investments Summary */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Investment Portfolio</CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {accountData.investments.growthPercentage}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{accountData.investments.totalValue}</h3>
              <Button variant="outline" size="sm">Invest More</Button>
            </div>

            {/* Portfolio Allocation */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Asset Allocation</h4>
              <div className="h-4 w-full flex rounded-full overflow-hidden">
                {accountData.investments.allocation.map((asset, index) => (
                  <div 
                    key={index} 
                    className={`${asset.color}`}
                    style={{ width: `${asset.percentage}%` }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap mt-2">
                {accountData.investments.allocation.map((asset, index) => (
                  <div key={index} className="flex items-center mr-4 mt-1">
                    <div className={`w-3 h-3 rounded-full ${asset.color} mr-1`}></div>
                    <span className="text-xs">{asset.name} ({asset.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming SIPs */}
            <div>
              <h4 className="text-sm font-medium mb-2">Upcoming SIPs</h4>
              <div className="space-y-2">
                {accountData.investments.upcomingSIPs.map((sip, index) => (
                  <div key={index} className="flex justify-between p-2 rounded bg-muted/50">
                    <div>
                      <div className="font-medium">{sip.name}</div>
                      <div className="text-xs text-muted-foreground">{sip.date}</div>
                    </div>
                    <div className="font-medium">{sip.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bills & Payment Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Upcoming Bills</CardTitle>
            <Button variant="outline" size="sm">Pay All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {accountData.bills.map((bill, index) => (
              <Card key={index} className="bg-muted/30 border-none">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{bill.name}</h3>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {bill.status}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold mb-1">{bill.amount}</div>
                  <div className="text-xs text-muted-foreground mb-3">Due on {bill.dueDate}</div>
                  <Button size="sm" className="w-full">Pay Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}