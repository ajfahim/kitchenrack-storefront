"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();
  console.log("🚀 ~ BreadCrumb ~ pathname:", pathname);
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
              className="font-bold text-gray-500 hover:text-accent text-lg"
            >
              Products
            </Link>
          </li>
          <li>
            <ChevronRight className="text-gray-500" />
          </li>
          <li>
            <span className="text-accent font-bold text-lg" aria-current="page">
              {pathname.split("/").pop()}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
