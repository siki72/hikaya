import React, { useContext } from "react";
import { ChatContext } from "../context/chatContext.jsx";
import { RiUserFill } from "react-icons/ri";
const ChatBox = ({ user, name }) => {
  const { currentChat, messages } = useContext(ChatContext);
  return (
    <>
      <div className="chats_container">
        {currentChat ? (
          <>
            <div className="header">
              <div className="contact_logo">
                <RiUserFill className="user_icon" />
              </div>
              <span>{name}</span>
            </div>
            <div className="container_chats welcom">
              <form action="">
                <input type="text" placeholder="Messages ..." name="messages" />
                <input type="submit" value="send" />
              </form>
            </div>
          </>
        ) : (
          <div className="container_chats welcom">
            <div className="welcom_message ">
              <h1 className="title">Welcome back {user.name} 😄</h1>
              <p>
                Select a conversation from your contacts list and start chatting
                in <span className="text-primary">private</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBox;
