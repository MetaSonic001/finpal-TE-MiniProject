/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  FileText,
  Search,
  ArrowUpRight,
  UserCheck,
  Download,
  FileCheck,
  BarChart3,
  Calendar,
  Lightbulb,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { GSTSummary } from "@/components/gst/gst-summary";
import { AddInvoiceForm } from "@/components/gst/add-invoice-form";
import { InvoiceList } from "@/components/gst/invoice-list";
import { FileGSTReturn } from "@/components/gst/file-gst-return";
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import type { FilingStatus } from "@/types/supabase";

// Mock data for tax filing
const taxData = {
  currentYear: "2024-25",
  dueDate: "July 31, 2025",
  status: "Not Started",
  assessmentYear: "2025-26",
  incomeDetails: {
    salary: "₹12,00,000",
    interest: "₹45,000",
    rental: "₹1,20,000",
    business: "₹0",
    capitalGains: "₹85,000",
    others: "₹25,000",
    grossTotal: "₹14,75,000",
  },
  taxSavings: {
    section80C: {
      limit: "₹1,50,000",
      used: "₹87,500",
      percentage: 58,
    },
    section80D: {
      limit: "₹25,000",
      used: "₹15,000",
      percentage: 60,
    },
    homeInterest: {
      limit: "₹2,00,000",
      used: "₹1,80,000",
      percentage: 90,
    },
  },
  previousFilings: [
    {
      year: "2023-24",
      date: "July 15, 2024",
      refund: "₹32,450",
      status: "Processed",
    },
    {
      year: "2022-23",
      date: "July 28, 2023",
      refund: "₹18,250",
      status: "Processed",
    },
    {
      year: "2021-22",
      date: "July 30, 2022",
      refund: "₹5,750",
      status: "Processed",
    },
  ],
  taxAnalysis: {
    currentTax: "₹2,34,000",
    optimizedTax: "₹1,89,500",
    potentialSavings: "₹44,500",
  },
  gstDetails: {
    gstNumber: "27AADCB2230M1ZT",
    pendingReturns: 1,
    lastFiled: "January 2025",
    nextDue: "February 20, 2025",
  },
  taxSuggestions: [
    {
      title: "Maximize 80C Deductions",
      savings: "₹18,750",
      description: "Invest ₹62,500 more in ELSS funds to reach ₹1,50,000 limit",
      action: "Invest Now",
    },
    {
      title: "Health Insurance Premium",
      savings: "₹3,000",
      description:
        "Increase your health insurance coverage to utilize full ₹25,000 limit",
      action: "Compare Plans",
    },
    {
      title: "National Pension Scheme",
      savings: "₹15,000",
      description:
        "Contribute to NPS for additional tax benefits under Section 80CCD(1B)",
      action: "Open NPS Account",
    },
  ],
  consultants: [
    {
      name: "Priya Sharma",
      specialization: "Personal Income Tax",
      rating: 4.8,
      experience: "12 years",
      availability: "Available Today",
    },
    {
      name: "Rohit Kapoor",
      specialization: "GST & Business Taxation",
      rating: 4.9,
      experience: "15 years",
      availability: "Available Tomorrow",
    },
  ],
};

// Mock user ID - in a real app, this would come from authentication
const mockUserId = "123e4567-e89b-12d3-a456-426614174000";

