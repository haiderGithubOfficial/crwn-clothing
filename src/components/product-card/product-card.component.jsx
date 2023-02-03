import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../Button/Button.component";
import { ProductCardContainer, Footer } from "./product-card.styles.jsx";
import { BUTTON_TYPE_CLASSES } from "../Button/Button.component";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <img src={product.imageUrl} alt={product.imageUrl} />
      <Footer>
        <span className="name">{product.name}</span>
        <span className="price">${product.price}</span>
      </Footer>
      <Button
        onClick={addProductToCart}
        id={product.id}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
