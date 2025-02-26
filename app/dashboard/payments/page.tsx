// app/payments/page.tsx
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
  ArrowRight,
  ArrowLeft,
  Clock,
  CreditCard,
  Calendar,
  User,
  Smartphone,
  Search,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Download,
  XCircle,
  PlusCircle,
  ArrowDown,
  ArrowUp,
  CheckIcon,
  FileX,
  Repeat,
  Share,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Sample data objects
const myAccounts = [
    {
      id: 1,
      bankName: "HDFC Bank",
      accountNumber: "XXXX1234",
      accountType: "Savings",
      balance: "₹75,250.60"
    },
    {
      id: 2,
      bankName: "ICICI Bank",
      accountNumber: "XXXX5678",
      accountType: "Salary",
      balance: "₹32,680.25"
    },
    {
      id: 3,
      bankName: "State Bank of India",
      accountNumber: "XXXX9012",
      accountType: "Current",
      balance: "₹1,05,400.00"
    }
  ];
  
  const savedBeneficiaries = [
    {
      id: 1,
      name: "Rahul Sharma",
      bank: "HDFC Bank",
      accountNumber: "XXXX5678",
      upiId: "rahul@okhdfcbank",
      isFavorite: true
    },
    {
      id: 2,
      name: "Priya Patel",
      bank: "ICICI Bank",
      accountNumber: "XXXX1234",
      upiId: "priya@okicici",
      isFavorite: true
    },
    {
      id: 3,
      name: "Amit Kumar",
      bank: "State Bank of India",
      accountNumber: "XXXX9012",
      upiId: "amit@oksbi",
      isFavorite: false
    },
    {
      id: 4,
      name: "Neha Singh",
      bank: "Axis Bank",
      accountNumber: "XXXX3456",
      upiId: "neha@okaxis",
      isFavorite: false
    },
    {
      id: 5,
      name: "Vikram Reddy",
      bank: "Kotak Mahindra Bank",
      accountNumber: "XXXX7890",
      upiId: "vikram@okkotak",
      isFavorite: false
    }
  ];
  
  const transferModes = [
    {
      id: "upi",
      name: "UPI",
      icon: <CreditCard className="h-5 w-5 text-primary" />
    },
    {
      id: "imps",
      name: "IMPS",
      icon: <Zap className="h-5 w-5 text-primary" />
    },
    {
      id: "neft",
      name: "NEFT",
      icon: <RefreshCw className="h-5 w-5 text-primary" />
    },
    {
      id: "rtgs",
      name: "RTGS",
      icon: <Share className="h-5 w-5 text-primary" />
    }
  ];
  
  const recentTransactions = [
    {
      id: 1,
      beneficiary: "Rahul Sharma",
      amount: "₹15,000",
      date: "25 Feb, 2025",
      type: "UPI Transfer",
      status: "success"
    },
    {
      id: 2,
      beneficiary: "Electricity Bill - BESCOM",
      amount: "₹2,345",
      date: "23 Feb, 2025",
      type: "Bill Payment",
      status: "success"
    },
    {
      id: 3,
      beneficiary: "Priya Patel",
      amount: "₹8,500",
      date: "21 Feb, 2025",
      type: "IMPS Transfer",
      status: "failed"
    },
    {
      id: 4,
      beneficiary: "Mobile Recharge - Jio",
      amount: "₹499",
      date: "20 Feb, 2025",
      type: "Recharge",
      status: "success"
    },
    {
      id: 5,
      beneficiary: "Amit Kumar",
      amount: "₹22,000",
      date: "18 Feb, 2025",
      type: "NEFT Transfer",
      status: "pending"
    }
  ];
  
  const billCategories = [
    { id: 1, name: "Electricity" },
    { id: 2, name: "Mobile Recharge" },
    { id: 3, name: "DTH/Cable TV" },
    { id: 4, name: "Broadband" },
    { id: 5, name: "Water" },
    { id: 6, name: "Gas" },
    { id: 7, name: "Credit Card" },
    { id: 8, name: "Loan EMI" }
  ];
