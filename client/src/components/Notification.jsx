import React, { useContext, useState } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { ChatContext } from "../context/chatContext.jsx";
import { AuthContext } from "../context/userContext";
import { unreadNotifications } from "../../utils/function.js";
import moment from "moment";
const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notification,
    allUsers,
    updateCurrentChat,
    markAllNotifAsRead,

    updateNotifications,
  } = useContext(ChatContext);
  const unRead = unreadNotifications(notification);

  let modifiedNotif = notification.map((n) => {
    const sender = allUsers.find((u) => u._id === n.senderId);

    return {
      ...n,
      senderName: sender?.name,
    };
  });

  const handleSelecChat = async (secondId, n) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_GET_CHAT}${user.id}/${secondId}`
      );
      if (response.status === 200) {
        const chat = await response.json();
        updateCurrentChat(chat[0]);
        const a = modifiedNotif.map((el) => {
          if (secondId === el.senderId) {
            return { ...n, isRead: true };
          } else {
            return el;
          }
        });

        updateNotifications(a);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="msg_notifications">
      <div className={unRead?.length ? "icon icon-notif" : "icon"}>
        <RiMessage2Fill onClick={() => setIsOpen(!isOpen)} />
        {unRead?.length === 0 ? null : (
          <span className="count">{unRead.length}</span>
        )}
        {isOpen && (
          <>
            <div className="notification_content">
              <h3>Notifications</h3>
              <span
                className="all"
                onClick={() => markAllNotifAsRead(notification)}
              >
                Mark all as read
              </span>
              <div className="mark"></div>
              {modifiedNotif?.length === 0 ? (
                <span>No notification</span>
              ) : null}
              {modifiedNotif &&
                modifiedNotif.map((n, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        n.isRead ? "notification" : "notification not-read"
                      }
                    >
                      <span
                        onClick={() => handleSelecChat(n.senderId, n)}
                      >{`${n.senderName} sent you a new message`}</span>
                      <span>{moment(n.date).calendar()}</span>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notification;
