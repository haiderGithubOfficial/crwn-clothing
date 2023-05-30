import Button from "../Button/Button.component";
import { ProductCardContainer, Footer } from "./product-card.styles.jsx";
import { BUTTON_TYPE_CLASSES } from "../Button/Button.component";

import { addItemToCart } from "../../store/cart/cart.actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
  };

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
