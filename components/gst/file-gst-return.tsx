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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilingStatus } from "@/types/supabase";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const gstReturnSchema = z.object({
  totalSales: z.coerce.number().min(0, "Total sales cannot be negative"),
  totalPurchases: z.coerce
    .number()
    .min(0, "Total purchases cannot be negative"),
  totalOutputTax: z.coerce
    .number()
    .min(0, "Total output tax cannot be negative"),
  totalInputTax: z.coerce.number().min(0, "Total input tax cannot be negative"),
  taxPayable: z.coerce.number().min(0, "Tax payable cannot be negative"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

type GSTReturnFormValues = z.infer<typeof gstReturnSchema>;

interface FileGSTReturnProps {
  gstFilingId: string;
  returnType: string;
  period: string;
  totalTaxLiability?: number | null;
  totalITC?: number | null;
  taxPayable?: number | null;
  onSuccess?: () => void;
}

export function FileGSTReturn({
  gstFilingId,
  returnType,
  period,
  totalTaxLiability = 0,
  totalITC = 0,
  taxPayable = 0,
  onSuccess,
}: FileGSTReturnProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GSTReturnFormValues>({
    resolver: zodResolver(gstReturnSchema),
    defaultValues: {
      totalSales: 0,
      totalPurchases: 0,
      totalOutputTax: totalTaxLiability || 0,
      totalInputTax: totalITC || 0,
      taxPayable: taxPayable || 0,
      paymentMethod: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(data: GSTReturnFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/gst/${gstFilingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "FILED" as FilingStatus,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("GST return filed successfully");
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.error || "Failed to file GST return");
      }
    } catch (error) {
      toast.error("An error occurred while filing the GST return");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>File {returnType} Return</CardTitle>
        <CardDescription>For period: {period}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalSales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Sales (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalPurchases"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Purchases (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalOutputTax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Output Tax (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Tax collected on sales</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalInputTax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input Tax Credit (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Tax paid on purchases</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tax Payable</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(
                      form.watch("totalOutputTax") - form.watch("totalInputTax")
                    )}
                  </span>
                </div>
              </div>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                        <SelectItem value="debit_card">Debit Card</SelectItem>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                <FileCheck className="mr-2 h-4 w-4" />
                {isSubmitting ? "Filing..." : "File Return"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
