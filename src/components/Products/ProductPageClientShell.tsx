"use client";
import ProductCard from "@/components/common/ProductCard";
import BreadCrumb from "@/components/productDetails/BreadCrumb";
import { Product } from "@/types";
import { useState } from "react";
import SidebarFilter from "./SidebarFilter";

export default function ProductPageClientShell({
  products,
}: {
  products: Product[];
}) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div>
      <BreadCrumb />
      <SidebarFilter open={openSidebar} onClose={() => setOpenSidebar(false)} />
      <div className="flex items-center gap-2 my-4">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded shadow hover:bg-primary-hover transition"
          onClick={() => setOpenSidebar(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm3 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm3 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z"
            />
          </svg>
          <span className="font-semibold">Filter</span>
        </button>
        <span className="ml-2 text-sm text-gray-600">
          {products.length} Items
        </span>
      </div>
      <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.images[0]?.url}
            display_price={product.display_price}
            display_sale_price={product.display_sale_price}
            href={`/products/${product.slug}`}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
