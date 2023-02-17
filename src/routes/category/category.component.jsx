import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryTitle, CategoryContainer } from "./category.styles";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const Category = () => {
  console.log("1 render/re-rendering category component");
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  console.log("focus: ", categoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    console.log("3 effect fired calling setProducts");
    setProducts(categoriesMap[category]);
    //eslint-disable-next-line
  }, [category, categoriesMap[category]]);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
