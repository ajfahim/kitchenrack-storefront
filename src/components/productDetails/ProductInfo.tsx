"use client";

import { Badge } from "@/components/ui/badge"; // Badge component for showing discounts, etc.

import DeliveryInfo from "./DeliveryInfo";

import { calculateDiscountPercentage } from "@/lib/utils";
import { Product, ProductVariant } from "@/types/product";
import { useState } from "react";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  // Sort variants by price (lowest first)
  const sortedVariants =
    product.has_variants && product.variants.length > 0
      ? [...product.variants].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
      : [];

  // Pick default: lowest price variant, or null if no variants
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    sortedVariants.length > 0 ? sortedVariants[0] : null
  );

  // Helper: get display values
  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.display_price ?? product.price;

  const displaySalePrice = selectedVariant
    ? selectedVariant.sale_price
    : product.display_sale_price ?? product.sale_price;

  const discount = calculateDiscountPercentage(displayPrice, displaySalePrice);

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">{product.name}</h1>

      {/* Price Section */}
      <div className="flex items-center space-x-2">
        <span className="text-3xl font-bold text-accent">
          ৳ {displaySalePrice && displaySalePrice > 0 && displaySalePrice < displayPrice ? displaySalePrice : displayPrice}
        </span>
        {displaySalePrice && displaySalePrice > 0 && displaySalePrice < displayPrice && (
          <span className="text-muted text-xl line-through">
            ৳ {displayPrice}
          </span>
        )}
        {discount > 0 && (
          <Badge variant="secondary" className="text-lg">
            {discount}% OFF
          </Badge>
        )}
      </div>

      {/* Variant Selector */}
      {product.has_variants && sortedVariants.length > 0 && (
        <div className="space-y-2">
          <p className="text-lg font-medium">Select Variant:</p>
          <div className="flex gap-2">
            {sortedVariants.map((variant) => (
              <button
                key={variant.id}
                className={`px-4 py-2 border rounded-md ${
                  selectedVariant?.id === variant.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedVariant(variant)}
                type="button"
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Delivery Info */}
      <DeliveryInfo />

      {/* Description */}
      <p className="text-lg">{product.description}</p>
    </div>
  );
}
