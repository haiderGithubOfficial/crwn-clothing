import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../Button/Button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={product.imageUrl} />
      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">${product.price}</span>
      </div>
      <Button onClick={addProductToCart} id={product.id} buttonType="inverted">
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
