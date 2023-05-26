import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/chatContext.jsx";
import { RiUserFill } from "react-icons/ri";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import Notification from "./Notification.jsx";
const ChatBox = ({ user, name }) => {
  const chatContainerRef = useRef(null);
  const { currentChat, messages, updateMessages } = useContext(ChatContext);
  const [textMessage, setTextMessage] = useState("");
  const myId = user.id;

  useEffect(() => {
    if (chatContainerRef.current) {
      scrollToBottom();
    }
  }, [messages]);

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
  function scrollToBottom() {
    const chatContainer = chatContainerRef.current;
    // scroltop donne la position du difilement ( son emplacement) la ref

    chatContainer.scrollTop = chatContainer.scrollHeight;
    //scrollHeight est la valeur total du contenu deroulable de la ref
  }
  return (
    <div className="chats_container">
      {currentChat ? (
        <>
          <div className="header">
            <div className="user">
              <div className="contact_logo">
                <RiUserFill className="user_icon" />
              </div>
              <span>{name}</span>
            </div>
            <Notification />
          </div>
          <div className="container_chats" ref={chatContainerRef}>
            {messages.map((message, index) => (
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

            <div className="emoji"></div>
          </div>
          <div className="send_message">
            <InputEmoji
              placeholder="Type a message"
              value={textMessage}
              onChange={setTextMessage}
            />
            <input type="submit" value="send" onClick={handleSendMessage} />
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
