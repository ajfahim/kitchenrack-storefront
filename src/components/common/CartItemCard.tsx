"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, Trash } from "lucide-react";
import Image from "next/image";
import CartSheetVariantModal from "../cart/CartSheetVariantModal";

export default function CartItemCard({
  item,
  removeFromCart,
  updateQty,
  setVariantModalFor,
  variantModalFor,
}: {
  item: any;
  removeFromCart: (productId: number, variantId?: number | null) => void;
  updateQty: (productId: number, variantId: number | null, qty: number) => void;
  setVariantModalFor: (productId: number) => void;
  variantModalFor: number | null;
}) {
  return (
    <Card
      key={item.productId + "-" + (item.variantId || "noVar")}
      className="mb-4 border border-gray-200 rounded-xl shadow-sm"
    >
      <CardContent className="pb-2 px-3">
        <div className="relative flex gap-4 items-stretch py-3">
          {/* Trash Icon Top Right */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Remove from cart"
            onClick={() =>
              removeFromCart(item.productId, item.variantId || null)
            }
            className="absolute top-1 -right-1 text-accent"
            tabIndex={0}
          >
            <Trash className="w-5 h-5" />
          </Button>
          {/* Product Image */}
          <div className="flex-shrink-0 flex flex-col items-center justify-between">
            <Image
              src={item.image}
              alt={item.name}
              width={70}
              height={70}
              className="rounded-lg object-cover border border-gray-100 w-[70px] h-[70px]"
            />
          </div>
          {/* Main Content */}
          <div className="flex flex-col flex-1 justify-between">
            {/* Badges */}
            <div className="flex gap-2 items-center mb-1">
              {item.discount && (
                <Badge
                  variant="destructive"
                  className="px-2 py-0.5 text-[11px] font-bold"
                >
                  {item.discount}% OFF
                </Badge>
              )}
            </div>
            {/* Name and Code Row */}
            <div className="flex justify-between items-center mb-1">
              <div className="font-semibold text-base line-clamp-1">
                {item.name}
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-accent">
                ৳
                {item.variant &&
                item.variant.sale_price &&
                item.variant.sale_price < item.variant.price
                  ? item.variant.sale_price
                  : item.variant && item.variant.price
                  ? item.variant.price
                  : item.price}
              </span>
              {item.variant &&
                item.variant.sale_price &&
                item.variant.sale_price < item.variant.price && (
                  <span className="text-gray-400 line-through text-lg">
                    ৳{item.variant.price}
                  </span>
                )}
              {item.variant &&
                item.variant.sale_price &&
                item.variant.sale_price < item.variant.price && (
                  <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(
                      ((item.variant.price - item.variant.sale_price) /
                        item.variant.price) *
                        100
                    )}
                    % OFF
                  </span>
                )}
            </div>
          </div>
        </div>
        {/* Quantity Row and Selected Variant Button */}
        <div className="flex justify-between items-center gap-2 mt-1">
          {/* Selected Variant Button */}
          <div className="mb-2">
            {item.product.has_variants && item.product.variants.length > 0 ? (
              <Badge
                variant="outline"
                className="cursor-pointer text-base"
                onClick={() => setVariantModalFor(item.productId)}
                aria-label="Change variant"
              >
                {item.variantName || item.variant?.name}{" "}
                <ChevronDown size={16} />
              </Badge>
            ) : (
              <div className="text-xs text-gray-400 font-semibold ml-2 whitespace-nowrap">
                {/* {item.code} */}
              </div>
            )}
            {/* Variant Modal */}
            {variantModalFor === item.productId && (
              <CartSheetVariantModal
                product={item.product}
                open={true}
                onClose={() => setVariantModalFor(null)}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              disabled={item.qty === 1}
              variant="outline"
              size="icon"
              aria-label="Decrease quantity"
              onClick={() =>
                updateQty(
                  item.productId,
                  item.variantId || null,
                  Math.max(1, item.qty - 1)
                )
              }
              className={cn("border-accent w-8 h-8", {
                "border-gray-500": item.qty === 1,
              })}
            >
              -
            </Button>
            <span className="min-w-[2ch] text-center font-medium text-base">
              {item.qty}
            </span>
            <Button
              variant="outline"
              size="icon"
              aria-label="Increase quantity"
              onClick={() =>
                updateQty(item.productId, item.variantId || null, item.qty + 1)
              }
              className="border-accent w-8 h-8"
            >
              +
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
