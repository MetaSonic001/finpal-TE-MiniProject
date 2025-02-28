"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { generateInvoiceNumber } from "@/lib/gst-calculator";

const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.date({
    required_error: "Invoice date is required",
  }),
  customerName: z.string().min(1, "Customer name is required"),
  customerGST: z.string().optional(),
  totalAmount: z.coerce.number().positive("Amount must be positive"),
  cgst: z.coerce.number().min(0, "CGST cannot be negative"),
  sgst: z.coerce.number().min(0, "SGST cannot be negative"),
  igst: z.coerce.number().min(0, "IGST cannot be negative"),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

interface AddInvoiceFormProps {
  gstFilingId: string;
  onSuccess?: () => void;
}

export function AddInvoiceForm({
  gstFilingId,
  onSuccess,
}: AddInvoiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: generateInvoiceNumber(),
      customerName: "",
      customerGST: "",
      totalAmount: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
    },
  });

  async function onSubmit(data: InvoiceFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/gst/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gstFilingId,
          invoiceNumber: data.invoiceNumber,
          invoiceDate: data.invoiceDate.toISOString(),
          customerName: data.customerName,
          customerGST: data.customerGST,
          totalAmount: Number(data.totalAmount),
          cgst: Number(data.cgst),
          sgst: Number(data.sgst),
          igst: Number(data.igst),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Invoice added successfully");
        form.reset();
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.error || "Failed to add invoice");
      }
    } catch (error) {
      toast.error("An error occurred while adding the invoice");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Calculate tax amounts based on total amount
  const calculateTax = (totalAmount: number) => {
    const cgst = totalAmount * 0.09;
    const sgst = totalAmount * 0.09;
    const igst = 0; // Assuming intra-state transaction

    form.setValue("cgst", cgst);
    form.setValue("sgst", sgst);
    form.setValue("igst", igst);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input placeholder="INV-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Invoice Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Customer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerGST"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer GST (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="27AADCB2230M1ZT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="totalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount (₹)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    calculateTax(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter the total amount including tax
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="cgst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CGST (₹)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sgst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SGST (₹)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="igst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IGST (₹)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Invoice"}
        </Button>
      </form>
    </Form>
  );
}
