"use client";
import CartItemCard from "@/components/common/CartItemCard";
import { useCartStore } from "@/store/cart-store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";

export function CartProductList() {
  const { cartItems, updateQty, removeFromCart } = useCartStore();
  const [variantModalFor, setVariantModalFor] = useState<number | null>(null);

  return (
    <section className="bg-muted/5 rounded-lg p-4 shadow w-full max-w-xl">
      <h2 className="text-lg font-bold mb-2">Cart Products</h2>
      {cartItems.length === 0 ? (
        <div className="text-muted-foreground">Your cart is empty.</div>
      ) : (
        <ScrollArea className="h-[20rem]">
          {cartItems.map((item) => (
            <CartItemCard
              key={item.productId + "-" + (item.variantId || "noVar")}
              item={item}
              removeFromCart={removeFromCart}
              updateQty={updateQty}
              setVariantModalFor={setVariantModalFor}
              variantModalFor={variantModalFor}
            />
          ))}
        </ScrollArea>
      )}
    </section>
  );
}
