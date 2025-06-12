import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product, ProductVariant } from "@/types/product";

export interface CartItem {
  productId: number;
  variantId?: number | null;
  name: string;
  image: string;
  price: number;
  sale_price?: number;
  qty: number;
  unit?: string;
  variantName?: string;
  product: Product;
  variant: ProductVariant;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number, variantId?: number | null) => void;
  updateQty: (productId: number, variantId: number | null, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,

      addToCart: (item) => {
        const { cartItems } = get();
        // Check if already in cart
        const idx = cartItems.findIndex(
          (ci) =>
            ci.productId === item.productId && ci.variantId === item.variantId
        );
        let newCart;
        if (idx > -1) {
          // Already in cart: update qty
          newCart = [...cartItems];
          newCart[idx].qty += item.qty;
        } else {
          newCart = [...cartItems, item];
        }
        set({
          cartItems: newCart,
          totalPrice: newCart.reduce((sum, i) => sum + i.price * i.qty, 0),
        });
        toast.success("Added to cart");
      },

      removeFromCart: (productId, variantId) => {
        const newCart = get().cartItems.filter(
          (ci) =>
            ci.productId !== productId ||
            (variantId !== undefined && ci.variantId !== variantId)
        );
        set({
          cartItems: newCart,
          totalPrice: newCart.reduce((sum, i) => sum + i.price * i.qty, 0),
        });
        toast.success("Removed from cart");
      },

      updateQty: (productId, variantId, qty) => {
        const newCart = get().cartItems.map((ci) => {
          if (ci.productId === productId && ci.variantId === variantId) {
            return { ...ci, qty };
          }
          return ci;
        });
        set({
          cartItems: newCart,
          totalPrice: newCart.reduce((sum, i) => sum + i.price * i.qty, 0),
        });
      },

      clearCart: () => set({ cartItems: [], totalPrice: 0 }),
    }),
    {
      name: "cart-storage", // name of item in storage
      partialize: (state) => ({
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);
