"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { FilingStatus } from "@prisma/client"

// Get GST filings for a user
export async function getGSTFilings(userId: string) {
  try {
    const gstFilings = await prisma.gSTFiling.findMany({
      where: {
        userId,
      },
      orderBy: {
        dueDate: "desc",
      },
      include: {
        invoices: true,
      },
    })

    return { success: true, data: gstFilings }
  } catch (error) {
    console.error("Error fetching GST filings:", error)
    return { success: false, error: "Failed to fetch GST filings" }
  }
}

// Get a specific GST filing
export async function getGSTFiling(id: string) {
  try {
    const gstFiling = await prisma.gSTFiling.findUnique({
      where: {
        id,
      },
      include: {
        invoices: true,
      },
    })

    if (!gstFiling) {
      return { success: false, error: "GST filing not found" }
    }

    return { success: true, data: gstFiling }
  } catch (error) {
    console.error("Error fetching GST filing:", error)
    return { success: false, error: "Failed to fetch GST filing" }
  }
}

// Create a new GST filing
export async function createGSTFiling(data: {
  userId: string
  gstNumber: string
  returnType: string
  period: string
  dueDate: Date
}) {
  try {
    const gstFiling = await prisma.gSTFiling.create({
      data: {
        userId: data.userId,
        gstNumber: data.gstNumber,
        returnType: data.returnType,
        period: data.period,
        dueDate: data.dueDate,
        status: FilingStatus.NOT_STARTED,
      },
    })

    revalidatePath("/tax")
    return { success: true, data: gstFiling }
  } catch (error) {
    console.error("Error creating GST filing:", error)
    return { success: false, error: "Failed to create GST filing" }
  }
}

// Update GST filing status
export async function updateGSTFilingStatus(id: string, status: FilingStatus) {
  try {
    const gstFiling = await prisma.gSTFiling.update({
      where: {
        id,
      },
      data: {
        status,
        filingDate: status === FilingStatus.FILED ? new Date() : undefined,
      },
    })

    revalidatePath("/tax")
    return { success: true, data: gstFiling }
  } catch (error) {
    console.error("Error updating GST filing status:", error)
    return { success: false, error: "Failed to update GST filing status" }
  }
}

// Add invoice to GST filing
export async function addInvoiceToGSTFiling(
  gstFilingId: string,
  invoiceData: {
    invoiceNumber: string
    invoiceDate: Date
    customerName: string
    customerGST?: string
    totalAmount: number
    cgst: number
    sgst: number
    igst: number
  },
) {
  try {
    const totalTax = invoiceData.cgst + invoiceData.sgst + invoiceData.igst

    const invoice = await prisma.gSTInvoice.create({
      data: {
        gstFilingId,
        invoiceNumber: invoiceData.invoiceNumber,
        invoiceDate: invoiceData.invoiceDate,
        customerName: invoiceData.customerName,
        customerGST: invoiceData.customerGST,
        totalAmount: invoiceData.totalAmount,
        cgst: invoiceData.cgst,
        sgst: invoiceData.sgst,
        igst: invoiceData.igst,
        totalTax,
      },
    })

    // Update the GST filing with new tax calculations
    await prisma.gSTFiling.update({
      where: {
        id: gstFilingId,
      },
      data: {
        totalTaxLiability: {
          increment: totalTax,
        },
        taxPayable: {
          increment: totalTax,
        },
      },
    })

    revalidatePath("/tax")
    return { success: true, data: invoice }
  } catch (error) {
    console.error("Error adding invoice to GST filing:", error)
    return { success: false, error: "Failed to add invoice to GST filing" }
  }
}

// Calculate GST summary
export async function calculateGSTSummary(userId: string) {
  try {
    // Get all GST filings for the user
    const gstFilings = await prisma.gSTFiling.findMany({
      where: {
        userId,
      },
      orderBy: {
        dueDate: "desc",
      },
      include: {
        invoices: true,
      },
    })

    // Calculate pending returns
    const pendingReturns = gstFilings.filter(
      (filing) => filing.status === FilingStatus.NOT_STARTED || filing.status === FilingStatus.IN_PROGRESS,
    ).length

    // Get last filed return
    const lastFiled = gstFilings.find(
      (filing) => filing.status === FilingStatus.FILED || filing.status === FilingStatus.PROCESSED,
    )

    // Get next due return
    const nextDue = gstFilings
      .filter((filing) => filing.status === FilingStatus.NOT_STARTED || filing.status === FilingStatus.IN_PROGRESS)
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())[0]

    return {
      success: true,
      data: {
        pendingReturns,
        lastFiled: lastFiled
          ? {
              period: lastFiled.period,
              filingDate: lastFiled.filingDate,
            }
          : null,
        nextDue: nextDue
          ? {
              period: nextDue.period,
              dueDate: nextDue.dueDate,
            }
          : null,
      },
    }
  } catch (error) {
    console.error("Error calculating GST summary:", error)
    return { success: false, error: "Failed to calculate GST summary" }
  }
}

// Generate GST report
export async function generateGSTReport(gstFilingId: string) {
  try {
    const gstFiling = await prisma.gSTFiling.findUnique({
      where: {
        id: gstFilingId,
      },
      include: {
        invoices: true,
        user: true,
      },
    })

    if (!gstFiling) {
      return { success: false, error: "GST filing not found" }
    }

    // In a real application, you would generate a PDF or Excel report here
    // For this example, we'll just return the data

    return {
      success: true,
      data: {
        gstNumber: gstFiling.gstNumber,
        returnType: gstFiling.returnType,
        period: gstFiling.period,
        totalTaxLiability: gstFiling.totalTaxLiability,
        totalITC: gstFiling.totalITC,
        taxPayable: gstFiling.taxPayable,
        invoices: gstFiling.invoices,
      },
    }
  } catch (error) {
    console.error("Error generating GST report:", error)
    return { success: false, error: "Failed to generate GST report" }
  }
}

