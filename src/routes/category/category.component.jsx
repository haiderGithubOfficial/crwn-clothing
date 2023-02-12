import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryTitle, CategoryContainer } from "./category.styles";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(
    categoriesMap ? categoriesMap[category] : null
  ); // categoriesMap ? categoriesMap[category] : [] this means that if and only if the categoriesMap is not undefined then look init as categoriesMap[category]. otherwise it will give error of undefined[category]. This happens when we fetch data as async and on the first rendering the data is not yet available

  useEffect(() => {
    setProducts(categoriesMap ? categoriesMap[category] : null);
    //eslint-disable-next-line
  }, [category, products, categoriesMap]);

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
