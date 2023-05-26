import { createContext, useCallback, useEffect, useState } from "react";
export const ChatContext = createContext();
import { io } from "socket.io-client";

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [recepient, setRecepient] = useState(null);
  const [socket, SetSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notification, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3333");
    SetSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // let know server we are online
  useEffect(() => {
    if (socket && user) {
      socket.emit("addNewUser", user?.id);
    }
    socket?.on("onlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket?.off("onlineUsers");
    };
  }, [socket, user]);

  // send a messag
  useEffect(() => {
    if (socket && user) {
      const recepientId = recepient?._id;
      socket.emit("sendMessage", { ...newMessage, recepientId });
    }
  }, [newMessage]);

  // receive message & NOTIF
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (resp) => {
      if (currentChat?._id !== resp.chatId) return;
      setMessages((prev) => [...prev, resp]);
    });
    socket.on("getNotifications", (resp) => {
      const isChatOpen = currentChat?.members.some(
        (id) => id === resp.senderId
      );
      if (isChatOpen) {
        setNotifications((prev) => [...prev, { ...resp, isRead: true }]);
      } else {
        setNotifications((prev) => [...prev, resp]);
      }
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotifications");
    };
  }, [socket, currentChat, messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const response = await fetch(
            `${import.meta.env.VITE_URL_API_MESSAGES}${currentChat._id}`
          );
          if (response.status === 200) {
            const data = await response.json();
            setMessages(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (userChats) {
          const response = await fetch(import.meta.env.VITE_URL_FIND_USERS);
          if (response.status === 200) {
            const data = await response.json();
            const pChats = data.filter((u) => {
              let ischatCreated = false;
              if (user?.id === u._id) return false;
              if (userChats) {
                ischatCreated = userChats?.some((chat) => {
                  return chat.members[0] === u._id || chat.members[1] === u._id;
                });
              }
              return !ischatCreated;
            });
            setPotentialChats(pChats);
            setAllUsers(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [userChats, user?.id]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const updateRecepient = useCallback((data) => {
    setRecepient(data);
  }, []);
  const updateMessages = useCallback((data) => {
    setMessages((prev) => [...prev, data]);
    setNewMessage(data);
  }, []);

  useEffect(() => {
    const getUsersChats = async () => {
      try {
        if (user) {
          const response = await fetch(
            `${import.meta.env.VITE_URL_CHATS}/${user.id}`
          );
          if (response.status === 200) {
            const data = await response.json();
            setUserChats(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsersChats();
  }, [user]);

  const markAllNotifAsRead = useCallback((notifications) => {
    const mNotifs = notifications.map((n) => {
      return { ...n, isRead: true };
    });
    setNotifications(mNotifs);
  }, []);

  const updateNotifications = useCallback((notif) => {
    console.log("notif", notif);
    setNotifications(notif);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        setUserChats,
        potentialChats,
        updateCurrentChat,
        messages,
        currentChat,
        updateRecepient,
        recepient,
        updateMessages,
        onlineUsers,
        notification,
        allUsers,
        markAllNotifAsRead,
        updateNotifications,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
