"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Receipt } from "lucide-react"
import { format } from "date-fns"

interface GSTSummaryProps {
  gstNumber: string
  pendingReturns: number
  lastFiled?: {
    period: string
    filingDate?: Date | null
  } | null
  nextDue?: {
    period: string
    dueDate: Date
  } | null
  onFileNow?: () => void
  onGenerateInvoices?: () => void
}

export function GSTSummary({
  gstNumber,
  pendingReturns,
  lastFiled,
  nextDue,
  onFileNow,
  onGenerateInvoices,
}: GSTSummaryProps) {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>GST Summary</CardTitle>
        <CardDescription>Overview of your GST filing status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="text-muted-foreground text-sm mb-1">GST Number</div>
            <div className="font-medium">{gstNumber}</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="text-muted-foreground text-sm mb-1">Pending Returns</div>
            <div className={`font-medium ${pendingReturns > 0 ? "text-red-600" : "text-green-600"}`}>
              {pendingReturns}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="text-muted-foreground text-sm mb-1">Last Filed</div>
            <div className="font-medium">
              {lastFiled ? (
                <>
                  {lastFiled.period}
                  {lastFiled.filingDate && (
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(lastFiled.filingDate), "dd MMM yyyy")}
                    </div>
                  )}
                </>
              ) : (
                "No returns filed yet"
              )}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="text-muted-foreground text-sm mb-1">Next Due</div>
            <div className="font-medium">
              {nextDue ? (
                <>
                  {nextDue.period}
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(nextDue.dueDate), "dd MMM yyyy")}
                  </div>
                </>
              ) : (
                "No pending returns"
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={onGenerateInvoices}>
            <Receipt className="mr-2 h-4 w-4" />
            Generate Invoices
          </Button>
          <Button onClick={onFileNow}>
            <FileText className="mr-2 h-4 w-4" />
            File Return Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

