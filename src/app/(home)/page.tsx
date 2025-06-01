import ProductCard from "@/components/common/ProductCard"; // Added import statement
import { BannerCarousel } from "@/components/home/BannerCarousel";
import HomeBanner from "@/components/home/HomeBanner";
import HomePageCategorySlider from "@/components/home/HomePageCategorySlider";
import { HomePageSection } from "@/components/home/HomePageSection";
import { CustomCarousel } from "@/components/ui/custom-carousel";
import { Product } from "@/types";

export const trendingProducts = [
  {
    name: "Organic Almonads Organic Almonads Organic Almonads",
    image: "/products/almond.png",
    price: "15.99",
    unit: "kg",
    description: "Delicious organic almonds, perfect for snacking.",
    href: "/products/organic-almonds",
  },
  {
    name: "Raw Cassshews",
    image: "/products/cashew.png",
    price: "12.99",
    unit: "kg",
    description: "Nutritious raw cashews, great for recipes.",
    href: "/products/raw-cashews",
  },
  {
    name: "Dried Cranaberries",
    image: "/products/walnut.png",
    price: "8.99",
    unit: "kg",
    description: "Sweet and tart dried cranberries for a healthy snack.",
    href: "/products/dried-cranberries",
  },
  {
    name: "Dried Cranberries",
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
    name: "Dried Cranbersries",
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
    name: "Raw Cashew",
    image: "/products/cashew.png",
    price: "12.99",
    unit: "kg",
    description: "Nutritious raw cashews, great for recipes.",
    href: "/products/raw-cashews",
  },
  {
    name: "Granola",
    image: "/products/granola.jpeg",
    price: "12.99",
    unit: "kg",
    description: "Nutritious raw cashews, great for recipes.",
    href: "/products/raw-cashews",
  },
  {
    name: "Moringa Powder",
    image: "/products/moringa.jpeg",
    price: "12.99",
    unit: "kg",
    description: "Nutritious raw cashews, great for recipes.",
    href: "/products/raw-cashews",
  },
  // Add more products as needed
];

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}/api/v1/products?featured=true`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );
  const featuredProducts = await res.json();
  console.log("products", featuredProducts);

  const featuredProductsCards = featuredProducts.data.map(
    (product: Product, index: number) => (
      <ProductCard
        key={product.id}
        name={product.name}
        image={product.images[0].url}
        price={product.price}
        unit={product.unit}
        href={`/products/${product.slug}`}
      />
    )
  );

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
          <HomePageCategorySlider />
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
              price={+product.price}
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
          items={featuredProductsCards}
          showDots={false}
          type="product"
        />
      </HomePageSection>
    </div>
  );
}
