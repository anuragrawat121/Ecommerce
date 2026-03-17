import React, { useEffect, useState } from "react";
import useProductContext from "../../ContextApi/ProductContext";
import ProductCard from "../ProductCard";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useProductContext();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let filtered = products.filter((item) => category === item.category);
      filtered = filtered.filter((item) => subCategory === item.subCategory);

      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  if (related.length === 0) return null;

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500 font-medium">
            RELATED <span className="text-white font-bold">PRODUCTS</span>
          </p>
          <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 justify-items-center">
        {related.map((item, index) => (
          <ProductCard
            key={item._id}
            product={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
