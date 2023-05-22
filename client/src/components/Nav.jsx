import React from "react";
import { AiOutlineHome, AiFillSetting } from "react-icons/ai";
import { BiMessageDots } from "react-icons/bi";
import { RiUserFill, RiLogoutBoxRLine } from "react-icons/ri";
const Nav = () => {
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
        <li>
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
