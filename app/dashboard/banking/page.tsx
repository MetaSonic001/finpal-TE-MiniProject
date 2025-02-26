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
  ArrowUp,
  ArrowDown,
  Upload,
  Download,
  BarChart,
  Bell,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  FilterX,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for the banking page
const bankingData = {
  linkedAccounts: [
    {
      id: 1,
      bankName: "HDFC Bank",
      accountType: "Savings Account",
      accountNumber: "XXXX XXXX 3560",
      balance: "₹35,450.00",
      color: "bg-emerald-700",
      logo: "/hdfc.png"
    },
    {
      id: 2,
      bankName: "ICICI Bank",
      accountType: "Savings Account",
      accountNumber: "XXXX XXXX 7823",
      balance: "₹48,200.00",
      color: "bg-blue-700",
      logo: "/icici.png"
    },
    {
      id: 3,
      bankName: "SBI",
      accountType: "Salary Account",
      accountNumber: "XXXX XXXX 9032",
      balance: "₹22,800.00",
      color: "bg-purple-700",
      logo: "/sbi.png"
    },
    {
      id: 4,
      bankName: "Axis Bank",
      accountType: "Current Account",
      accountNumber: "XXXX XXXX 1276",
      balance: "₹65,320.00",
      color: "bg-red-700",
      logo: "/axis.png"
    }
  ],
  creditCards: [
    {
      id: 1,
      bankName: "HDFC Bank",
      cardType: "Regalia Credit Card",
      cardNumber: "XXXX XXXX XXXX 5632",
      availableLimit: "₹1,45,000",
      totalLimit: "₹2,00,000",
      dueDate: "15 Mar, 2025",
      outstandingAmount: "₹55,000",
      color: "bg-gradient-to-r from-emerald-700 to-emerald-900",
      logo: "/hdfc.png"
    },
    {
      id: 2,
      bankName: "ICICI Bank",
      cardType: "Amazon Pay Credit Card",
      cardNumber: "XXXX XXXX XXXX 8971",
      availableLimit: "₹72,500",
      totalLimit: "₹1,00,000",
      dueDate: "20 Mar, 2025",
      outstandingAmount: "₹27,500",
      color: "bg-gradient-to-r from-blue-700 to-blue-900",
      logo: "/icici.png"
    }
  ],
  recentTransactions: [
    { 
      id: 1, 
      name: "Amazon India", 
      type: "expense", 
      amount: "₹2,450.00", 
      date: "Feb 24, 2025", 
      time: "14:35",
      category: "Shopping",
      status: "Completed",
      method: "HDFC Debit Card",
      account: "HDFC Bank - XXXX3560"
    },
    { 
      id: 2, 
      name: "Salary Credit", 
      type: "income", 
      amount: "₹75,000.00", 
      date: "Feb 20, 2025", 
      time: "10:02",
      category: "Income",
      status: "Completed",
      method: "Bank Transfer",
      account: "SBI - XXXX9032"
    },
    { 
      id: 3, 
      name: "Zomato", 
      type: "expense", 
      amount: "₹750.00", 
      date: "Feb 18, 2025", 
      time: "20:17",
      category: "Food",
      status: "Completed",
      method: "ICICI Credit Card",
      account: "ICICI Bank Amazon Pay - XXXX8971"
    },
    { 
      id: 4, 
      name: "Netflix", 
      type: "expense", 
      amount: "₹649.00", 
      date: "Feb 15, 2025", 
      time: "03:00",
      category: "Entertainment",
      status: "Recurring",
      method: "SBI Credit Card",
      account: "SBI - XXXX9032"
    },
    { 
      id: 5, 
      name: "Electricity Bill", 
      type: "expense", 
      amount: "₹2,100.00", 
      date: "Feb 14, 2025", 
      time: "16:42",
      category: "Utilities",
      status: "Pending",
      method: "Auto Debit - HDFC",
      account: "HDFC Bank - XXXX3560"
    }
  ],
  recurringTransactions: [
    {
      id: 1,
      name: "Netflix Subscription",
      amount: "₹649",
      nextDate: "15 Mar, 2025",
      frequency: "Monthly",
      account: "SBI - XXXX9032"
    },
    {
      id: 2,
      name: "Gym Membership",
      amount: "₹1,999",
      nextDate: "05 Mar, 2025",
      frequency: "Monthly",
      account: "HDFC Bank - XXXX3560"
    },
    {
      id: 3,
      name: "Home Loan EMI",
      amount: "₹28,450",
      nextDate: "10 Mar, 2025",
      frequency: "Monthly",
      account: "ICICI Bank - XXXX7823"
    },
    {
      id: 4,
      name: "Amazon Prime",
      amount: "₹1,499",
      nextDate: "22 Mar, 2025",
      frequency: "Yearly",
      account: "ICICI Bank Amazon Pay - XXXX8971"
    }
  ],
  accountInsights: [
    {
      id: 1,
      title: "Spending increased by 12%",
      description: "Your overall spending has increased compared to last month.",
      type: "warning",
      action: "View Details"
    },
    {
      id: 2,
      title: "Optimize your account usage",
      description: "Switch to HDFC for online shopping to earn 2% more cashback.",
      type: "tip",
      action: "Apply Now"
    },
    {
      id: 3,
      title: "Credit card due soon",
      description: "Your HDFC credit card payment of ₹55,000 is due in 17 days.",
      type: "alert",
      action: "Pay Now"
    }
  ]
};

