"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: Date;
  customerName: string;
  customerGST?: string | null;
  totalAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
}

interface InvoiceListProps {
  invoices: Invoice[];
  onDelete?: (id: string) => void;
}

export function InvoiceList({ invoices, onDelete }: InvoiceListProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Tax</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  No invoices found
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>
                    {format(new Date(invoice.invoiceDate), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(invoice.totalAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(invoice.totalTax)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedInvoice(invoice)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(invoice.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedInvoice}
        onOpenChange={(open) => !open && setSelectedInvoice(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              Invoice #{selectedInvoice?.invoiceNumber}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            {selectedInvoice && (
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Invoice Number:
                      </span>
                      <span className="font-medium">
                        {selectedInvoice.invoiceNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {format(new Date(selectedInvoice.invoiceDate), "PPP")}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer:</span>
                      <span className="font-medium">
                        {selectedInvoice.customerName}
                      </span>
                    </div>
                    {selectedInvoice.customerGST && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          GST Number:
                        </span>
                        <span className="font-medium">
                          {selectedInvoice.customerGST}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Amount:
                      </span>
                      <span className="font-medium">
                        {formatCurrency(selectedInvoice.totalAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CGST:</span>
                      <span className="font-medium">
                        {formatCurrency(selectedInvoice.cgst)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SGST:</span>
                      <span className="font-medium">
                        {formatCurrency(selectedInvoice.sgst)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IGST:</span>
                      <span className="font-medium">
                        {formatCurrency(selectedInvoice.igst)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Tax:</span>
                      <span className="font-medium">
                        {formatCurrency(selectedInvoice.totalTax)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={() => setSelectedInvoice(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
