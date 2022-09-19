import "./categories.styles.scss";
import CategoryItem from "../category-item/category-item.component";

const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      <CategoryItem categories={categories} />
    </div>
  );
};

export default Categories;