export default function BankingPage() {
  const [activeTab, setActiveTab] = useState("accounts");

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banking</h1>
          <p className="text-muted-foreground">Manage all your bank accounts</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="w-64 pl-8 rounded-full bg-background"
            />
          </div>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Accounts
          </Button>
        </div>
      </div>

      {/* Tabs for different banking sections */}
      <Tabs defaultValue="accounts" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:w-fit w-full">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="creditCards">Credit Cards</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
        </TabsList>
        
        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Bank Accounts</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Link New Account
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bankingData.linkedAccounts.map((account) => (
              <Card key={account.id} className="overflow-hidden">
                <div className={`h-2 w-full ${account.color}`}></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mr-4">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold">{account.bankName}</h3>
                        <p className="text-sm text-muted-foreground">{account.accountType}</p>
                        <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl">{account.balance}</div>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Statements
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Account Insights */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Account Insights</h2>
            <div className="space-y-3">
              {bankingData.accountInsights.map((insight) => (
                <Card key={insight.id} className={`border-l-4 ${
                  insight.type === 'warning' ? 'border-l-yellow-500' :
                  insight.type === 'tip' ? 'border-l-blue-500' : 'border-l-red-500'
                }`}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${
                        insight.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        insight.type === 'tip' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {insight.type === 'warning' ? <AlertCircle className="h-5 w-5" /> :
                         insight.type === 'tip' ? <BarChart className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">{insight.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Credit Cards Tab */}
        <TabsContent value="creditCards" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Credit Cards</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Link New Card
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bankingData.creditCards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <div className={`${card.color} p-6 text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs opacity-80">Credit Card</p>
                      <h3 className="font-bold text-lg">{card.bankName}</h3>
                      <p className="text-sm">{card.cardType}</p>
                    </div>
                    <CreditCard className="h-8 w-8 opacity-80" />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs opacity-80">Card Number</p>
                    <p className="text-base">{card.cardNumber}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Available Limit</p>
                      <p className="font-semibold">{card.availableLimit} / {card.totalLimit}</p>
                      <Progress 
                        value={parseFloat(card.availableLimit.replace(/[₹,]/g, '')) / 
                               parseFloat(card.totalLimit.replace(/[₹,]/g, '')) * 100}
                        className="h-2 mt-2"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Due Date</p>
                      <p className="font-semibold">{card.dueDate}</p>
                      <p className="text-sm text-red-600 font-medium">₹{card.outstandingAmount} due</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Statements
                    </Button>
                    <Button variant="default" size="sm" className="text-xs">
                      Pay Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Statement
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                  <SelectItem value="sbi">SBI</SelectItem>
                  <SelectItem value="axis">Axis Bank</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
                  <div className="col-span-2">Transaction</div>
                  <div>Date</div>
                  <div>Category</div>
                  <div>Account</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="divide-y">
                  {bankingData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-6 p-4 text-sm items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'income' ? (
                            <ArrowDown className="h-5 w-5 text-green-600" />
                          ) : (
                            <ArrowUp className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.name}</div>
                          <div className="text-xs text-muted-foreground">{transaction.method}</div>
                        </div>
                      </div>
                      <div>
                        <div>{transaction.date}</div>
                        <div className="text-xs text-muted-foreground">{transaction.time}</div>
                      </div>
                      <div>
                        <Badge variant="outline" className="bg-muted">
                          {transaction.category}
                        </Badge>
                      </div>
                      <div className="text-xs">{transaction.account}</div>
                      <div className={`text-right font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="flex items-center justify-between p-4">
              <div className="text-sm text-muted-foreground">Showing 5 of 156 transactions</div>
              <Button variant="outline" size="sm">
                View All Transactions
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
          
          {/* AI Transaction Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>AI Transaction Analysis</CardTitle>
              <CardDescription>Our AI has analyzed your recent transactions and found the following insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-2 items-start">
                  <BarChart className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Spending Patterns</h3>
                    <p className="text-sm text-muted-foreground">Your food expenses have increased by 15% compared to last month. Consider setting a budget for dining out.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-2 items-start">
                  <BarChart className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Duplicate Subscriptions</h3>
                    <p className="text-sm text-muted-foreground">You appear to be paying for both Netflix and Amazon Prime. Consider using just one service to save ₹649 monthly.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-2 items-start">
                  <BarChart className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Cashback Opportunity</h3>
                    <p className="text-sm text-muted-foreground">Switch your Amazon payments to ICICI Amazon Pay card to earn 5% cashback on all your shopping.</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                Get Personalized Financial Advice
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Recurring Tab */}
        <TabsContent value="recurring" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recurring Payments & Subscriptions</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recurring Payment
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
                  <div className="col-span-2">Subscription</div>
                  <div>Frequency</div>
                  <div>Next Due Date</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="divide-y">
                  {bankingData.recurringTransactions.map((subscription) => (
                    <div key={subscription.id} className="grid grid-cols-5 p-4 text-sm items-center">
                      <div className="col-span-2">
                        <div className="font-medium">{subscription.name}</div>
                        <div className="text-xs text-muted-foreground">{subscription.account}</div>
                      </div>
                      <div>{subscription.frequency}</div>
                      <div>{subscription.nextDate}</div>
                      <div className="text-right font-medium">
                        {subscription.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Bill Reminders */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Bill Reminders</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Electricity Bill</h4>
                      <p className="text-sm text-muted-foreground">HDFC Bank - XXXX3560</p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Due Soon
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-medium">₹2,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <span className="font-medium">03 Mar, 2025</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4">Pay Now</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Broadband Bill</h4>
                      <p className="text-sm text-muted-foreground">ICICI Bank - XXXX7823</p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Due Soon
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-medium">₹1,299</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <span className="font-medium">10 Mar, 2025</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4">Pay Now</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Home Loan EMI</h4>
                      <p className="text-sm text-muted-foreground">ICICI Bank - XXXX7823</p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Due Soon
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-medium">₹28,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <span className="font-medium">05 Mar, 2025</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4">Pay Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Smart Recommendations */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Smart Recommendations</CardTitle>
              <CardDescription>Based on your recurring payments, we recommend the following optimizations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="h-5 w-5 mt-0.5 text-yellow-600" />
                  <div>
                    <h3 className="font-medium">Streaming Services Optimization</h3>
                    <p className="text-sm text-muted-foreground">You are spending ₹2,148 monthly on streaming services. Consider bundling options to save up to ₹750 per month.</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Options
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="h-5 w-5 mt-0.5 text-green-600" />
                  <div>
                    <h3 className="font-medium">EMI Repayment Strategy</h3>
                    <p className="text-sm text-muted-foreground">Increase your Home Loan EMI by ₹5,000 to save ₹3.2 lakhs in interest and reduce loan tenure by 3 years.</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Adjust EMI
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}