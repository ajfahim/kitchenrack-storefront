"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import Link from "next/link";
import * as React from "react";

interface CategoryTreeProps {
  parentId?: number | null;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  cache: Record<number, Category[]>;
  setCache: React.Dispatch<React.SetStateAction<Record<number, Category[]>>>;
  expanded: number[];
  setExpanded: React.Dispatch<React.SetStateAction<number[]>>;
}

export function CategoryTree({
  parentId = null,
  selectedId,
  onSelect,
  cache,
  setCache,
  expanded,
  setExpanded,
}: CategoryTreeProps) {
  const [loadingId, setLoadingId] = React.useState<number | null>(null);
  // Top-level: parentId null or undefined means root (cache[0])
  const categories = parentId == null ? cache[0] : cache[parentId] || [];

  // Checks if a category has children (API: .child)
  const hasChildren = (cat: Category) =>
    Array.isArray(cat.child) ? cat.child.length > 0 : false;

  // Expand/collapse logic with lazy loading
  const handleExpand = async (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
    if (!cache[id]) {
      setLoadingId(id);
      try {
        const res = await axiosInstance.get(`/categories?parent_id=${id}`);
        // API response: .data is Category[]
        setCache((prev) => ({ ...prev, [id]: res.data.data }));
      } finally {
        setLoadingId(null);
      }
    }
  };

  return (
    <Accordion type="multiple" className="w-full">
      {categories && categories.length > 0 ? (
        categories.map((cat) => (
          <AccordionItem
            key={cat.id}
            value={cat.id.toString()}
            className="border-none px-0"
          >
            <div className="flex items-center">
              <Link
                href={`/products?category=${cat.slug}`}
                scroll={false}
                className={cn(
                  "flex-1 cursor-pointer select-none justify-start text-left font-normal rounded-none text-base md:text-lg outline-none transition-colors",
                  selectedId === cat.id
                    ? "text-accent font-semibold"
                    : "text-muted-foreground hover:text-accent",
                  "focus-visible:text-accent"
                )}
                onClick={(e) => {
                  // Don't trigger accordion expand
                  e.stopPropagation();
                  onSelect(cat.id);
                }}
                tabIndex={0}
              >
                {cat.name}
              </Link>
              {cat.child && (
                <AccordionTrigger
                  className="ml-2 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpand(cat.id);
                  }}
                  aria-label={expanded.includes(cat.id) ? "Collapse" : "Expand"}
                />
              )}
            </div>
            <AccordionContent forceMount={expanded.includes(cat.id)}>
              {loadingId === cat.id && !cache[cat.id] ? (
                <div className="pl-4">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ) : (
                cache[cat.id] &&
                expanded.includes(cat.id) && (
                  <div className="ml-4 border-l border-muted-foreground/10 pl-2">
                    <CategoryTree
                      parentId={cat.id}
                      selectedId={selectedId}
                      onSelect={onSelect}
                      cache={cache}
                      setCache={setCache}
                      expanded={expanded}
                      setExpanded={setExpanded}
                    />
                  </div>
                )
              )}
            </AccordionContent>
          </AccordionItem>
        ))
      ) : parentId == null ? (
        <Skeleton className="h-6 w-32 mb-2" />
      ) : null}
    </Accordion>
  );
}
