import React, { useContext } from "react";
import { ChatContext } from "../context/chatContext.jsx";
import { RiUserFill } from "react-icons/ri";

const PotentialChat = () => {
  const { potentialChats } = useContext(ChatContext);

  return (
    <>
      {potentialChats &&
        potentialChats.map((pchat) => (
          <div className="div" key={pchat._id}>
            <div className="contact_logo">
              <RiUserFill className="user_icon" />
            </div>
            <div className="contact_infos">
              <h3>{pchat?.name}</h3>
              {/*  <p>un aperçu du message</p> */}
            </div>
            {/*   <div className="datas">
              <div className="online_user"></div>
              <div className="date">{chatDate}</div>
              <div className="notifications">2</div>
            </div> */}
          </div>
        ))}
    </>
  );
};

export default PotentialChat;
