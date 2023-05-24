import React, { useContext, useRef, useState } from "react";
import { ChatContext } from "../context/chatContext.jsx";
import { RiUserFill } from "react-icons/ri";
import moment from "moment";
import InputEmoji from "react-input-emoji";
const ChatBox = ({ user, name }) => {
  const formRef = useRef(null);
  const { currentChat, messages, updateMessages } = useContext(ChatContext);
  const [textMessage, setTextMessage] = useState("");
  const myId = user.id;
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (textMessage !== "") {
        const resposne = await fetch(import.meta.env.VITE_URL_API_MESSAGES, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: currentChat._id,
            senderId: myId,
            text: textMessage,
          }),
        });
        if (resposne.status === 201) {
          const data = await resposne.json();
          updateMessages(data);
          setTextMessage("");
        }
      } else {
        alert("entrer a text");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(textMessage);
  return (
    <div className="chats_container">
      {currentChat ? (
        <>
          <div className="header">
            <div className="contact_logo">
              <RiUserFill className="user_icon" />
            </div>
            <span>{name}</span>
          </div>
          <div className="container_chats">
            {messages &&
              messages.map((message, index) => (
                <div
                  className={
                    message.senderId === myId
                      ? "messages-container"
                      : "messages-container recevied"
                  }
                  key={index}
                >
                  <div className="message">{message.text}</div>
                  <div className="moment">
                    {moment(message.createdAt).calendar()}
                  </div>
                </div>
              ))}
            <form action="" ref={formRef}>
              <InputEmoji
                placeholder="Type a message"
                value={textMessage}
                onChange={setTextMessage}
              />
              <input type="submit" value="send" onClick={handleSendMessage} />
            </form>
            <div className="emoji"></div>
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
  );
};

export default ChatBox;
