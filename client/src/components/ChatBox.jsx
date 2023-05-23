import React, { useContext } from "react";
import { ChatContext } from "../context/chatContext.jsx";

const ChatBox = () => {
  const { recepient } = useContext(ChatContext);
  return (
    <div className="container_chats welcom">
      <form action="">
        <input type="text" placeholder="Messages ..." name="messages" />
        <input type="submit" value="send" />
      </form>
    </div>
  );
};

export default ChatBox;
