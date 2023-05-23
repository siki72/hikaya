import React, { useEffect, useState } from "react";
import { RiUserFill } from "react-icons/ri";
const SingleChat = ({ singleCHat, user }) => {
  const [recepient, setRecepient] = useState(null);
  const recepiedId = singleCHat?.members.find((id) => id !== user?.id);
  const chatDate = singleCHat?.createdAt.split("T", 1);
  useEffect(() => {
    const fetchRecepientUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_FIND_USER}/${recepiedId}`
        );
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setRecepient(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecepientUser();
  }, [user]);

  return (
    <>
      <div className="contact_logo">
        <RiUserFill className="user_icon" />
      </div>
      <div className="contact_infos">
        <h3>{recepient?.name}</h3>
        <p>un aperçu du message</p>
      </div>
      <div className="datas">
        <div className="online_user"></div>
        <div className="date">{chatDate}</div>
        <div className="notifications">2</div>
      </div>
    </>
  );
};

export default SingleChat;
