import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate discount percentage from original price and sale price
 * @param originalPrice The original price of the product
 * @param salePrice The sale price of the product
 * @returns The discount percentage rounded to the nearest integer or 0 if no discount
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  salePrice: number | null | undefined
): number {
  // If there's no sale price or sale price is greater than or equal to original price
  if (!salePrice || salePrice >= originalPrice) {
    return 0
  }
  console.log("///////////////////////")
  console.log({originalPrice, salePrice});
  
  const discount = originalPrice - salePrice
  const percentage = (discount / originalPrice) * 100
  
  // Round to nearest integer
  return Math.round(percentage)
}

/**
 * Format price for display
 * @param price The price to format
 * @param decimals Number of decimal places to show
 * @returns Formatted price string
 */
export function formatPrice(price: number | null, decimals: number = 2): string {
  if (price === null) return '0.00'
  return price.toFixed(decimals)
}
