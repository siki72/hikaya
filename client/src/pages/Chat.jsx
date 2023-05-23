import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/userContext.jsx";
import Nav from "../components/Nav.jsx";
import { CiSearch } from "react-icons/ci";
import { RiUserFill } from "react-icons/ri";
import { ChatContext } from "../context/chatContext.jsx";
import SingleChat from "../components/SingleChat.jsx";
import { useState } from "react";
import PotentialChat from "../components/PotentialChat";
const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats } = useContext(ChatContext);
  const [activeTab, setActiveTab] = useState("home");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log(isReady);
    setIsReady(true);
  }, [userChats]);

  return (
    <>
      {activeTab === "chats" && <PotentialChat setActiveTab={setActiveTab} />}
      <div className="chat_page">
        <div className="navigation">
          <Nav setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
        <div className="chat">
          <div className="chats">
            <div className="search">
              <input type="search" name="search" id="" placeholder="Search" />
              <CiSearch className="serach_icon" />
            </div>
            <div className="chats_elements">
              {isReady
                ? userChats?.map((singleCHat) => (
                    <div className="contact" key={singleCHat._id}>
                      <SingleChat
                        singleCHat={singleCHat}
                        user={user}
                        chatId={singleCHat._id}
                      />
                    </div>
                  ))
                : "loading"}
            </div>
          </div>
          <div className="chats_container">
            <div className="header">
              <div className="contact_logo">
                <RiUserFill className="user_icon" />
              </div>
              <span>{user.name}</span>
            </div>
            <div className="container_chats">
              <form action="">
                <input type="text" placeholder="Messages ..." name="messages" />
                <input type="submit" value="send" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
