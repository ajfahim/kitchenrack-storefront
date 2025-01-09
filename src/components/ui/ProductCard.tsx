import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

interface ProductCardProps {
  name: string;
  image: string;
  price: string;
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
  return (
    <Link
      href={href}
      className=" rounded-2xl bg-background max-w-[312px] shadow-lg p-4 flex flex-col justify-center items-center"
    >
      <div className="bg-gray-200 rounded-2xl p-4 mb-5 flex items-center justify-center w-[280px] h-[270px]">
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className="object-cover"
        />
      </div>
      <div className="text-center w-full">
        <h3 className="text-2xl font-semibold line-clamp-1">{name}</h3>
        <p className="text-xl font-bold mt-5 mb-6">
          <span className="text-muted">BDT</span>{" "}
          <span className="text-accent">{price}</span>{" "}
          <span className="text-muted">{unit}</span>
        </p>
        <Button>Add to Cart</Button>
      </div>
    </Link>
  );
};

export default ProductCard;
