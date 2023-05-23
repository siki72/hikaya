import React, { useContext, useEffect, useState } from "react";
import { RiUserFill } from "react-icons/ri";
import { BsFillTrash3Fill } from "react-icons/bs";
import { ChatContext } from "../context/chatContext.jsx";
const SingleChat = ({ singleCHat, user, chatId }) => {
  const [recepient, setRecepient] = useState(null);
  const recepiedId = singleCHat?.members.find((id) => id !== user?.id);
  const chatDate = singleCHat?.createdAt.split("T", 1);
  const { userChats, setUserChats, updateRecepient } = useContext(ChatContext);

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
  }, [user]);

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

  return (
    <>
      <div className="contact_logo">
        <RiUserFill className="user_icon" />
        <div className="online_user"></div>
      </div>
      <div className="contact_infos">
        <h3>{recepient?.name}</h3>
        <p>un aperçu du message</p>
      </div>
      <div className="datas">
        <span id="trash">
          <BsFillTrash3Fill onClick={() => handleRemoveChat()} />
        </span>
        <div className="date">{chatDate}</div>
        <div className="notifications">2</div>
      </div>
    </>
  );
};

export default SingleChat;
