import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryTitle, CategoryContainer } from "./category.styles";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
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
