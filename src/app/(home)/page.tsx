import { BannerCarousel } from "@/components/home/BannerCarousel";
import HomeBanner from "@/components/home/HomeBanner";
import HomePageCategorySlider from "@/components/home/HomePageCategorySlider";
import { HomePageSection } from "@/components/home/HomePageSection";
import { CustomCarousel } from "@/components/ui/custom-carousel";
import ProductCard from "@/components/ui/ProductCard"; // Added import statement

const categories = [
  {
    name: "Raw Nuts",
    icon: "/categoryIcons/categoryIcon1.png",
    href: "/category/raw-nuts",
  },
  {
    name: "Roasted Nuts",
    icon: "/categoryIcons/categoryIcon2.png",
    href: "/category/roasted-nuts",
  },
  {
    name: "Raw Seed",
    icon: "/categoryIcons/categoryIcon3.png",
    href: "/category/raw-seed",
  },
  {
    name: "Roasted Seed",
    icon: "/categoryIcons/categoryIcon4.png",
    href: "/category/roasted-seed",
  },
  {
    name: "Mixed Packages",
    icon: "/categoryIcons/categoryIcon5.png",
    href: "/category/mixed-packages",
  },
  {
    name: "Dates",
    icon: "/categoryIcons/categoryIcon1.png",
    href: "/category/dates",
  },
];

const trendingProducts = [
  {
    name: "Organic Almonds",
    image: "/products/almond.png",
    price: "15.99",
    unit: "kg",
    description: "Delicious organic almonds, perfect for snacking.",
    href: "/products/organic-almonds",
  },
  {
    name: "Raw Cashews",
    image: "/products/cashew.png",
    price: "12.99",
    unit: "kg",
    description: "Nutritious raw cashews, great for recipes.",
    href: "/products/raw-cashews",
  },
  {
    name: "Dried Cranberries",
    image: "/products/walnut.png",
    price: "8.99",
    unit: "kg",
    description: "Sweet and tart dried cranberries for a healthy snack.",
    href: "/products/dried-cranberries",
  },
  {
    name: "Dried Cranberries Dried Cranberries Dried Cranberries",
    image: "/products/Roasted Pistachio.png",
    price: "8.99",
    unit: "kg",
    description: "Sweet and tart dried cranberries for a healthy snack.",
    href: "/products/dried-cranberries",
  },

  {
    name: "Raw Cashews",
    image: "/products/cashew.png",
    price: "12.99",
    unit: "kg",
    description: "Nutritious raw cashews, great for recipes.",
    href: "/products/raw-cashews",
  },
  {
    name: "Dried Cranberries",
    image: "/products/walnut.png",
    price: "8.99",
    unit: "kg",
    description: "Sweet and tart dried cranberries for a healthy snack.",
    href: "/products/dried-cranberries",
  },
  {
    name: "Organic Almonds",
    image: "/products/almond.png",
    price: "15.99",
    unit: "kg",
    description: "Delicious organic almonds, perfect for snacking.",
    href: "/products/organic-almonds",
  },
  {
    name: "Raw Cashews",
    image: "/products/cashew.png",
    price: "12.99",
    unit: "kg",
    description: "Nutritious raw cashews, great for recipes.",
    href: "/products/raw-cashews",
  },
  // Add more products as needed
];

const featuredProducts = trendingProducts.map((product) => (
  <ProductCard
    key={product.name}
    name={product.name}
    image={product.image}
    price={product.price}
    unit={product.unit}
    href={product.href}
  />
));

export default function Home() {
  return (
    <div className="my-4 space-y-24">
      {/* hero banner  */}
      <BannerCarousel />
      {/* top categories section  */}
      <HomePageSection
        title="Our Top Categories"
        showExploreAll
        link="/categories"
      >
        <div className="w-full">
          <HomePageCategorySlider categories={categories} />
        </div>
      </HomePageSection>
      {/* trending products section  */}
      <HomePageSection
        title="Our Trending Products"
        showExploreAll
        link="/products"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              image={product.image}
              price={product.price}
              unit={product.unit}
              href={product.href}
            />
          ))}
        </div>
      </HomePageSection>
      {/* Home banners section  */}
      <HomeBanner />

      {/* Featured products section  */}
      <HomePageSection
        title="Our Featured Products"
        showExploreAll
        link="/products"
      >
        <CustomCarousel
          showArrows
          items={featuredProducts}
          showDots={false}
          type="product"
        />
      </HomePageSection>
    </div>
  );
}
