import React, { useContext } from "react";
import { AiOutlineHome, AiFillSetting } from "react-icons/ai";
import { BiMessageDots } from "react-icons/bi";
import { RiUserFill, RiLogoutBoxRLine } from "react-icons/ri";
import { AuthContext } from "../context/userContext.jsx";
const Nav = () => {
  const { user, setUser } = useContext(AuthContext);
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
  return (
    <div className="navgation_bar">
      <ul className="items">
        <li>
          <AiOutlineHome />
        </li>
        <li>
          <BiMessageDots />
        </li>
        <li>
          <AiFillSetting />
        </li>
        <li onClick={handleLogOut}>
          <RiLogoutBoxRLine />
        </li>
        <ul>
          <li className="user items">
            <RiUserFill />
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Nav;
