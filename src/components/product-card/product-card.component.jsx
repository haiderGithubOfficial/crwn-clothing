import Button from "../Button/Button.component";
import "./product-card.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { ProductContext } from "../../contexts/products.context";

const ProductCard = ({ product }) => {
  const { products } = useContext(ProductContext);
  const { cartItem, setCartItem } = useContext(CartContext);

  const cartHandler = (event) => {
    // console.log(typeof event.target.id);
    const productId = Number(event.target.id);
    // console.log(cartItem);
    if (cartItem.some((product) => product.id === productId)) {
      const productIndex = cartItem.findIndex(
        (product) => product.id === productId
      );
      cartItem[productIndex].quantity++;
      setCartItem(cartItem);
      // console.log(cartItem);
    } else {
      const newCartItem = products
        .map((product) => {
          return { ...product, quantity: 0 };
        })
        .filter((product) => {
          if (product.id === productId) {
            product.quantity++;
            return true;
          }
          return false;
        });

      setCartItem([...cartItem, ...newCartItem]);
      // console.log(cartItem);
    }
  };
  console.log(cartItem);
  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={product.imageUrl} />
      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>
      <Button id={product.id} buttonType="inverted" onClick={cartHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
