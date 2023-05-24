import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/userContext.jsx";
import Nav from "../components/Nav.jsx";
import { CiSearch } from "react-icons/ci";
import { RiUserFill } from "react-icons/ri";
import { ChatContext } from "../context/chatContext.jsx";
import SingleChat from "../components/SingleChat.jsx";
import { useState } from "react";
import PotentialChat from "../components/PotentialChat";
import ChatBox from "../components/ChatBox.jsx";
const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, currentChat, recepient } = useContext(ChatContext);
  const [activeTab, setActiveTab] = useState("home");
  const [name, setName] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [recepient]);

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
                    <SingleChat
                      singleCHat={singleCHat}
                      user={user}
                      chatId={singleCHat._id}
                      key={singleCHat._id}
                      setName={setName}
                    />
                  ))
                : "loading"}
            </div>
          </div>
          <div className="chats_container">
            <div className="header">
              {currentChat && (
                <>
                  <div className="contact_logo">
                    <RiUserFill className="user_icon" />
                  </div>
                  <span>{name}</span>
                </>
              )}
            </div>
            {currentChat ? (
              <ChatBox user={user} />
            ) : (
              <div className="container_chats welcom">
                <div className="welcom_message ">
                  <h1 className="title">Welcome back {user.name} 😄</h1>
                  <p>
                    Select a conversation from your contacts list and start
                    chatting in <span className="text-primary">private</span>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
