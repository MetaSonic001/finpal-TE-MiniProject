import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import type { FilingStatus } from "@/types/supabase"

// GET a specific GST filing
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const { data, error } = await supabase.from("gst_filings").select("*, gst_invoices(*)").eq("id", id).single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error fetching GST filing:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch GST filing" }, { status: 500 })
  }
}

// PATCH update a GST filing status
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {
      status: status as FilingStatus,
      updated_at: new Date().toISOString(),
    }

    // If status is FILED, set the filing date
    if (status === "FILED") {
      updateData.filing_date = new Date().toISOString()
    }

    const { data, error } = await supabase.from("gst_filings").update(updateData).eq("id", id).select()

    if (error) throw error

    return NextResponse.json({ success: true, data: data[0] })
  } catch (error) {
    console.error("Error updating GST filing status:", error)
    return NextResponse.json({ success: false, error: "Failed to update GST filing status" }, { status: 500 })
  }
}

// DELETE a GST filing
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const { error } = await supabase.from("gst_filings").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting GST filing:", error)
    return NextResponse.json({ success: false, error: "Failed to delete GST filing" }, { status: 500 })
  }
}

