import React, { useContext, useState } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { ChatContext } from "../context/chatContext.jsx";
import { AuthContext } from "../context/userContext";
import { unreadNotifications } from "../../utils/function.js";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { notification, userChats, allUsers } = useContext(ChatContext);
  const unRead = unreadNotifications(notification);
  console.log("all", allUsers);
  const modifiedNotif = notification.map((n) => {
    const sender = allUsers.find((u) => u._id === n.senderId);
    console.log(sender, "sender");
    return {
      ...n,
      senderName: sender?.name,
    };
  });
  console.log("unread", unRead);
  console.log("notif with name ", modifiedNotif);

  return (
    <div className="msg_notifications" onClick={() => setIsOpen(!isOpen)}>
      <div className={unRead?.length ? "icon icon-notif" : "icon"}>
        <RiMessage2Fill />
        {unRead?.length === 0 ? null : (
          <span className="count">{unRead.length}</span>
        )}
        {isOpen && (
          <div className="notification_content">
            <h3>notification</h3>
            <span>Mark all as read</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