export default function TaxFilingPage() {
  const [activeTab, setActiveTab] = useState("income-tax");
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showFileReturn, setShowFileReturn] = useState(false);
  const [gstFilings, setGstFilings] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch GST filings and invoices from Supabase
  useEffect(() => {
    const fetchGSTData = async () => {
      setIsLoading(true);
      try {
        // Fetch GST filings
        const { data: filingsData, error: filingsError } = await supabase
          .from("gst_filings")
          .select("*")
          .eq("user_id", mockUserId)
          .order("due_date", { ascending: false });

        if (filingsError) throw filingsError;

        if (filingsData && filingsData.length > 0) {
          setGstFilings(filingsData);

          // Fetch invoices for the first GST filing
          const { data: invoicesData, error: invoicesError } = await supabase
            .from("gst_invoices")
            .select("*")
            .eq("gst_filing_id", filingsData[0].id)
            .order("invoice_date", { ascending: false });

          if (invoicesError) throw invoicesError;

          setInvoices(invoicesData || []);
        } else {
          // If no filings exist, create a default one
          const { data: newFiling, error: newFilingError } = await supabase
            .from("gst_filings")
            .insert({
              user_id: mockUserId,
              gst_number: taxData.gstDetails.gstNumber,
              return_type: "GSTR-3B",
              period: "January 2025",
              due_date: new Date("2025-02-20").toISOString(),
              status: "NOT_STARTED" as FilingStatus,
              total_tax_liability: 0,
              total_itc: 0,
              tax_payable: 0,
            })
            .select();

          if (newFilingError) throw newFilingError;

          if (newFiling) {
            setGstFilings(newFiling);
          }
        }
      } catch (error) {
        console.error("Error fetching GST data:", error);
        toast.error("Failed to load GST data");

        // Use mock data as fallback
        setGstFilings([
          {
            id: "mock-filing-id",
            user_id: mockUserId,
            gst_number: taxData.gstDetails.gstNumber,
            return_type: "GSTR-3B",
            period: "January 2025",
            due_date: new Date("2025-02-20").toISOString(),
            status: "NOT_STARTED" as FilingStatus,
            total_tax_liability: 45000,
            total_itc: 32000,
            tax_payable: 13000,
          },
        ]);

        setInvoices([
          {
            id: "mock-invoice-1",
            gst_filing_id: "mock-filing-id",
            invoice_number: "INV-001",
            invoice_date: new Date("2025-01-15").toISOString(),
            customer_name: "ABC Enterprises",
            customer_gst: "29ABCDE1234F1Z5",
            total_amount: 118000,
            cgst: 9000,
            sgst: 9000,
            igst: 0,
            total_tax: 18000,
          },
          {
            id: "mock-invoice-2",
            gst_filing_id: "mock-filing-id",
            invoice_number: "INV-002",
            invoice_date: new Date("2025-01-22").toISOString(),
            customer_name: "XYZ Corporation",
            customer_gst: "27XYZAB5678G1Z3",
            total_amount: 236000,
            cgst: 18000,
            sgst: 18000,
            igst: 0,
            total_tax: 36000,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGSTData();
  }, []);

  const handleAddInvoice = async () => {
    setShowAddInvoice(false);

    // Refresh invoices
    try {
      const { data, error } = await supabase
        .from("gst_invoices")
        .select("*")
        .eq("gst_filing_id", gstFilings[0]?.id)
        .order("invoice_date", { ascending: false });

      if (error) throw error;

      setInvoices(data || []);

      // Also refresh the GST filing to get updated tax amounts
      const { data: filingData, error: filingError } = await supabase
        .from("gst_filings")
        .select("*")
        .eq("id", gstFilings[0]?.id)
        .single();

      if (filingError) throw filingError;

      setGstFilings((prev) => [filingData, ...prev.slice(1)]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleFileReturn = async () => {
    setShowFileReturn(false);

    // Refresh GST filings
    try {
      const { data, error } = await supabase
        .from("gst_filings")
        .select("*")
        .eq("id", gstFilings[0]?.id)
        .single();

      if (error) throw error;

      setGstFilings((prev) => [data, ...prev.slice(1)]);
    } catch (error) {
      console.error("Error refreshing filing data:", error);
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    // Refresh invoices after deletion
    try {
      const { data, error } = await supabase
        .from("gst_invoices")
        .select("*")
        .eq("gst_filing_id", gstFilings[0]?.id)
        .order("invoice_date", { ascending: false });

      if (error) throw error;

      setInvoices(data || []);

      // Also refresh the GST filing to get updated tax amounts
      const { data: filingData, error: filingError } = await supabase
        .from("gst_filings")
        .select("*")
        .eq("id", gstFilings[0]?.id)
        .single();

      if (filingError) throw filingError;

      setGstFilings((prev) => [filingData, ...prev.slice(1)]);
    } catch (error) {
      console.error("Error refreshing data after deletion:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tax Filing</h1>
          <p className="text-muted-foreground">
            Manage all your tax needs in one place
          </p>
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
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Tax Type Tabs */}
      <Tabs
        defaultValue="income-tax"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="income-tax">Income Tax</TabsTrigger>
            <TabsTrigger value="gst">GST</TabsTrigger>
            <TabsTrigger value="tax-planning">Tax Planning</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Download Reports
            </Button>
            <Button size="sm">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              File Now
            </Button>
          </div>
        </div>

        {/* Income Tax Tab Content */}
        <TabsContent value="income-tax" className="space-y-6">
          {/* Status and Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Filing Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Assessment Year
                    </span>
                    <span className="font-medium">
                      {taxData.assessmentYear}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Financial Year
                    </span>
                    <span className="font-medium">{taxData.currentYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date</span>
                    <span className="font-medium">{taxData.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      {taxData.status}
                    </Badge>
                  </div>
                </div>
                <Button className="w-full mt-4">Start Filing</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Tax Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Tax</span>
                    <span className="font-medium text-red-600">
                      {taxData.taxAnalysis.currentTax}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Optimized Tax</span>
                    <span className="font-medium text-green-600">
                      {taxData.taxAnalysis.optimizedTax}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Potential Savings
                    </span>
                    <span className="font-medium text-green-600">
                      {taxData.taxAnalysis.potentialSavings}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  View Optimization Tips
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <Calculator className="mr-2 h-4 w-4" />
                  Tax Calculator
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Form 16
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Past Returns
                </Button>
                <Button variant="outline" className="justify-start">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Consult Expert
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Income Details & Deduction Usage */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Details</CardTitle>
                <CardDescription>
                  Summary of your income from all sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(taxData.incomeDetails).map(
                    ([key, value], index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="text-muted-foreground capitalize">
                          {key === "grossTotal"
                            ? "Gross Total Income"
                            : key === "capitalGains"
                            ? "Capital Gains"
                            : key}
                        </div>
                        <div
                          className={`font-medium ${
                            key === "grossTotal" ? "text-lg" : ""
                          }`}
                        >
                          {value}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    Edit Income Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deduction Usage</CardTitle>
                <CardDescription>
                  Track your tax-saving deductions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Section 80C (PPF, ELSS, LIC, etc.)</span>
                    <span>
                      {taxData.taxSavings.section80C.used} /{" "}
                      {taxData.taxSavings.section80C.limit}
                    </span>
                  </div>
                  <Progress
                    value={taxData.taxSavings.section80C.percentage}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Section 80D (Health Insurance)</span>
                    <span>
                      {taxData.taxSavings.section80D.used} /{" "}
                      {taxData.taxSavings.section80D.limit}
                    </span>
                  </div>
                  <Progress
                    value={taxData.taxSavings.section80D.percentage}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Home Loan Interest</span>
                    <span>
                      {taxData.taxSavings.homeInterest.used} /{" "}
                      {taxData.taxSavings.homeInterest.limit}
                    </span>
                  </div>
                  <Progress
                    value={taxData.taxSavings.homeInterest.percentage}
                    className="h-2"
                  />
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  View All Deductions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Previous Filings & Tax Saving Suggestions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Previous Tax Filings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxData.previousFilings.map((filing, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50"
                    >
                      <div>
                        <div className="font-medium">
                          Assessment Year {filing.year}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Filed on {filing.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium text-green-600">
                            Refund: {filing.refund}
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {filing.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Saving Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxData.taxSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium">{suggestion.title}</div>
                        <Badge className="bg-green-50 text-green-700 border-0">
                          Save {suggestion.savings}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {suggestion.description}
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        {suggestion.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Experts */}
          <Card>
            <CardHeader>
              <CardTitle>Connect with Tax Experts</CardTitle>
              <CardDescription>
                Get personalized tax advice from certified professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {taxData.consultants.map((consultant, index) => (
                  <Card key={index} className="border-0 bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {consultant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">
                                {consultant.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {consultant.specialization}
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              {consultant.availability}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <span className="text-amber-500">
                              ★ {consultant.rating}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="text-muted-foreground">
                              {consultant.experience}
                            </span>
                          </div>
                          <Button size="sm" className="mt-2">
                            Schedule Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GST Tab Content */}
        <TabsContent value="gst" className="space-y-6">
          {/* GST Summary Card */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <GSTSummary
                gstNumber={taxData.gstDetails.gstNumber}
                pendingReturns={
                  gstFilings.filter(
                    (f) =>
                      f.status === "NOT_STARTED" || f.status === "IN_PROGRESS"
                  ).length
                }
                lastFiled={
                  gstFilings.find(
                    (f) => f.status === "FILED" || f.status === "PROCESSED"
                  )
                    ? {
                        period:
                          gstFilings.find(
                            (f) =>
                              f.status === "FILED" || f.status === "PROCESSED"
                          )?.period || "",
                        filingDate: gstFilings.find(
                          (f) =>
                            f.status === "FILED" || f.status === "PROCESSED"
                        )?.filing_date,
                      }
                    : null
                }
                nextDue={
                  gstFilings.find(
                    (f) =>
                      f.status === "NOT_STARTED" || f.status === "IN_PROGRESS"
                  )
                    ? {
                        period:
                          gstFilings.find(
                            (f) =>
                              f.status === "NOT_STARTED" ||
                              f.status === "IN_PROGRESS"
                          )?.period || "",
                        dueDate: new Date(
                          gstFilings.find(
                            (f) =>
                              f.status === "NOT_STARTED" ||
                              f.status === "IN_PROGRESS"
                          )?.due_date || ""
                        ),
                      }
                    : undefined
                }
                onFileNow={() => setShowFileReturn(true)}
                onGenerateInvoices={() => setShowAddInvoice(true)}
              />

              {/* GST Filing Details */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>GST Filing Details</CardTitle>
                    <CardDescription>
                      Manage your GST returns and invoices
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog
                      open={showAddInvoice}
                      onOpenChange={setShowAddInvoice}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Invoice
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add New Invoice</DialogTitle>
                          <DialogDescription>
                            Enter the invoice details to add to your GST filing
                          </DialogDescription>
                        </DialogHeader>
                        <AddInvoiceForm
                          gstFilingId={gstFilings[0]?.id || "mock-filing-id"}
                          onSuccess={handleAddInvoice}
                        />
                      </DialogContent>
                    </Dialog>

                    <Sheet
                      open={showFileReturn}
                      onOpenChange={setShowFileReturn}
                    >
                      <SheetTrigger asChild>
                        <Button>
                          <FileText className="mr-2 h-4 w-4" />
                          File Return
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle>File GST Return</SheetTitle>
                          <SheetDescription>
                            Complete your GST return filing
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                          <FileGSTReturn
                            gstFilingId={gstFilings[0]?.id || "mock-filing-id"}
                            returnType={gstFilings[0]?.return_type || "GSTR-3B"}
                            period={gstFilings[0]?.period || "January 2025"}
                            totalTaxLiability={
                              gstFilings[0]?.total_tax_liability || 0
                            }
                            totalITC={gstFilings[0]?.total_itc || 0}
                            taxPayable={gstFilings[0]?.tax_payable || 0}
                            onSuccess={handleFileReturn}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Current Returns
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {gstFilings.map((filing, index) => (
                          <Card key={index} className="bg-muted/30 border-0">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-medium">
                                    {filing.return_type}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Period: {filing.period}
                                  </div>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={
                                    filing.status === "FILED" ||
                                    filing.status === "PROCESSED"
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  }
                                >
                                  {filing.status.replace("_", " ")}
                                </Badge>
                              </div>
                              <div className="space-y-1 mt-3">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Tax Liability:
                                  </span>
                                  <span>
                                    {formatCurrency(filing.total_tax_liability)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Input Tax Credit:
                                  </span>
                                  <span>
                                    {formatCurrency(filing.total_itc)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                  <span>Tax Payable:</span>
                                  <span>
                                    {formatCurrency(filing.tax_payable)}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => setShowFileReturn(true)}
                                  disabled={
                                    filing.status === "FILED" ||
                                    filing.status === "PROCESSED"
                                  }
                                >
                                  {filing.status === "FILED" ||
                                  filing.status === "PROCESSED"
                                    ? "Filed"
                                    : "File Now"}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Invoices</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddInvoice(true)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Invoice
                        </Button>
                      </div>
                      <InvoiceList
                        invoices={invoices}
                        onDelete={handleDeleteInvoice}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Tax Planning Tab Content */}
        <TabsContent value="tax-planning" className="space-y-6">
          {/* Tax Planning Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Planning Tools</CardTitle>
              <CardDescription>
                This section would contain comprehensive tax planning features
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Tax planning and optimization features coming soon</p>
              <p className="text-sm mt-2">
                This section will include tax simulators, comparison tools, and
                personalized recommendations
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
