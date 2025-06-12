import ProductPageClientShell from "@/components/Products/ProductPageClientShell";
import { Product } from "@/types";

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Products({ searchParams }: ProductsPageProps) {
  // Build query params for API
  const {
    category_id,
    min_price,
    max_price,
    search,
    page,
    limit,
    featured,
    status,
    brand,
    sort_by,
    sort_order,
  } = searchParams || {};

  const params = new URLSearchParams();
  if (category_id) params.set("category_id", String(category_id));
  if (min_price) params.set("min_price", String(min_price));
  if (max_price) params.set("max_price", String(max_price));
  if (search) params.set("search", String(search));
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  if (featured) params.set("featured", String(featured));
  if (status) params.set("status", String(status));
  if (brand) params.set("brand", String(brand));
  if (sort_by) params.set("sort_by", String(sort_by));
  if (sort_order) params.set("sort_order", String(sort_order));

  const apiUrl = `${process.env.NEXT_PUBLIC_Backend_URL}/api/v1/products${
    params.toString() ? `?${params}` : ""
  }`;
  const res = await fetch(apiUrl, {
    next: { revalidate: 3600 },
  });
  const products = await res.json();

  return <ProductPageClientShell products={products.data as Product[]} />;
}
