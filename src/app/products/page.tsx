import ProductCard from "@/components/common/ProductCard";
import BreadCrumb from "@/components/productDetails/BreadCrumb";
import { ProductFilter } from "@/components/Products/productFilter";
import { trendingProducts } from "../(home)/page";

const Products = () => {
  return (
    <div>
      <BreadCrumb />
      <ProductFilter />
      <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
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
  );
};

export default Products;
