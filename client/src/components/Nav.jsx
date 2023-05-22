import React, { useContext } from "react";
import { AiOutlineHome, AiFillSetting } from "react-icons/ai";
import { BiMessageDots } from "react-icons/bi";
import { RiUserFill, RiLogoutBoxRLine } from "react-icons/ri";
import { AuthContext } from "../context/userContext.jsx";
const Nav = () => {
  const { user, setUser } = useContext(AuthContext);
  const firstLetter = user.name[0].toUpperCase();
  const handleLogOut = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_URL_LOGOUT, {
        credentials: "include",
      });
      if (response.status === 202) {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user.name);
  return (
    <div className="navgation_bar">
      <ul className="items">
        <li className="logout_btn">
          <AiOutlineHome />
          <span>Home</span>
        </li>
        <li className="logout_btn">
          <BiMessageDots />
          <span>Chat</span>
        </li>
        <li className="logout_btn">
          <AiFillSetting />
          <span>Settings</span>
        </li>
        <li className="logout_btn" onClick={handleLogOut}>
          <RiLogoutBoxRLine />
          <span>Logout</span>
        </li>
        <ul>
          <li className="user items logout_btn">
            <RiUserFill />
            <span>
              {firstLetter}
              {user.name.slice(1)}
            </span>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Nav;
