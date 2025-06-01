import { Category } from "@/types/product";
import React from "react";
import Marquee from "react-fast-marquee";
import { CategoryCard } from "./CategoryCard";




const HomePageCategorySlider: React.FC = async () => {

  const data = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/v1/categories`, {
    next: {
      revalidate: 3600, // 1 hour
    },
  });
  const categories = await data.json();

 
  return (
    <Marquee pauseOnHover autoFill>
      {categories.data.map((category: Category) => (
        <div key={category.id} className="mx-8">
          <CategoryCard
            name={category.name}
            icon={category.icon}
            href={`/category/${category.slug}`}
          />
        </div>
      ))}
    </Marquee>
  );
};

export default HomePageCategorySlider;
