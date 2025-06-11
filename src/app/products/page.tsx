import ProductPageClientShell from "@/components/Products/ProductPageClientShell";
import { Product } from "@/types";

export default async function Products() {
  // fetch products 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}/api/v1/products`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );
  const products = await res.json();

  return <ProductPageClientShell products={products.data as Product[]} />;
}

