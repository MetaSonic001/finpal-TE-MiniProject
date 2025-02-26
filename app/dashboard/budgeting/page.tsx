// app/budgeting/page.tsx
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
  PieChart,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Calendar,
  Filter,
  PlusCircle,
  Bell,
  AlertCircle,
  Target,
  Clock,
  FileText,
  CreditCard
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for the budgeting page
const budgetData = {
  monthlySummary: {
    income: "₹95,000.00",
    expenses: "₹68,250.00",
    savings: "₹26,750.00",
    savingsPercentage: 28.16
  },
  categorySpending: [
    { category: "Housing", amount: "₹28,450.00", percentage: 41.7, color: "bg-blue-500", change: +2.3 },
    { category: "Food", amount: "₹12,500.00", percentage: 18.3, color: "bg-green-500", change: -5.2 },
    { category: "Transportation", amount: "₹8,200.00", percentage: 12.0, color: "bg-yellow-500", change: +1.8 },
    { category: "Entertainment", amount: "₹6,800.00", percentage: 10.0, color: "bg-purple-500", change: +20.5 },
    { category: "Shopping", amount: "₹5,100.00", percentage: 7.5, color: "bg-red-500", change: -8.3 },
    { category: "Utilities", amount: "₹4,300.00", percentage: 6.3, color: "bg-teal-500", change: +0.5 },
    { category: "Other", amount: "₹2,900.00", percentage: 4.2, color: "bg-gray-500", change: -2.1 }
  ],
  budgetLimits: [
    { 
      category: "Food", 
      limit: "₹15,000.00", 
      spent: "₹12,500.00", 
      progress: 83, 
      icon: "🍔",
      remainingDays: 8,
      status: "On track"
    },
    { 
      category: "Entertainment", 
      limit: "₹5,000.00", 
      spent: "₹6,800.00", 
      progress: 136, 
      icon: "🎬",
      remainingDays: 8,
      status: "Exceeded"
    },
    { 
      category: "Shopping", 
      limit: "₹8,000.00", 
      spent: "₹5,100.00", 
      progress: 64, 
      icon: "🛍️",
      remainingDays: 8,
      status: "On track"
    },
    { 
      category: "Transportation", 
      limit: "₹10,000.00", 
      spent: "₹8,200.00", 
      progress: 82, 
      icon: "🚗",
      remainingDays: 8,
      status: "On track"
    }
  ],
  savingsGoals: [
    { 
      name: "Emergency Fund", 
      targetAmount: "₹3,00,000", 
      currentAmount: "₹1,65,000", 
      progress: 55, 
      monthlyContribution: "₹15,000",
      targetDate: "Oct 2025",
      remainingMonths: 8
    },
    { 
      name: "Europe Trip", 
      targetAmount: "₹2,50,000", 
      currentAmount: "₹87,500", 
      progress: 35, 
      monthlyContribution: "₹8,000",
      targetDate: "Dec 2025",
      remainingMonths: 10
    },
    { 
      name: "New Laptop", 
      targetAmount: "₹80,000", 
      currentAmount: "₹45,000", 
      progress: 56, 
      monthlyContribution: "₹5,000",
      targetDate: "Jul 2025",
      remainingMonths: 5
    }
  ],
  insights: [
    "You spent 20.5% more on Entertainment this month compared to last month",
    "Your Food expenses decreased by 5.2% compared to last month",
    "You've exceeded your Entertainment budget by ₹1,800",
    "You're on track to reach your Emergency Fund goal by Oct 2025"
  ],
  pendingBills: [
    { name: "Electricity Bill", dueDate: "March 03, 2025", amount: "₹2,100", status: "Due soon", icon: "⚡" },
    { name: "Broadband", dueDate: "March 10, 2025", amount: "₹1,299", status: "Upcoming", icon: "🌐" },
    { name: "Mobile Postpaid", dueDate: "March 07, 2025", amount: "₹899", status: "Upcoming", icon: "📱" },
    { name: "Home Loan EMI", dueDate: "March 05, 2025", amount: "₹28,450", status: "Due soon", icon: "🏠" }
  ],
  recurringPayments: [
    { name: "Netflix", paymentDate: "15th of every month", amount: "₹649", status: "Active", icon: "🎬" },
    { name: "Amazon Prime", paymentDate: "7th of every month", amount: "₹179", status: "Active", icon: "📦" },
    { name: "Gym Membership", paymentDate: "3rd of every month", amount: "₹1,200", status: "Active", icon: "💪" },
    { name: "Spotify", paymentDate: "10th of every month", amount: "₹119", status: "Active", icon: "🎵" }
  ]
};

