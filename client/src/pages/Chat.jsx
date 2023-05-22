import React, { useContext } from "react";
import { AuthContext } from "../context/userContext.jsx";

const Chat = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>cha</h1>
    </div>
  );
};

export default Chat;
