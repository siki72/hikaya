import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/chatContext.jsx";
import { RiUserFill } from "react-icons/ri";
import moment from "moment";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdDoneAll } from "react-icons/md";
const ChatBox = ({ user, name }) => {
  const [ready, setReady] = useState(false);
  const chatContainerRef = useRef(null);
  const {
    currentChat,
    messages,
    updateMessages,
    socket,
    isTyping,
    allUsers,
    newMessage,
    setMessages,
  } = useContext(ChatContext);
  const [textMessage, setTextMessage] = useState("");
  const myId = user.id;
  const recepientId = currentChat?.members.find((id) => id !== user.id);

  const sender = allUsers;

  useEffect(() => {
    if (chatContainerRef.current) {
      scrollToBottom();
    }
    setReady(true);
  }, [messages]);
  useEffect(() => {
    setReady(true);
  }, [newMessage]);

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

  const handleStopTyping = () => {
    socket.emit("finishTyping", {
      recepientId,
      senderId: myId,
    });
    return () => {
      socket.off("finishTyping");
    };
  };
  const handleTyping = (e) => {
    if (e !== "") {
      setTextMessage(e.target.value);

      socket.emit("isTyping", {
        recepientId,
        senderId: myId,
      });
    }
    return () => {
      socket.off("isTyping");
    };
  };

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
          </div>
          <div className="container_chats" ref={chatContainerRef}>
            {ready &&
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

                  {message?.lu === true ? (
                    <div className="status">
                      <MdDoneAll />
                    </div>
                  ) : (
                    <div className="just_sender">envoyé</div>
                  )}
                </div>
              ))}

            <div className="emoji"></div>
          </div>
          <div className="send_message">
            <input
              type="text"
              placeholder="Type a message"
              value={textMessage}
              onChange={(e) => handleTyping(e)}
              onKeyUp={handleStopTyping}
            />
            {/* <InputEmoji
              placeholder="Type a message"
              value={textMessage}
              onChange={(e) => handleTyping(e)}
              onKeyUp={handleStopTyping}
            /> */}

            <input type="submit" value="send" onClick={handleSendMessage} />
          </div>
        </>
      ) : (
        <div className="container_chats welcom">
          <div className="welcom_message ">
            <h1 className="title">
              Welcome back {user.name}{" "}
              <BsFillChatQuoteFill className="welcom_icon" />{" "}
            </h1>
            <p>Select a conversation from your contacts list</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
