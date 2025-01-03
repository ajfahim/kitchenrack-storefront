"use client";

import Image from "next/image";
import Link from "next/link";

interface HomePageSectionProps {
  title: string;
  showExploreAll?: boolean;
  link?: string;
  children: React.ReactNode;
}

export function HomePageSection({
  title,
  showExploreAll = false,
  link = "#",
  children,
}: HomePageSectionProps) {
  return (
    <section>
      {/* Title with decorative elements */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-semibold text-center">{title}</h2>
        <div className="flex items-center">
          <div className="h-[1px] w-16 bg-neutral/30"></div>
          <Image src="/star.png" alt="Star" width={24} height={24} />
          <div className="h-[1px] w-16 bg-neutral/30"></div>
        </div>
      </div>

      {/* Content */}
      {children}

      {/* Explore All Button */}
      {showExploreAll && (
        <div className="flex justify-center mt-8">
          <Link
            href={link}
            className="text-sm text-neutral hover:text-primary transition-colors underline"
          >
            Explore All
          </Link>
        </div>
      )}
    </section>
  );
}
