import ProductCard from "@/components/common/ProductCard"; // Added import statement
import { BannerCarousel } from "@/components/home/BannerCarousel";
import HomeBanner from "@/components/home/HomeBanner";
import HomePageCategorySlider from "@/components/home/HomePageCategorySlider";
import { HomePageSection } from "@/components/home/HomePageSection";
import { CustomCarousel } from "@/components/ui/custom-carousel";
import { Product } from "@/types";



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
  console.log(featuredProducts);

  const featuredProductsCards = featuredProducts.data.map(
    (product: Product, index: number) => (
      <ProductCard
        key={product.id}
        name={product.name}
        image={product.images[0].url}
        display_price={product.display_price}
        display_sale_price={product.display_sale_price}
        href={`/products/${product.slug}`}
      />
    )
  );

  const trendingProductsCards = featuredProducts.data.map(
    (product: Product, index: number) => (
      <ProductCard
        key={product.id}
        name={product.name}
        image={product.images[0].url}
        display_price={product.display_price}
        display_sale_price={product.display_sale_price}
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
          {featuredProducts.data.map((product:Product) => (
            <ProductCard
            key={product.id}
            name={product.name}
            image={product?.images[0]?.url}
            display_price={product.display_price}
            display_sale_price={product.display_sale_price}
            href={`/products/${product.slug}`}
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
