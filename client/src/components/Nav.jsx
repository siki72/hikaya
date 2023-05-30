import React, { useContext, useState } from "react";
import { AiOutlineHome, AiFillSetting } from "react-icons/ai";
import { BiMessageDots } from "react-icons/bi";
import { RiUserFill, RiLogoutBoxRLine } from "react-icons/ri";
import { AuthContext } from "../context/userContext.jsx";
import Notification from "./Notification.jsx";
const Nav = ({ setActiveTab, activeTab }) => {
  const { user, setUser } = useContext(AuthContext);

  const firstLetter = user?.name[0].toUpperCase();

  const handleActiveTab = (tabName) => {
    setActiveTab(tabName);
  };
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
        <li
          className={
            activeTab === "home" ? "activeClass logout_btn" : "logout_btn"
          }
          onClick={() => handleActiveTab("home")}
        >
          <AiOutlineHome />
          <span>Home</span>
        </li>
        <li>
          <Notification />
        </li>
        <li
          className={
            activeTab === "chats" ? "activeClass logout_btn" : "logout_btn"
          }
          onClick={() => handleActiveTab("chats")}
        >
          <BiMessageDots />
          <span>Chats</span>
        </li>
        {/* <li
          className={
            activeTab === "settings" ? "activeClass logout_btn" : "logout_btn"
          }
          onClick={() => handleActiveTab("settings")}
        >
          <AiFillSetting />
          <span>Settings</span>
        </li> */}
        <li className="logout_btn" onClick={handleLogOut}>
          <RiLogoutBoxRLine />
          <span>Logout</span>
        </li>
        <ul>
          <li className="user items logout_btn">
            <RiUserFill />
            <span>
              {firstLetter}
              {user?.name.slice(1)}
            </span>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Nav;