export default function BudgetingPage() {
  const [activeTab, setActiveTab] = useState("spending");

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budget & Finance Management</h1>
          <p className="text-muted-foreground">Take control of your expenses and savings</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold">{budgetData.monthlySummary.income}</h2>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <ArrowUp className="mr-1 h-3 w-3" />
                +5% from last month
              </Badge>
              <div className="text-sm text-muted-foreground">Feb 2025</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold">{budgetData.monthlySummary.expenses}</h2>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <ArrowUp className="mr-1 h-3 w-3" />
                +2.3% from last month
              </Badge>
              <div className="text-sm text-muted-foreground">Feb 2025</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold">{budgetData.monthlySummary.savings}</h2>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <ArrowUp className="mr-1 h-3 w-3" />
                +12% from last month
              </Badge>
              <div className="text-sm text-muted-foreground">Saving Rate: {budgetData.monthlySummary.savingsPercentage}%</div>
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
              Add Expense
            </Button>
            <Button variant="outline" className="justify-start">
              <Target className="mr-2 h-4 w-4" />
              New Goal
            </Button>
            <Button variant="outline" className="justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Bills
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
          <TabsTrigger value="budgets">Budget Limits</TabsTrigger>
          <TabsTrigger value="goals">Savings Goals</TabsTrigger>
          <TabsTrigger value="bills">Bill Management</TabsTrigger>
        </TabsList>

        {/* Spending Analysis Tab */}
        <TabsContent value="spending" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Spending Breakdown Chart */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Spending by Category</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">This Month</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.categorySpending.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded ${category.color} mr-2`}></div>
                          <span className="font-medium">{category.category}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>{category.percentage}%</span>
                          <span className="font-semibold">{category.amount}</span>
                          <Badge 
                            variant="outline" 
                            className={`${
                              category.change > 0 
                                ? 'bg-red-50 text-red-700 border-red-200' 
                                : 'bg-green-50 text-green-700 border-green-200'
                            }`}
                          >
                            {category.change > 0 ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(category.change)}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.insights.map((insight, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50 flex items-start">
                      <div className="mr-2 mt-0.5">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="text-sm">{insight}</div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">Generate Full Report</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Budget Limits Tab */}
        <TabsContent value="budgets" className="space-y-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Category Budget Limits</h3>
            <Button variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Set New Budget
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {budgetData.budgetLimits.map((budget, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                        {budget.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">{budget.category}</h3>
                        <div className="text-xs text-muted-foreground">{budget.remainingDays} days remaining</div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        budget.progress > 100 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}
                    >
                      {budget.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Spent</span>
                      <span className="font-medium">{budget.spent} / {budget.limit}</span>
                    </div>
                    <Progress 
                      value={Math.min(budget.progress, 100)} 
                      className={`h-2 ${budget.progress > 100 ? 'bg-red-200' : ''}`} 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div>{budget.progress}% used</div>
                      <div>{Math.max(100 - budget.progress, 0)}% remaining</div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">Edit Budget</Button>
                    <Button variant="outline" size="sm">View Transactions</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Savings Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Savings Goals</h3>
            <Button variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Goal
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {budgetData.savingsGoals.map((goal, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">{goal.name}</h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {goal.targetDate}
                    </Badge>
                  </div>

                  <div className="text-2xl font-bold mb-1">{goal.currentAmount}</div>
                  <div className="text-sm text-muted-foreground mb-3">of {goal.targetAmount} goal</div>

                  <div className="space-y-2">
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div>{goal.progress}% completed</div>
                      <div>{goal.remainingMonths} months left</div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">Monthly contribution: </span>
                    <span className="font-medium ml-1">{goal.monthlyContribution}</span>
                  </div>

                  <Button className="w-full mt-4">Add Funds</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bill Management Tab */}
        <TabsContent value="bills" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pending Bills */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Bills</CardTitle>
                  <Button variant="outline" size="sm">Pay All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.pendingBills.map((bill, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                          {bill.icon}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{bill.name}</div>
                          <div className="text-xs text-muted-foreground">Due on {bill.dueDate}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{bill.amount}</div>
                        <Badge 
                          variant="outline" 
                          className={`${
                            bill.status === 'Due soon'
                              ? 'bg-amber-50 text-amber-700 border-amber-200' 
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {bill.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">Add New Bill</Button>
              </CardContent>
            </Card>

            {/* Recurring Payments */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recurring Payments</CardTitle>
                  <Button variant="outline" size="sm">Manage All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.recurringPayments.map((payment, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                          {payment.icon}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{payment.name}</div>
                          <div className="text-xs text-muted-foreground">{payment.paymentDate}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{payment.amount}</div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">Add Subscription</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}