import "./categories.styles.scss";
import CategoryItem from "../category-item/category-item.component";

const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((categories) => {
        return <CategoryItem key={categories.id} categories={categories} />;
      })}
    </div>
  );
};

export default Categories;
