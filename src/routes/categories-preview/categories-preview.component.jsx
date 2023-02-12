import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  const { categoriesMap } = useSelector(selectCategoriesMap);
  return (
    <>
      {Object.keys(categoriesMap ? categoriesMap : "").map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
