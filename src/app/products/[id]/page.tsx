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
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2">
          <ProductGallery images={images} />
          {/* Action Buttons */}
          <div className="md:relative fixed bottom-0 left-0 w-full bg-white md:bg-transparent border-t border-gray-300 p-4 md:p-0 z-50 md:border-none">
            <ActionButtons />
          </div>
        </div>

        {/* Right: Product Information */}
        <div className="w-full md:w-1/2">
          <ProductInfo
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            sizes={product.sizes}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
