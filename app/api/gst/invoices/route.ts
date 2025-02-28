import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// GET all invoices for a GST filing
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const gstFilingId = searchParams.get("gstFilingId")

  if (!gstFilingId) {
    return NextResponse.json({ error: "GST Filing ID is required" }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from("gst_invoices")
      .select("*")
      .eq("gst_filing_id", gstFilingId)
      .order("invoice_date", { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error fetching invoices:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch invoices" }, { status: 500 })
  }
}

// POST create a new invoice
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { gstFilingId, invoiceNumber, invoiceDate, customerName, customerGST, totalAmount, cgst, sgst, igst } = body

    if (!gstFilingId || !invoiceNumber || !invoiceDate || !customerName || totalAmount === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const totalTax = Number(cgst) + Number(sgst) + Number(igst)

    // Insert the invoice
    const { data: invoiceData, error: invoiceError } = await supabase
      .from("gst_invoices")
      .insert({
        gst_filing_id: gstFilingId,
        invoice_number: invoiceNumber,
        invoice_date: invoiceDate,
        customer_name: customerName,
        customer_gst: customerGST,
        total_amount: totalAmount,
        cgst: cgst,
        sgst: sgst,
        igst: igst,
        total_tax: totalTax,
      })
      .select()

    if (invoiceError) throw invoiceError

    // Update the GST filing with new tax calculations
    const { data: filingData, error: filingError } = await supabase
      .from("gst_filings")
      .select("total_tax_liability, total_itc, tax_payable")
      .eq("id", gstFilingId)
      .single()

    if (filingError) throw filingError

    const updatedTaxLiability = (filingData.total_tax_liability || 0) + totalTax
    const updatedTaxPayable = (filingData.tax_payable || 0) + totalTax

    const { error: updateError } = await supabase
      .from("gst_filings")
      .update({
        total_tax_liability: updatedTaxLiability,
        tax_payable: updatedTaxPayable,
        updated_at: new Date().toISOString(),
      })
      .eq("id", gstFilingId)

    if (updateError) throw updateError

    return NextResponse.json({ success: true, data: invoiceData[0] })
  } catch (error) {
    console.error("Error adding invoice:", error)
    return NextResponse.json({ success: false, error: "Failed to add invoice" }, { status: 500 })
  }
}

