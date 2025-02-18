import { trendingProducts } from "@/app/(home)/page";
import ProductCard from "@/components/common/ProductCard";
import SectionTitle from "@/components/common/SectionTitle";
import ActionButtons from "@/components/productDetails/ActionButtons";
import BreadCrumb from "@/components/productDetails/BreadCrumb";
import ProductGallery from "@/components/productDetails/ProductGallery";
import ProductInfo from "@/components/productDetails/ProductInfo";

const ProductDetails = () => {
  const images = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
    "https://swiperjs.com/demos/images/nature-5.jpg",
  ];
  const product = {
    name: "Premium Velvet Cushion Cover",
    price: 252,
    originalPrice: 300,
    discount: 16,
    sizes: ["16X16 INCH", "18X18 INCH"],
  };
  return (
    <div className="w-full">
      <BreadCrumb />
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-1/2 relative lg:sticky top-4 lg:h-[100vh]">
          <ProductGallery images={images} />
          {/* Action Buttons */}
          <div className="lg:relative fixed bottom-0 left-0 w-full bg-white lg:bg-transparent border-t border-gray-300 p-4 lg:p-0 z-50 lg:border-none">
            <ActionButtons />
          </div>
        </div>

        {/* Right: Product Information */}
        <div className="w-full lg:w-1/2">
          <ProductInfo
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            sizes={product.sizes}
          />
        </div>
      </div>
      {/* similar products section  */}
      <div className="mt-20">
        <SectionTitle title="Similar Products" />
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
      </div>
    </div>
  );
};

export default ProductDetails;
