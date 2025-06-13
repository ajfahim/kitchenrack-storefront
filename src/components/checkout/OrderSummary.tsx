import React from "react";

export function OrderSummary() {
  // Replace with actual props/state as needed
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-2">Order Summary</h2>
      <div className="flex justify-between">
        <span>Total</span>
        <span>৳504</span>
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span>Discount Amount</span>
        <span>-৳0</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery Charge</span>
        <span>৳120</span>
      </div>
      <div className="flex justify-between font-bold mt-2 border-t pt-2">
        <span>Grand Total</span>
        <span>৳624</span>
      </div>
    </section>
  );
}
