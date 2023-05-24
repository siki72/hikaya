import { createContext, useCallback, useEffect, useState } from "react";
export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [recepient, setRecepient] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      setMessagesLoading(true);
      setMessagesError(null);
      try {
        if (currentChat) {
          const response = await fetch(
            `${import.meta.env.VITE_URL_API_MESSAGES}${currentChat._id}`
          );
          if (response.status === 200) {
            const data = await response.json();
            setMessages(data);
          }
          if (response.error) {
            return setMessagesError(response);
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
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [userChats]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const updateRecepient = useCallback((data) => {
    setRecepient(data);
  }, []);
  const updateMessages = useCallback((data) => {
    setMessages((prev) => [...prev, data]);
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
