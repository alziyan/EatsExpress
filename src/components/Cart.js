import { useSelector, useDispatch } from "react-redux";
import ItemList from "./ItemList.js";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="text-center m-6 p-6 ">
      <h1 className="text-2xl font-bold">Cart Store</h1>
      <div className="w-6/12 m-auto">
        <button
          onClick={handleClearCart}
          className="p-2 m-2 bg-black text-white rounded-lg"
        >
          Clear
        </button>
        {cartItems.length === 0 && (
          <div className="m-4 p-4 border border-black">
            <h1 className="text-xl ">Cart is empty</h1>
          </div>
        )}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
