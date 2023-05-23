import React, { useContext } from "react";
import { ChatContext } from "../context/chatContext.jsx";
import { RiUserFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../context/userContext.jsx";
const PotentialChat = ({ setActiveTab }) => {
  const { potentialChats, setUserChats } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  console.log(user);
  const createChat = async (id) => {
    console.log(id);
    try {
      if (user) {
        const response = await fetch(import.meta.env.VITE_URL_CHATS, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ firstId: user.id, secondId: id }),
          headers: {
            "Content-type": "application/json",
          },
        });
        if (response.status === 201) {
          const data = await response.json();
          setUserChats((prevStat) => [...prevStat, data]);
          console.log("chat created", data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="potential_chats contact">
      <div className="new_chats_container">
        <AiOutlineClose
          className="close"
          onClick={() => setActiveTab("home")}
        />
        {potentialChats &&
          potentialChats.map((pchat) => (
            <div
              className="chats_box"
              key={pchat._id}
              onClick={() => createChat(pchat._id)}
            >
              <div className="contact_chatslogo">
                <RiUserFill className="user_icon" />
              </div>
              <div className="contact_chats">
                <h3>{pchat?.name}</h3>
              </div>
              <div className="datas">
                <div className="online_user"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PotentialChat;
