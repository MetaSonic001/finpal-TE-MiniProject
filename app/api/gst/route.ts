import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import type { FilingStatus } from "@/types/supabase"

// GET all GST filings for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from("gst_filings")
      .select("*, gst_invoices(*)")
      .eq("user_id", userId)
      .order("due_date", { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error fetching GST filings:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch GST filings" }, { status: 500 })
  }
}

// POST create a new GST filing
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, gstNumber, returnType, period, dueDate } = body

    if (!userId || !gstNumber || !returnType || !period || !dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("gst_filings")
      .insert({
        user_id: userId,
        gst_number: gstNumber,
        return_type: returnType,
        period: period,
        due_date: dueDate,
        status: "NOT_STARTED" as FilingStatus,
      })
      .select()

    if (error) throw error

    return NextResponse.json({ success: true, data: data[0] })
  } catch (error) {
    console.error("Error creating GST filing:", error)
    return NextResponse.json({ success: false, error: "Failed to create GST filing" }, { status: 500 })
  }
}

