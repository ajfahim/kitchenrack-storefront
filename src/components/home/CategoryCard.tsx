"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  icon: string;
  href: string;
  isActive?: boolean;
  className?: string;
}

export function CategoryCard({
  name,
  icon,
  href,
  isActive = false,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn("flex flex-col items-center gap-3 group", className)}
    >
      <div
        className={cn(
          "size-24 rounded-full flex items-center justify-center p-5 transition-all duration-300",
          "bg-background hover:bg-primary/10",
          "border border-neutral/10 hover:border-primary",
          isActive && "border-primary bg-primary/10"
        )}
      >
        <Image
          src={icon}
          alt={name}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
      <span
        className={cn(
          "text-sm text-neutral transition-colors",
          "group-hover:text-primary",
          isActive && "text-primary font-medium"
        )}
      >
        {name}
      </span>
    </Link>
  );
}
