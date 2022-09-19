import "./category-item.style.scss";

const CategoryItem = ({ categories }) => {
  return categories.map(({ id, title, imageUrl }) => (
    <div key={id} className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>shop now</p>
      </div>
    </div>
  ));
};

export default CategoryItem;
