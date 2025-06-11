"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useQuery } from '@tanstack/react-query';
import { axiosInstance, baseURL } from '@/lib/axios';

// Fetch categories from backend
const fetchCategories = async () => {
  const res = await axiosInstance.get('/categories/tree');
  return res.data.data;
};

export default function SidebarFilter({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expandedCat, setExpandedCat] = useState<number | null>(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minInput, setMinInput] = useState('0');
  const [maxInput, setMaxInput] = useState('10000');
  const minAllowed = 0;
  const maxAllowed = 10000;

  // Fetch categories
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

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
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
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
    <Sheet open={open} onOpenChange={val => { if (!val) onClose(); }}>
      <SheetContent side="left" className="max-w-xs w-full p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-lg font-bold">Filter</SheetTitle>
        </SheetHeader>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 56px)' }}>
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
          <div>
            <h3 className="font-semibold mb-2">Select Category</h3>
            {isLoading && <div className="text-sm text-muted-foreground">Loading categories...</div>}
            {isError && <div className="text-sm text-destructive">Failed to load categories.</div>}
            {!isLoading && !isError && categories && (
              <ul className="space-y-1">
                {categories.map((cat: any) => (
                  <li key={cat.id}>
                    <Button
                      variant="ghost"
                      className="flex items-center w-full text-left font-medium justify-between"
                      onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                    >
                      <span>{cat.name}</span>
                      <span>{expandedCat === cat.id ? "▼" : "►"}</span>
                    </Button>
                    {expandedCat === cat.id && cat.children && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {cat.children.map((child: any) => (
                          <li key={child.id} className="hover:underline cursor-pointer text-muted-foreground text-sm">
                            {child.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
