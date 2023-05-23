import { createContext, useEffect, useState } from "react";
export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [potentialChats, setPotentialChats] = useState([]);

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
