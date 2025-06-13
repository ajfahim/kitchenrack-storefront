// Checkout Page (shadcn/ui + react-hook-form + zod)
import React from "react";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PaymentOptions } from "@/components/checkout/PaymentOptions";
import { DeliveryMethod } from "@/components/checkout/DeliveryMethod";
import { CartProductList } from "@/components/checkout/CartProductList";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  // Cart, price, and state would be provided by a store or props in a real app
  // Here, just show layout and single-responsibility composition
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto py-8">
      {/* Column 1: Summary + Form + Actions */}
      <div className="flex flex-col gap-6 max-w-lg w-full">
        <OrderSummary />
        <CheckoutForm />
        <PaymentOptions />
        <DeliveryMethod />
        <Button className="w-full text-xl font-bold py-5">Confirm Order</Button>
      </div>
      {/* Column 2: Cart Products */}
      <div className="bg-muted rounded-lg p-4 shadow w-full max-w-xl">
        <CartProductList />
      </div>
    </div>
  );
}
