export interface GSTCalculationInput {
    amount: number
    gstRate?: number
    isIntraState?: boolean
  }
  
  export interface GSTCalculationResult {
    baseAmount: number
    cgst: number
    sgst: number
    igst: number
    totalTax: number
    totalAmount: number
  }
  
  /**
   * Calculate GST components based on the total amount (inclusive of tax)
   * @param input Object containing amount and optional parameters
   * @returns Object with calculated GST components
   */
  export function calculateGSTFromTotal(input: GSTCalculationInput): GSTCalculationResult {
    const { amount, gstRate = 18, isIntraState = true } = input
  
    // Calculate base amount (amount excluding GST)
    const baseAmount = (amount * 100) / (100 + gstRate)
  
    // Calculate total tax
    const totalTax = amount - baseAmount
  
    // Calculate CGST, SGST, and IGST based on whether it's intra-state or inter-state
    let cgst = 0
    let sgst = 0
    let igst = 0
  
    if (isIntraState) {
      // For intra-state transactions, split the tax into CGST and SGST
      cgst = totalTax / 2
      sgst = totalTax / 2
    } else {
      // For inter-state transactions, all tax is IGST
      igst = totalTax
    }
  
    return {
      baseAmount,
      cgst,
      sgst,
      igst,
      totalTax,
      totalAmount: amount,
    }
  }
  
  /**
   * Calculate GST components based on the base amount (exclusive of tax)
   * @param input Object containing amount (base amount) and optional parameters
   * @returns Object with calculated GST components
   */
  export function calculateGSTFromBase(input: GSTCalculationInput): GSTCalculationResult {
    const { amount, gstRate = 18, isIntraState = true } = input
  
    // Calculate total tax
    const totalTax = amount * (gstRate / 100)
  
    // Calculate total amount (including GST)
    const totalAmount = amount + totalTax
  
    // Calculate CGST, SGST, and IGST based on whether it's intra-state or inter-state
    let cgst = 0
    let sgst = 0
    let igst = 0
  
    if (isIntraState) {
      // For intra-state transactions, split the tax into CGST and SGST
      cgst = totalTax / 2
      sgst = totalTax / 2
    } else {
      // For inter-state transactions, all tax is IGST
      igst = totalTax
    }
  
    return {
      baseAmount: amount,
      cgst,
      sgst,
      igst,
      totalTax,
      totalAmount,
    }
  }
  
  /**
   * Generate a unique invoice number
   * @param prefix Optional prefix for the invoice number
   * @returns A unique invoice number
   */
  export function generateInvoiceNumber(prefix = "INV"): string {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
  
    return `${prefix}-${year}${month}${day}-${random}`
  }
  
  