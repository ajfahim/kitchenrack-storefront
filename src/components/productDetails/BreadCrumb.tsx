"use client";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();
  return (
    <div className="py-10">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              href="/"
              className="font-bold text-gray-500 hover:text-accent text-lg"
            >
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="text-gray-500" />
          </li>
          <li>
            <Link
              href="/products"
              className={cn(
                "font-bold text-gray-500 hover:text-accent text-lg",
                pathname === "/products" && "text-accent"
              )}
            >
              Products
            </Link>
          </li>
          {pathname !== "/products" && (
            <>
              <li>
                <ChevronRight className="text-gray-500" />
              </li>
              <li>
                <span
                  className="text-accent font-bold text-lg"
                  aria-current="page"
                >
                  {pathname.split("/").pop()}
                </span>
              </li>
            </>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
