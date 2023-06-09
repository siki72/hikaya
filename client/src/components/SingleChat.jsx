import React, { useContext, useEffect, useRef, useState } from "react";
import { RiUserFill } from "react-icons/ri";
import { BsFillTrash3Fill } from "react-icons/bs";
import { ChatContext } from "../context/chatContext.jsx";
const SingleChat = ({ singleCHat, user, chatId, setName }) => {
  const divRef = useRef(null);
  const [recepient, setRecepient] = useState(null);
  const recepiedId = singleCHat?.members.find((id) => id !== user?.id);
  const chatDate = singleCHat?.createdAt.split("T", 1);
  const {
    userChats,
    setUserChats,
    updateRecepient,
    updateCurrentChat,
    currentChat,
    onlineUsers,
    isTyping,
    notification,
  } = useContext(ChatContext);
  const [countToD, setCountToD] = useState([]);

  useEffect(() => {
    if (currentChat && singleCHat) {
      if (currentChat._id === singleCHat._id) {
        divRef.current.className = "contact blue_backGround";
      }
    }

    return () => {
      if (divRef.current) {
        divRef.current.className = "contact";
      }
    };
  }, [currentChat, singleCHat, divRef]);

  useEffect(() => {
    const fetchRecepientUser = async () => {
      try {
        if (recepiedId) {
          const response = await fetch(
            `${import.meta.env.VITE_URL_FIND_USER}/${recepiedId}`
          );
          if (response.status === 200) {
            const data = await response.json();
            setRecepient(data);
            updateRecepient(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecepientUser();
  }, [singleCHat]);

  const handleRemoveChat = async () => {
    const response = await fetch(import.meta.env.VITE_URL_REMOVE_CHAT, {
      method: "POST",

      credentials: "include",
      body: JSON.stringify({ id: user.id, chatId }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status === 200) {
      const newChats = await userChats.filter((cahts) => cahts._id !== chatId);
      setUserChats(newChats);
    }
  };

  useEffect(() => {
    const a = notification.map((notif) => {
      if (notif.isRead) return;
      return singleCHat.members.find((m) => m === notif.senderId);
    });

    setCountToD(a);
  }, [notification]);

  const handleUpdate = (param) => {
    updateCurrentChat(param);
    setName(recepient.name);
    setCountToD(null);
  };

  return (
    <div
      ref={divRef}
      className="contact"
      key={singleCHat._id}
      onClick={() => handleUpdate(singleCHat)}
    >
      <div className="contact_logo" onClick={() => setName(recepient?.name)}>
        <RiUserFill className="user_icon" />
        {onlineUsers.some((u) => u.userId === recepient?._id) && (
          <div className="online_user"></div>
        )}
      </div>
      <div className="contact_infos">
        <h3>{recepient?.name}</h3>
        {/*  {recepient?._id === isTyping && <p>est entrain d ecrire</p>} */}
        <div>
          <p className={recepient?._id === isTyping ? "show-text" : "text"}>
            {recepient?.name.toUpperCase()} is typing ...
          </p>
        </div>
      </div>
      <div className="datas">
        <span id="trash">
          <BsFillTrash3Fill onClick={() => handleRemoveChat()} />
        </span>
        <div className="date">{chatDate}</div>
        {countToD?.some((c) => c === recepiedId) && (
          <div className="notifications">{countToD.length}</div>
        )}
      </div>
    </div>
  );
};

export default SingleChat;
