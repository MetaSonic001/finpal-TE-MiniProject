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
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface Invoice {
  id: string;
  invoice_number: string;
  invoice_date: string;
  customer_name: string;
  customer_gst?: string | null;
  total_amount: number;
  cgst: number;
  sgst: number;
  igst: number;
  total_tax: number;
}

interface InvoiceListProps {
  invoices: Invoice[];
  onDelete?: (id: string) => void;
}

export function InvoiceList({ invoices, onDelete }: InvoiceListProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!onDelete) return;

    setIsDeleting(id);
    try {
      const response = await fetch(`/api/gst/invoices/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        onDelete(id);
        toast.success("Invoice deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete invoice");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the invoice");
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
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
                    {invoice.invoice_number}
                  </TableCell>
                  <TableCell>
                    {format(new Date(invoice.invoice_date), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>{invoice.customer_name}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(invoice.total_amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(invoice.total_tax)}
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
                          onClick={() => handleDelete(invoice.id)}
                          disabled={isDeleting === invoice.id}
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
              Invoice #{selectedInvoice?.invoice_number}
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
                        {selectedInvoice.invoice_number}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {format(new Date(selectedInvoice.invoice_date), "PPP")}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer:</span>
                      <span className="font-medium">
                        {selectedInvoice.customer_name}
                      </span>
                    </div>
                    {selectedInvoice.customer_gst && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          GST Number:
                        </span>
                        <span className="font-medium">
                          {selectedInvoice.customer_gst}
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
                        {formatCurrency(selectedInvoice.total_amount)}
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
                        {formatCurrency(selectedInvoice.total_tax)}
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
