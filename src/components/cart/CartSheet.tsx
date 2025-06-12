"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/cart-store";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CartSheetVariantModal from "./CartSheetVariantModal";

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSheet({ open, onClose }: CartSheetProps) {
  const { cartItems, totalPrice, updateQty, removeFromCart, clearCart } =
    useCartStore();
  const [variantModalFor, setVariantModalFor] = useState<number | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Cart List ({cartItems.length} Item
            {cartItems.length !== 1 ? "s" : ""})
          </h2>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <Card
                key={item.productId + "-" + (item.variantId || "noVar")}
                className="mb-4 border border-gray-200 rounded-xl shadow-sm"
              >
                <CardContent className="relative flex gap-4 items-stretch py-3 px-4">
                  {/* Trash Icon Top Right */}
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remove from cart"
                    onClick={() =>
                      removeFromCart(item.productId, item.variantId || null)
                    }
                    className="absolute top-1 right-1 text-accent"
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
                    {/* Variant Dropdown (if options available) */}
                    {item.variantOptions && item.variantOptions.length > 0 && (
                      <Select
                        value={item.variantId}
                        onValueChange={(value) =>
                          updateQty(item.productId, value, item.qty)
                        }
                      >
                        <SelectTrigger className="mt-2 w-[110px] h-8 text-xs rounded border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.variantOptions.map((v: any) => (
                            <SelectItem
                              key={v.id}
                              value={v.id}
                              className="text-xs"
                            >
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  {/* Main Content */}
                  <div className="flex flex-col flex-1 justify-between">
                    {/* Badges */}
                    <div className="flex gap-2 items-center mb-1">
                      {item.isExclusive && (
                        <Badge className="bg-[#ff9800] text-white px-2 py-0.5 text-[11px] font-bold">
                          এক্সক্লুসিভ
                        </Badge>
                      )}
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
                      <div className="text-xs text-gray-400 font-semibold ml-2 whitespace-nowrap">
                        {item.code}
                      </div>
                    </div>
                    {/* Selected Variant Button */}
                    <div className="mb-2">
                      <button
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-[13px] font-medium bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition cursor-pointer"
                        style={{ minWidth: 110 }}
                        onClick={() => setVariantModalFor(item.productId)}
                        aria-label="Change variant"
                      >
                        {item.variantName || item.variant?.name}
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {/* Variant Modal */}
                      {variantModalFor === item.productId && (
                        <CartSheetVariantModal
                          product={item.product}
                          open={true}
                          onClose={() => setVariantModalFor(null)}
                        />
                      )}
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
                    {/* Quantity Row */}
                    <div className="flex justify-end items-center gap-2 mt-2">
                      <Button
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
                        className="border-gray-300 w-8 h-8"
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
                          updateQty(
                            item.productId,
                            item.variantId || null,
                            item.qty + 1
                          )
                        }
                        className="border-gray-300 w-8 h-8"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>৳ {totalPrice}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Clear Cart
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
