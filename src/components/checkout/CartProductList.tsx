"use client";
import { useCartStore } from "@/store/cart-store";
import CartItemCard from "@/components/common/CartItemCard";
import { useState } from "react";

export function CartProductList() {
  const { cartItems, updateQty, removeFromCart } = useCartStore();
  const [variantModalFor, setVariantModalFor] = useState<number | null>(null);

  return (
    <section>
      <h2 className="text-lg font-bold mb-2">Your Order</h2>
      {cartItems.length === 0 ? (
        <div className="text-muted-foreground">Your cart is empty.</div>
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
    </section>
  );
}
