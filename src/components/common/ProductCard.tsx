"use client";
import VariantSelectSheet from "@/components/cart/VariantSelectSheet";
import { calculateDiscountPercentage, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/product";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ProductCardProps {
  name: string;
  image: string;
  display_price: number;
  display_sale_price?: number | undefined | null;
  href: string;
  // Add the full product for variant logic
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  display_price,
  display_sale_price,
  href,
  product,
}) => {
  const { addToCart } = useCartStore();
  const [showVariantSheet, setShowVariantSheet] = useState(false);

  const handleAddToCart = () => {
    if (product.has_variants && product.variants.length > 0) {
      setShowVariantSheet(true);
    } else {
      addToCart({
        productId: product.id,
        name: product.name,
        image: product.images[0]?.url || "",
        price:
          product.display_sale_price &&
          product.display_sale_price < product.display_price
            ? product.display_sale_price
            : product.display_price ?? product.price,
        qty: 1,
        unit: product.unit,
      });
    }
  };

  // Calculate discount percentage based on original price and sale price
  const discountPercentage = calculateDiscountPercentage(
    display_price,
    display_sale_price!
  );
  console.log({ discountPercentage });

  // Use the sale price if available, otherwise use the original price
  const displayPrice =
    display_sale_price && display_sale_price < display_price
      ? display_sale_price
      : display_price;

  // Format prices for display
  const formattedOriginalPrice = formatPrice(display_price);
  const formattedDisplayPrice = formatPrice(displayPrice);

  return (
    <div className="group max-w-[330px] overflow-hidden transition-all duration-300 rounded-lg bg-white shadow-sm hover:shadow-lg border border-gray-200">
      {/* Badge for discount - only show if there's an actual discount */}
      <div className="relative">
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded z-10">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Product image with link */}
        <Link
          href={href}
          className="block overflow-hidden relative rounded-t-lg"
        >
          <div className="aspect-square overflow-hidden flex items-center justify-center p-4 bg-gray-50">
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Product info */}
      <div className="p-4">
        {/* Product Name */}
        <Link href={href}>
          <h3 className="text-xl font-bold line-clamp-1 mb-2  ">{name}</h3>
        </Link>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-2 mb-4">
          <div className="flex items-baseline">
            <span className="text-accent font-bold text-xl">
              ৳{formattedDisplayPrice}
            </span>
          </div>
          {/* Only show original price if there's a discount */}
          {display_sale_price && display_sale_price > 0 && (
            <div className="flex items-baseline">
              <span className="text-gray-400 text-lg line-through">
                ৳{formattedOriginalPrice}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-primary/10 hover:bg-primary/20 text-yellow-700 rounded p-2 flex items-center justify-center transition-all duration-300 border border-primary/20"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={20} />
          </button>
          <Link
            href={href}
            className="flex-[4] bg-primary hover:bg-primary-hover text-primary-foreground rounded py-2 px-3 flex items-center justify-center gap-1 transition-all duration-300 group/btn text-xl font-bold"
          >
            Buy Now{" "}
            <ArrowRight
              size={18}
              className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </Link>
          {/* Variant selection sheet/modal */}
          {product.has_variants && (
            <VariantSelectSheet
              product={product}
              open={showVariantSheet}
              onClose={() => setShowVariantSheet(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
