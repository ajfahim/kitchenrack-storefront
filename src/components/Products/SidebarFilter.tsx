"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { CategoryTree } from "./CategoryTree";

// Fetch categories from backend
const fetchCategories = async () => {
  const res = await axiosInstance.get("/categories?parent_only=true");
  return res.data.data;
};

export default function SidebarFilter({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expandedCat, setExpandedCat] = useState<number | null>(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState("10000");
  const minAllowed = 0;
  const maxAllowed = 10000;

  // Fetch categories
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Category tree state
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [categoryCache, setCategoryCache] = useState<
    Record<number, Category[]>
  >({});

  // Hydrate cache with top-level categories
  React.useEffect(() => {
    if (categories && categories.length > 0 && !categoryCache[0]) {
      setCategoryCache((prev) => ({ ...prev, 0: categories }));
    }
  }, [categories]);

  const handleSelectCategory = (id: number | null) => {
    setSelectedCategory(id);
  };

  // Router for updating URL
  const { push, replace } = require('next/navigation').useRouter();
  const { usePathname, useSearchParams } = require('next/navigation');
  const pathname = usePathname ? usePathname() : '/products';
  const searchParams = useSearchParams ? useSearchParams() : undefined;

  // Handler for Apply button
  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    if (selectedCategory) {
      params.set('category_id', selectedCategory.toString());
    } else {
      params.delete('category_id');
    }
    if (priceRange[0] !== minAllowed) {
      params.set('min_price', priceRange[0].toString());
    } else {
      params.delete('min_price');
    }
    if (priceRange[1] !== maxAllowed) {
      params.set('max_price', priceRange[1].toString());
    } else {
      params.delete('max_price');
    }
    // Add more filters here if needed
    push(`${pathname}?${params.toString()}`);
    if (onClose) onClose();
  };

  // Handler for Clear button
  const handleClearFilter = () => {
    setSelectedCategory(null);
    setExpanded([]);
    setPriceRange([minAllowed, maxAllowed]);
    setMinInput(minAllowed.toString());
    setMaxInput(maxAllowed.toString());
    // Remove all filter params from URL
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    params.delete('category_id');
    params.delete('min_price');
    params.delete('max_price');
    // Add more as needed
    push(`${pathname}`);
    if (onClose) onClose();
  };


  // Keep inputs in sync with slider
  React.useEffect(() => {
    setMinInput(priceRange[0].toString());
    setMaxInput(priceRange[1].toString());
  }, [priceRange[0], priceRange[1]]);

  // Handlers for input fields
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInput(e.target.value);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInput(e.target.value);
  };
  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));
  const handleMinBlur = () => {
    let minVal = Number(minInput);
    if (isNaN(minVal)) minVal = minAllowed;
    minVal = clamp(minVal, minAllowed, priceRange[1]);
    setPriceRange([minVal, priceRange[1]]);
  };
  const handleMaxBlur = () => {
    let maxVal = Number(maxInput);
    if (isNaN(maxVal)) maxVal = maxAllowed;
    maxVal = clamp(maxVal, priceRange[0], maxAllowed);
    setPriceRange([priceRange[0], maxVal]);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <SheetContent side="left" className="max-w-xs w-full p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-lg font-bold">Filter</SheetTitle>
        </SheetHeader>
        <div
          className="p-4 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 56px)" }}
        >
          {/* Price Range Inputs */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min={minAllowed}
                max={priceRange[1]}
                value={minInput}
                onChange={handleMinChange}
                onBlur={handleMinBlur}
                className="w-20 text-sm"
                aria-label="Minimum price"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                min={priceRange[0]}
                max={maxAllowed}
                value={maxInput}
                onChange={handleMaxChange}
                onBlur={handleMaxBlur}
                className="w-20 text-sm"
                aria-label="Maximum price"
              />
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {`৳${priceRange[0]} - ৳${priceRange[1]}`}
            </div>
          </div>
          {/* Category Tree */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Select Category</h3>
            <CategoryTree
              parentId={null}
              selectedId={selectedCategory}
              onSelect={handleSelectCategory}
              cache={categoryCache}
              setCache={setCategoryCache}
              expanded={expanded}
              setExpanded={setExpanded}
            />
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleClearFilter}
              >
                Clear
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={handleApplyFilter}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
