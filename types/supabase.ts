export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type FilingStatus = "NOT_STARTED" | "IN_PROGRESS" | "FILED" | "PROCESSED" | "REJECTED"
export type ConsultationStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED"

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          pan_number: string | null
          gst_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          pan_number?: string | null
          gst_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          pan_number?: string | null
          gst_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      gst_filings: {
        Row: {
          id: string
          user_id: string
          gst_number: string
          return_type: string
          period: string
          due_date: string
          filing_date: string | null
          status: FilingStatus
          total_tax_liability: number | null
          total_itc: number | null
          tax_payable: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          gst_number: string
          return_type: string
          period: string
          due_date: string
          filing_date?: string | null
          status?: FilingStatus
          total_tax_liability?: number | null
          total_itc?: number | null
          tax_payable?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          gst_number?: string
          return_type?: string
          period?: string
          due_date?: string
          filing_date?: string | null
          status?: FilingStatus
          total_tax_liability?: number | null
          total_itc?: number | null
          tax_payable?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      gst_invoices: {
        Row: {
          id: string
          gst_filing_id: string
          invoice_number: string
          invoice_date: string
          customer_name: string
          customer_gst: string | null
          total_amount: number
          cgst: number
          sgst: number
          igst: number
          total_tax: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          gst_filing_id: string
          invoice_number: string
          invoice_date: string
          customer_name: string
          customer_gst?: string | null
          total_amount: number
          cgst: number
          sgst: number
          igst: number
          total_tax: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          gst_filing_id?: string
          invoice_number?: string
          invoice_date?: string
          customer_name?: string
          customer_gst?: string | null
          total_amount?: number
          cgst?: number
          sgst?: number
          igst?: number
          total_tax?: number
          created_at?: string
          updated_at?: string
        }
      }
      income_tax_filings: {
        Row: {
          id: string
          user_id: string
          assessment_year: string
          financial_year: string
          due_date: string
          filing_date: string | null
          status: FilingStatus
          refund_amount: number | null
          tax_paid: number | null
          tax_payable: number | null
          optimized_tax: number | null
          potential_savings: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          assessment_year: string
          financial_year: string
          due_date: string
          filing_date?: string | null
          status?: FilingStatus
          refund_amount?: number | null
          tax_paid?: number | null
          tax_payable?: number | null
          optimized_tax?: number | null
          potential_savings?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          assessment_year?: string
          financial_year?: string
          due_date?: string
          filing_date?: string | null
          status?: FilingStatus
          refund_amount?: number | null
          tax_paid?: number | null
          tax_payable?: number | null
          optimized_tax?: number | null
          potential_savings?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

