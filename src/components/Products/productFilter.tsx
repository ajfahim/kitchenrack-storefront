"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { useState } from "react";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Toys",
  "Sports",
  "Beauty",
];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
];

export function ProductFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sort, setSort] = useState("relevance");

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (newValues: number[]) => {
    setPriceRange(newValues);
  };

  return (
    <div className="w-full mx-auto p-4 space-y-6 shadow-md rounded-lg">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold">Filters</h2>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={
              selectedCategories.includes(category) ? "default" : "outline"
            }
            onClick={() => handleCategoryToggle(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="text-lg font-semibold">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between items-center">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              handlePriceChange([
                Number.parseInt(e.target.value),
                priceRange[1],
              ])
            }
            className="w-20"
          />
          <span>to</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              handlePriceChange([
                priceRange[0],
                Number.parseInt(e.target.value),
              ])
            }
            className="w-20"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="text-sm py-1 px-2"
          >
            {category}
            <Button
              variant="ghost"
              size="sm"
              className="ml-1 h-auto p-0"
              onClick={() => handleCategoryToggle(category)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </Badge>
        ))}
        {selectedCategories.length > 0 && (
          <Button
            variant="link"
            onClick={() => setSelectedCategories([])}
            className="text-sm"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
