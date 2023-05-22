import React, { useContext } from "react";
import { AuthContext } from "../context/userContext.jsx";
import Nav from "../components/Nav.jsx";

const Chat = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="chat_page">
      <div className="navigation">
        <Nav />
      </div>
      <div className="chat">
        <div className="chats">
          <div className="search"></div>
          <div className="chats_elements"></div>
        </div>
        <div className="chats_container">
          <div className="header"></div>
          <div className="container_chats"></div>
          <form action="">
            <input type="text" placeholder="messages ..." name="messages" />
            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
