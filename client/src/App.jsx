import Chat from "./pages/Chat.jsx";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/userContext.jsx";
import { ChatContextProvider } from "./context/chatContext.jsx";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <ChatContextProvider user={user}>
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/register" element={user ? <Chat /> : <Register />} />
          <Route path="/login" element={user ? <Chat /> : <Login />} />
          <Route path="*" element={<Chat />} />
        </Routes>
      </ChatContextProvider>
    </>
  );
}

export default App;