// app/payments/page.tsx - Continuation

export default function PaymentsPage() {
    const [activeTab, setActiveTab] = useState("transfer");
    const [transferType, setTransferType] = useState("quick");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAccount, setSelectedAccount] = useState(myAccounts[0].id);
    const [transferMode, setTransferMode] = useState("upi");
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<number | null>(null);
    const [transferAmount, setTransferAmount] = useState("");
    const [transferNote, setTransferNote] = useState("");
    const [transactionFilter, setTransactionFilter] = useState("all");
    const [showTransferConfirmation, setShowTransferConfirmation] = useState(false);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  
    // Filter beneficiaries based on search query
    const filteredBeneficiaries = savedBeneficiaries.filter(
      beneficiary => 
        beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beneficiary.accountNumber.includes(searchQuery) ||
        beneficiary.upiId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Filter favorite beneficiaries
    const favoriteBeneficiaries = savedBeneficiaries.filter(
      beneficiary => beneficiary.isFavorite
    );
  
    // Filter transactions based on selected filter
    const filteredTransactions = recentTransactions.filter(transaction => {
      if (transactionFilter === "all") return true;
      return transaction.status.toLowerCase() === transactionFilter.toLowerCase();
    });
  
    const handleTransferSubmit = () => {
      setShowTransferConfirmation(true);
    };
  
    const confirmTransfer = () => {
      setShowTransferConfirmation(false);
      setShowPaymentSuccess(true);
      
      // Reset form fields
      setTimeout(() => {
        setShowPaymentSuccess(false);
        setSelectedBeneficiary(null);
        setTransferAmount("");
        setTransferNote("");
      }, 3000);
    };
  
    return (
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payments & Transfers</h1>
            <p className="text-muted-foreground">Send money, pay bills, and manage recurring payments</p>
          </div>
        </div>
  
        {/* Main Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transfer">Money Transfer</TabsTrigger>
            <TabsTrigger value="bills">Bill Payments</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>
  
          {/* Money Transfer Tab */}
          <TabsContent value="transfer" className="space-y-4">
            {/* Transfer Type Selection */}
            <div className="grid grid-cols-3 gap-4">
              <Card 
                className={`cursor-pointer border-2 ${transferType === "quick" ? "border-primary" : "border-border"}`}
                onClick={() => setTransferType("quick")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <ArrowRight className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Quick Transfer</h3>
                  <p className="text-xs text-muted-foreground text-center">Send to saved beneficiaries</p>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer border-2 ${transferType === "new" ? "border-primary" : "border-border"}`}
                onClick={() => setTransferType("new")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <User className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">New Beneficiary</h3>
                  <p className="text-xs text-muted-foreground text-center">Send to a new account</p>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer border-2 ${transferType === "self" ? "border-primary" : "border-border"}`}
                onClick={() => setTransferType("self")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <RefreshCw className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Self Transfer</h3>
                  <p className="text-xs text-muted-foreground text-center">Between your accounts</p>
                </CardContent>
              </Card>
            </div>
  
            {/* Quick Transfer Section */}
            {transferType === "quick" && (
              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Beneficiary</CardTitle>
                      <CardDescription>Choose from your saved beneficiaries</CardDescription>
                      <div className="relative mt-2">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search beneficiaries..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-2">
                          {filteredBeneficiaries.length > 0 ? (
                            filteredBeneficiaries.map((beneficiary) => (
                              <div
                                key={beneficiary.id}
                                className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer ${
                                  selectedBeneficiary === beneficiary.id
                                    ? "bg-primary/10 border-l-4 border-primary"
                                    : "hover:bg-muted"
                                }`}
                                onClick={() => setSelectedBeneficiary(beneficiary.id)}
                              >
                                <Avatar>
                                  <AvatarFallback>{beneficiary.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="font-medium">{beneficiary.name}</div>
                                  <div className="text-xs text-muted-foreground">{beneficiary.bank} • {beneficiary.accountNumber}</div>
                                  <div className="text-xs text-muted-foreground">{beneficiary.upiId}</div>
                                </div>
                                {beneficiary.isFavorite && (
                                  <span className="text-yellow-500">★</span>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4 text-muted-foreground">
                              No beneficiaries found.
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Beneficiary
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
  
                <div className="md:col-span-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transfer Details</CardTitle>
                      <CardDescription>Enter the amount and select payment method</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="fromAccount">From Account</Label>
                        <Select 
                          value={selectedAccount.toString()} 
                          onValueChange={(value) => setSelectedAccount(parseInt(value))}
                        >
                          <SelectTrigger id="fromAccount" className="w-full mt-1">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {myAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.id.toString()}>
                                {account.bankName} - {account.accountNumber} (Balance: {account.balance})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
  
                      <div>
                        <Label htmlFor="transferMode">Transfer Mode</Label>
                        <div className="grid grid-cols-4 gap-2 mt-1">
                          {transferModes.map((mode) => (
                            <div
                              key={mode.id}
                              className={`border p-3 rounded-md cursor-pointer text-center flex flex-col items-center ${
                                transferMode === mode.id ? "bg-primary/10 border-primary" : ""
                              }`}
                              onClick={() => setTransferMode(mode.id)}
                            >
                              {mode.icon}
                              <span className="text-sm mt-1">{mode.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
  
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative mt-1">
                          <div className="absolute left-3 top-2.5">₹</div>
                          <Input
                            id="amount"
                            type="text"
                            placeholder="Enter amount"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                      </div>
  
                      <div>
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Input
                          id="note"
                          type="text"
                          placeholder="Add a note"
                          value={transferNote}
                          onChange={(e) => setTransferNote(e.target.value)}
                          className="mt-1"
                        />
                      </div>
  
                      <div className="pt-4">
                        <Button className="w-full" onClick={handleTransferSubmit}>Continue to Review</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
  
            {/* New Beneficiary Section */}
            {transferType === "new" && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Beneficiary</CardTitle>
                  <CardDescription>Enter details of the beneficiary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
                      <Input id="beneficiaryName" placeholder="Full name as per bank records" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" placeholder="Enter account number" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirmAccountNumber">Confirm Account Number</Label>
                      <Input id="confirmAccountNumber" placeholder="Re-enter account number" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input id="ifscCode" placeholder="e.g. HDFC0001234" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input id="bankName" placeholder="e.g. HDFC Bank" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="accountType">Account Type</Label>
                      <Select>
                        <SelectTrigger id="accountType" className="w-full mt-1">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="current">Current</SelectItem>
                          <SelectItem value="salary">Salary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="upiId">UPI ID (Optional)</Label>
                      <Input id="upiId" placeholder="e.g. username@upi" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <Input id="mobileNumber" placeholder="10-digit mobile number" className="mt-1" />
                    </div>
                  </div>
  
                  <div className="pt-4 flex gap-4">
                    <Button className="flex-1">Save & Continue to Transfer</Button>
                    <Button variant="outline" className="flex-1">Save for Later</Button>
                  </div>
                </CardContent>
              </Card>
            )}
  
            {/* Self Transfer Section */}
            {transferType === "self" && (
              <Card>
                <CardHeader>
                  <CardTitle>Transfer Between Your Accounts</CardTitle>
                  <CardDescription>Move money between your linked accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>From Account</Label>
                      <div className="space-y-2 mt-2">
                        {myAccounts.map((account) => (
                          <div
                            key={account.id}
                            className="border p-3 rounded-lg cursor-pointer hover:bg-muted/50"
                          >
                            <div className="flex justify-between">
                              <div className="font-medium">{account.bankName}</div>
                              <div>{account.balance}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {account.accountType} • {account.accountNumber}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
  
                    <div>
                      <Label>To Account</Label>
                      <div className="space-y-2 mt-2">
                        {myAccounts.filter(account => account.id !== selectedAccount).map((account) => (
                          <div
                            key={account.id}
                            className="border p-3 rounded-lg cursor-pointer hover:bg-muted/50"
                          >
                            <div className="flex justify-between">
                              <div className="font-medium">{account.bankName}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {account.accountType} • {account.accountNumber}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
  
                  <div>
                    <Label htmlFor="selfTransferAmount">Amount</Label>
                    <div className="relative mt-1">
                      <div className="absolute left-3 top-2.5">₹</div>
                      <Input
                        id="selfTransferAmount"
                        type="text"
                        placeholder="Enter amount"
                        className="pl-8"
                      />
                    </div>
                  </div>
  
                  <div>
                    <Label htmlFor="transferPurpose">Purpose (Optional)</Label>
                    <Select>
                      <SelectTrigger id="transferPurpose" className="w-full mt-1">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">Expense Management</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
  
                  <div className="pt-4">
                    <Button className="w-full" onClick={handleTransferSubmit}>Transfer Now</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
  
          {/* Bill Payments Tab */}
          <TabsContent value="bills" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {billCategories.map((category) => (
                <Card key={category.id} className="cursor-pointer hover:bg-muted/50">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Pay or recharge</p>
                  </CardContent>
                </Card>
              ))}
            </div>
  
            <Card>
              <CardHeader>
                <CardTitle>Recent Bills & Recharges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">Electricity Bill - BESCOM</div>
                        <div className="text-xs text-muted-foreground">Consumer No: 12345678901</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹2,345</div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Due in 3 days
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                              Pay Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Pay Electricity Bill</DialogTitle>
                              <DialogDescription>
                                BESCOM - Consumer No: 12345678901
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex justify-between items-center">
                                <span>Bill Amount</span>
                                <span className="font-bold">₹2,345</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Due Date</span>
                                <span>29 Feb, 2025</span>
                              </div>
                              <div>
                                <Label htmlFor="paymentAccount">Pay from</Label>
                                <Select defaultValue="1">
                                  <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select account" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {myAccounts.map(account => (
                                      <SelectItem key={account.id} value={account.id.toString()}>
                                        {account.bankName} - {account.balance}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Confirm Payment</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
  
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">Mobile Recharge - Jio</div>
                        <div className="text-xs text-muted-foreground">9876543210</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹499</div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Valid till 20 Mar
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                              Recharge
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Mobile Recharge</DialogTitle>
                              <DialogDescription>
                                Jio - 9876543210
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label>Select Plan</Label>
                                <div className="grid grid-cols-1 gap-2 mt-2">
                                  <div className="border p-3 rounded-lg cursor-pointer hover:bg-muted/50">
                                    <div className="flex justify-between">
                                      <div className="font-medium">₹499 - 84 Days</div>
                                      <Badge variant="outline">Best Value</Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      2GB/day + Unlimited Calls
                                    </div>
                                  </div>
                                  <div className="border p-3 rounded-lg cursor-pointer hover:bg-muted/50">
                                    <div className="flex justify-between">
                                      <div className="font-medium">₹299 - 28 Days</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      2GB/day + Unlimited Calls
                                    </div>
                                  </div>
                                  <div className="border p-3 rounded-lg cursor-pointer hover:bg-muted/50">
                                    <div className="flex justify-between">
                                      <div className="font-medium">₹199 - 28 Days</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      1.5GB/day + Unlimited Calls
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="rechargeAccount">Pay from</Label>
                                <Select defaultValue="1">
                                  <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select account" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {myAccounts.map(account => (
                                      <SelectItem key={account.id} value={account.id.toString()}>
                                        {account.bankName} - {account.balance}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Recharge Now</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
  
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">Broadband - Airtel</div>
                        <div className="text-xs text-muted-foreground">Account No: AIR12345678</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹1,299</div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Overdue
                        </Badge>
                        <Button variant="ghost" size="sm" className="ml-2">
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Bills</Button>
              </CardFooter>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Recurring Payments</CardTitle>
                <CardDescription>Manage your automatic bill payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">Electricity Bill - BESCOM</div>
                        <div className="text-xs text-muted-foreground">Auto-pay on 5th of every month</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mr-2">
                        Active
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
  
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">Netflix Subscription</div>
                        <div className="text-xs text-muted-foreground">Auto-pay on 15th of every month</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mr-2">
                        Active
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Setup New Auto-pay
                </Button>
                <Button variant="ghost">Manage All</Button>
              </CardFooter>
            </Card>
          </TabsContent>
  
          {/* Transaction History Tab */}
          <TabsContent value="history" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8 rounded-full bg-background"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="success">Successful</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
  
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="font-medium">{transaction.beneficiary}</div>
                          <div className="text-xs text-muted-foreground">
                            {transaction.date} • {transaction.type}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{transaction.amount}</div>
                          <Badge 
                          variant="outline"
                          className={`
                            ${transaction.status === "success" ? "bg-green-50 text-green-700 border-green-200" : ""}
                            ${transaction.status === "failed" ? "bg-red-50 text-red-700 border-red-200" : ""}
                            ${transaction.status === "pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : ""}
                          `}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileX className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2">No transactions found matching your filter.</p>
                    <Button 
                      variant="link" 
                      onClick={() => setTransactionFilter("all")}
                      className="mt-1"
                    >
                      Show all transactions
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              <CardDescription>Your transaction patterns and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <ArrowUp className="mx-auto h-8 w-8 text-red-500" />
                      <h3 className="mt-2 font-semibold text-muted-foreground">Money Sent</h3>
                      <p className="text-2xl font-bold mt-1">₹45,250</p>
                      <p className="text-xs text-muted-foreground">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <ArrowDown className="mx-auto h-8 w-8 text-green-500" />
                      <h3 className="mt-2 font-semibold text-muted-foreground">Money Received</h3>
                      <p className="text-2xl font-bold mt-1">₹32,680</p>
                      <p className="text-xs text-muted-foreground">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <CreditCard className="mx-auto h-8 w-8 text-blue-500" />
                      <h3 className="mt-2 font-semibold text-muted-foreground">Bills Paid</h3>
                      <p className="text-2xl font-bold mt-1">₹12,490</p>
                      <p className="text-xs text-muted-foreground">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Transfer Confirmation Dialog */}
      <Dialog open={showTransferConfirmation} onOpenChange={setShowTransferConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
            <DialogDescription>
              Please review the details before proceeding
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedBeneficiary && (
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="font-medium">Beneficiary Details</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {savedBeneficiaries.find(b => b.id === selectedBeneficiary)?.name} •
                  {savedBeneficiaries.find(b => b.id === selectedBeneficiary)?.accountNumber}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span>Transfer Amount</span>
              <span className="font-bold">₹{transferAmount || '0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Transfer Mode</span>
              <span>{transferModes.find(m => m.id === transferMode)?.name || 'UPI'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>From Account</span>
              <span>{myAccounts.find(a => a.id === selectedAccount)?.bankName || ''}</span>
            </div>
            {transferNote && (
              <div className="flex justify-between items-center">
                <span>Note</span>
                <span>{transferNote}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Please verify all details. Money once transferred cannot be reversed.
                </AlertDescription>
              </Alert>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmTransfer}>Confirm & Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Success Dialog */}
      <Dialog open={showPaymentSuccess} onOpenChange={setShowPaymentSuccess}>
        <DialogContent className="text-center">
          <div className="py-6 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl">Transfer Successful!</DialogTitle>
            <DialogDescription className="mt-2">
              Your transfer of ₹{transferAmount} has been processed successfully.
            </DialogDescription>
            
            <div className="border rounded-lg p-4 bg-muted/50 mt-4 w-full text-left">
              <div className="text-sm grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Transaction ID:</div>
                <div className="font-medium">TXN{Math.floor(Math.random() * 10000000)}</div>
                <div className="text-muted-foreground">Date & Time:</div>
                <div className="font-medium">{new Date().toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={() => setShowPaymentSuccess(false)}>
                Close
              </Button>
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Share Receipt
              </Button>
              <Button>
                <Repeat className="mr-2 h-4 w-4" />
                New Transfer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}