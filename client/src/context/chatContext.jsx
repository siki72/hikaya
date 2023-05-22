import { createContext, useEffect, useState } from "react";
export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
