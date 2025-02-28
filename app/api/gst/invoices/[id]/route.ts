import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// GET a specific invoice
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const { data, error } = await supabase.from("gst_invoices").select("*").eq("id", id).single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error fetching invoice:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch invoice" }, { status: 500 })
  }
}

// DELETE an invoice
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // First, get the invoice details to update the GST filing
    const { data: invoiceData, error: fetchError } = await supabase
      .from("gst_invoices")
      .select("gst_filing_id, total_tax")
      .eq("id", id)
      .single()

    if (fetchError) throw fetchError

    // Delete the invoice
    const { error: deleteError } = await supabase.from("gst_invoices").delete().eq("id", id)

    if (deleteError) throw deleteError

    // Update the GST filing with new tax calculations
    const { data: filingData, error: filingError } = await supabase
      .from("gst_filings")
      .select("total_tax_liability, total_itc, tax_payable")
      .eq("id", invoiceData.gst_filing_id)
      .single()

    if (filingError) throw filingError

    const updatedTaxLiability = (filingData.total_tax_liability || 0) - invoiceData.total_tax
    const updatedTaxPayable = (filingData.tax_payable || 0) - invoiceData.total_tax

    const { error: updateError } = await supabase
      .from("gst_filings")
      .update({
        total_tax_liability: updatedTaxLiability,
        tax_payable: updatedTaxPayable,
        updated_at: new Date().toISOString(),
      })
      .eq("id", invoiceData.gst_filing_id)

    if (updateError) throw updateError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting invoice:", error)
    return NextResponse.json({ success: false, error: "Failed to delete invoice" }, { status: 500 })
  }
}

