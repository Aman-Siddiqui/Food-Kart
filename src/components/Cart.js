import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constant";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log("cartItems", cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center font-bold text-2xl m-4 p-4">
      <div className="m-6">
        <h1>👜 My Cart</h1>
      </div>
      <button
        className="bg-orange-400 text-gray-800 rounded-lg p-2 m-3"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      <div className="m-4 p-3">
        {" "}
        {cartItems.length === 0 && (
          <h1> 📪 Your cart is Empty!! Please add items to the cart</h1>
        )}
      </div>
      <div className="border-solid border-2 border-black w-10/12  m-auto p-4   ">
        <div className="justify-between">
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.card.info.id}
              className="flex justify-between m-5 p-2"
            >
              <div>
                <img
                  src={CDN_URL + cartItem.card.info.imageId}
                  className="object-center w-36"
                />{" "}
              </div>
              <div className="px-4 flex-wrap">
                <div>
                  {" "}
                  <span className="text-lg">
                    {cartItem.card.info.name}
                  </span>{" "}
                </div>
                <div className="text-sm text-gray-600 ">
                  {" "}
                  <p>{cartItem.card.info.description}</p>
                </div>
              </div>
              <div>
                {" "}
                <span className="text-lg">
                  {" "}
                  {cartItem.card.info.price/100 ||
                    cartItem.card.info.defaultPrice/100}
                </span>{" "}
              </div>
              <div>
                {" "}
                <span className="m-7 p-4" >
                  {cartItem.card.info.inStock === 1 ? (
                    <h1 className="text-green-700">In stock</h1>
                  ) : (
                    <h1 className="text-red-500">In stock</h1>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
