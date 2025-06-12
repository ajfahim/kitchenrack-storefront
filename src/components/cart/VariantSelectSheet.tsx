"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { Product, ProductVariant } from "@/types/product";
import { ShoppingBag, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

interface VariantSelectSheetProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export default function VariantSelectSheet({
  product,
  open,
  onClose,
}: VariantSelectSheetProps) {
  const { addToCart } = useCartStore();
  const variants = [...product.variants].sort(
    (a, b) => (a.price ?? 0) - (b.price ?? 0)
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    variants[0]
  );
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      image: product.images[0]?.url || "",
      price:
        selectedVariant.sale_price &&
        selectedVariant.sale_price < selectedVariant.price
          ? selectedVariant.sale_price
          : selectedVariant.price,
      sale_price: selectedVariant.sale_price,
      product: product,
      variant: selectedVariant,
      qty,
      unit: product.unit,
      variantName: selectedVariant.name,
    });
    onClose();
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent side="right" className="w-[600px]">
        {/* Sheet Title and Close */}
        <SheetHeader>
          <SheetTitle>Select Variant</SheetTitle>
        </SheetHeader>
        {/* Main content: image + info row */}
        <div className="flex flex-col md:flex-row gap-3  pt-8 items-start">
          {/* Image */}
          <Image
            src={product.images[0]?.url || "/placeholder.png"}
            alt={product.name}
            width={48}
            height={48}
            className="p-1 rounded-lg object-contain border border-primary w-24 h-24"
          />
          {/* Info column */}
          <div className="flex flex-col flex-1 justify-start w-full">
            <span className="text-[#e54322] text-base font-semibold mb-1">
              {product.brand || ""}
            </span>
            <div className="text-xl font-bold mb-2 line-clamp-2">
              {product.name}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-accent">
                ৳
                {selectedVariant.sale_price &&
                selectedVariant.sale_price < selectedVariant.price
                  ? selectedVariant.sale_price
                  : selectedVariant.price}
              </span>
              {selectedVariant.sale_price &&
                selectedVariant.sale_price < selectedVariant.price && (
                  <span className="text-gray-400 line-through text-lg">
                    ৳{selectedVariant.price}
                  </span>
                )}
              {selectedVariant.sale_price &&
                selectedVariant.sale_price < selectedVariant.price && (
                  <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(
                      ((selectedVariant.price - selectedVariant.sale_price) /
                        selectedVariant.price) *
                        100
                    )}
                    % OFF
                  </span>
                )}
            </div>
          </div>
        </div>
        {/* Variant selector */}
        <div className="mt-2">
          <label className="block text-base font-medium mb-2">
            Select Variant:
          </label>
          <div className="flex gap-3 flex-wrap mb-8">
            {variants.map((variant) => (
              <Button
                variant="outline"
                key={variant.id}
                className={`px-8 py-3 border rounded-md font-semibold transition-all duration-200 focus:outline-none ${
                  selectedVariant.id === variant.id
                    ? "border-accent bg-white shadow"
                    : "border-gray-300 bg-white"
                }`}
                onClick={() => setSelectedVariant(variant)}
                type="button"
              >
                {variant.name}
              </Button>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-2 w-full">
          <Button className="py-6 flex-1" onClick={handleAdd}>
            <ShoppingBag className="mr-2" />
            Add to Cart
          </Button>
          <Button
            className="py-6 flex-1 bg-accent text-accent-foreground"
            onClick={() => {
              handleAdd(); /* TODO: trigger buy now logic */
            }}
          >
            <Zap className="mr-2" />
            Buy Now
          </Button>
        </div>
        <div className="mt-6 mb-4 px-8 text-center text-accent text-base font-semibold">
          <Link href={`/products/${product.slug}`}>
            Click to view product details
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
