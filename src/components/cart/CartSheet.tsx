"use client";
import CartItemCard from "@/components/common/CartItemCard";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSheet({ open, onClose }: CartSheetProps) {
  const { cartItems, totalPrice, updateQty, removeFromCart, clearCart } =
    useCartStore();
  const [variantModalFor, setVariantModalFor] = useState<number | null>(null);

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent side="right" className="p-3 flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            Cart List ({cartItems.length} Item
            {cartItems.length !== 1 ? "s" : ""})
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto mt-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <CartItemCard
                key={item.productId + "-" + (item.variantId || "noVar")}
                item={item}
                removeFromCart={removeFromCart}
                updateQty={updateQty}
                setVariantModalFor={setVariantModalFor}
                variantModalFor={variantModalFor}
              />
            ))
          )}
        </div>
        <SheetFooter className="!flex !flex-col">
          <div>
            <div className="font-bold text-lg">
              <span>Total:</span>
              <span>৳ {totalPrice}</span>
            </div>
            <div className="flex justify-between gap-2 mt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="gap-2 py-5 font-bold text-xl border-accent text-accent hover:bg-accent hover:text-white group/btn"
                aria-label="Clear Cart"
              >
                <Trash2 className="w-4 h-4 text-accent group-hover/btn:text-white" />
                Clear Cart
              </Button>
              <Button
                asChild
                className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground rounded py-5 px-3 flex items-center justify-center gap-1 transition-all duration-300 group/btn text-xl font-bold"
              >
                <Link href="/checkout">
                  Buy Now
                  <ArrowRight
                    size={18}
                    className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
