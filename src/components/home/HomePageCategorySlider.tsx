import React from "react";
import Marquee from "react-fast-marquee";
import { CategoryCard } from "./CategoryCard";

interface HomePageCategorySliderProps {
  categories: { name: string; icon: string; href: string }[];
}

const HomePageCategorySlider: React.FC<HomePageCategorySliderProps> = ({
  categories,
}) => {
  return (
    <Marquee pauseOnHover autoFill>
      {categories.map((category) => (
        <div key={category.name} className="mx-8">
          <CategoryCard
            name={category.name}
            icon={category.icon}
            href={category.href}
          />
        </div>
      ))}
    </Marquee>
  );
};

export default HomePageCategorySlider;
