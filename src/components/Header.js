import { Link } from "react-router-dom";
import { useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("login");
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="flex justify-between bg-gray-200 shadow-lg mb-2">
      <div className="">
        <h1>EatsExpress</h1>
      </div>
      <div className="nav-items">
        <ul className="flex p-4 m-4">
          <li className="px-4">{onlineStatus ? "✅" : "⛔"}</li>
          <li className="px-4">
            <Link to="/"> Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about"> About</Link>
          </li>
          <li className="px-4">
            <Link to="/contact"> Contact</Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/cart"> Cart-({cartItems.length} Items )</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery"> Grocery</Link>
          </li>
          <button
            classname="login"
            onClick={() => {
              btnName === "login" ? setBtnName("logout") : setBtnName("login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
