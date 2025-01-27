"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";

interface PriceRangePopoverProps {
  priceFrom: string;
  priceTo: string;
  onPriceChange: (from: string, to: string) => void;
  onReset: () => void;
}

export function PriceRangePopover({
  priceFrom,
  priceTo,
  onPriceChange,
  onReset,
}: PriceRangePopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [localFrom, setLocalFrom] = React.useState(priceFrom);
  const [localTo, setLocalTo] = React.useState(priceTo);

  const handleApply = () => {
    onPriceChange(localFrom, localTo);
    setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setLocalFrom("5");
    setLocalTo("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[140px]">
          Price Range
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Price Range</h4>
            <p className="text-sm text-muted-foreground">
              Set the price range for filtering products
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="from" className="text-sm font-medium">
                From
              </label>
              <div className="col-span-2 relative">
                <Input
                  id="from"
                  type="text"
                  value={localFrom}
                  onChange={(e) => setLocalFrom(e.target.value)}
                  className="pl-6"
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="to" className="text-sm font-medium">
                To
              </label>
              <div className="col-span-2 relative">
                <Input
                  id="to"
                  type="text"
                  value={localTo}
                  onChange={(e) => setLocalTo(e.target.value)}
                  className="pl-6"
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
