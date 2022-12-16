const CartItem = ({ product }) => {
  return (
    <div>
      {product.name}
      <p>{product.quantity}</p>
    </div>
  );
};

export default CartItem;
