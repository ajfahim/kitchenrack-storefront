// src/types/product.ts

export type Category = {
  id: string;
  name: string;
  icon: string;
  slug: string;
}
export type ProductImage = {
  id: number;
  url: string;
  alt_text: string | null;
  display_order: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export type ProductVariant = {
  id: number;
  name: string;
  sku: string | null;
  price: number;
  sale_price: number | null;
  stock: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export type ProductStatus = 'active' | 'inactive' | 'draft';

export type Product = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  status: ProductStatus;
  short_description: string;
  description: string;
  price: number;
  sale_price: number | null;
  cost_price: number | null;
  unit: string;
  stock_quantity: number;
  weight: number | null;
  brand: string;
  featured: boolean;
  has_variants: boolean;
  created_at: string;
  updated_at: string;
  categories: Category[];
  images: ProductImage[];
  variants: ProductVariant[];
}

