"use client";

import Link from "next/link";
import SectionTitle from "../common/SectionTitle";

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
      <SectionTitle title={title} />

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
