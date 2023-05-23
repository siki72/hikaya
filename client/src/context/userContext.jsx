import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!user) {
          const response = await fetch(import.meta.env.VITE_URL_PROFILE, {
            method: "GET",
            credentials: "include",
          });
          if (response.status === 200) {
            const data = await response.json();
            setUser(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
