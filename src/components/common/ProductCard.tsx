import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  unit: string;
  href: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  unit,
  href,
}) => {
  // Calculate discount price (just for display - in a real app this would come from data)
  const originalPrice = price;
  const discountPercentage = 10; // Example: 10% off
  const discountPrice = (
    (originalPrice * (100 - discountPercentage)) /
    100
  ).toFixed(2);

  return (
    <div className="group max-w-[330px] overflow-hidden transition-all duration-300 rounded-lg bg-white shadow-sm hover:shadow-lg border border-gray-100">
      {/* Badge for discount */}
      <div className="relative">
        <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded z-10">
          {discountPercentage}% OFF
        </div>

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
          <span className="text-accent font-bold text-xl">
            ৳{discountPrice}
          </span>
          <span className="text-gray-400 text-lg line-through">৳{price}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-primary/10 hover:bg-primary/20 text-yellow-700 rounded p-2 flex items-center justify-center transition-all duration-300 border border-primary/20"
            aria-label="Add to cart"
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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
