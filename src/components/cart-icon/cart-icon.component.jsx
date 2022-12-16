import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ dropdownHandler, cartItem }) => {
  return (
    <div onClick={dropdownHandler} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItem.length}</span>
    </div>
  );
};

export default CartIcon;
