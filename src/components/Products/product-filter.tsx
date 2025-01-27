"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { PriceRangePopover } from "./price-range-popover";

export function ProductFilter() {
  const [priceFrom, setPriceFrom] = React.useState("5");
  const [priceTo, setPriceTo] = React.useState("");

  const handlePriceChange = (from: string, to: string) => {
    setPriceFrom(from);
    setPriceTo(to);
  };

  const handleReset = () => {
    setPriceFrom("5");
    setPriceTo("");
  };

  return (
    <div className="w-full mx-auto">
      <div className="rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col items-center lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* availability */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter:</span>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <PriceRangePopover
              priceFrom={priceFrom}
              priceTo={priceTo}
              onPriceChange={handlePriceChange}
              onReset={handleReset}
            />
          </div>

          {/* product count  */}
          <div className="order-first lg:order-none text-center">
            <span className="text-sm font-medium whitespace-nowrap">
              20 Products Showing
            </span>
          </div>

          {/* sort by  */}
          <div className="flex items-center gap-2 justify-end">
            <span className="text-sm font-medium">Sort by:</span>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="new">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
