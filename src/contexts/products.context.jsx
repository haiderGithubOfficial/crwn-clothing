import SHOP_DATA from "../shop-data.json";
import { createContext, useState } from "react";

export const ProductContext = createContext({
  products: SHOP_DATA,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = { products, setProducts };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
