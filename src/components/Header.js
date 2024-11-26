import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";


const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const {loggedIn} = useContext(UserContext)

  //Subscribing to the store using a Selector
  const cartItems = useSelector((store)=>store.cart.items)
  console.log(cartItems)

  return (
    <div className="flex justify-between items-center bg-yellow-50 shadow-lg">
      <div className="pl-28 m-5">
        <img className="w-28 bg-transparent" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="flex items-center pr-24">
        <ul className="flex p-4 m-4 items-center">
          <li className="px-4 ">Online Status {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="px-4 text-xl font-bold text-neutral-700">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 text-xl font-bold text-neutral-700">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4 text-xl font-bold text-neutral-700">
            <Link to="/contact">Contact Us </Link>
          </li>
          <li className="px-4 text-xl font-bold text-neutral-700">
            <Link to="/grocery">Grocery </Link>
          </li>
          
          <li to="/cart" className="px-4 text-xl font-bold text-neutral-700">
          <Link to="/cart">Cart 🛒({cartItems.length})</Link>
          </li>
          <button
            className="border border-solid bg-green-400 m-4 px-4 py-2 rounded-lg"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
          <li> User name : {loggedIn}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
