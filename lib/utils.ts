import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string | null | undefined) {
  if (amount === null || amount === undefined) return "₹0.00"

  const numAmount = typeof amount === "string" ? Number.parseFloat(amount.replace(/[^\d.-]/g, "")) : amount

  if (isNaN(numAmount)) return "₹0.00"

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(numAmount)
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return ""

  const dateObj = typeof date === "string" ? new Date(date) : date

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(dateObj)
}

