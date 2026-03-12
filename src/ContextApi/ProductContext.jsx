import React, { createContext, useContext } from "react";
import { products, assets } from "../assets/assets.js";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [search, setSearch] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);

  const value = {
    products,
    assets,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider",
    );
  }
  return context;
};

export default useProductContext;
