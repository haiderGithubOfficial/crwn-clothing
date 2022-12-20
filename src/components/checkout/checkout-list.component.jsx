import "./cart-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const cartRemoveItem = () => {
    console.log(cartItem);
    console.log("l");
    const newCartItems = cartItems.filter((item) => item.id !== cartItem.id);
    console.log(newCartItems);
    setCartItems(newCartItems);
  };

  const cartCount = (event) => {
    const newCartCount = Number(event.target.value);
    const newCartItems = cartItems.map((item) =>
      item.id === cartItem.id ? { ...cartItem, quantity: newCartCount } : item
    );

    setCartItems(newCartItems);
  };

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
      <input type="number" onClick={cartCount} name="cartCount" />
      <button type="button" onClick={cartRemoveItem}>
        remove
      </button>
    </div>
  );
};

export default CheckoutItem;
