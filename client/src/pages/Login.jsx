import { useContext, useRef } from "react";
import { AuthContext } from "../context/userContext.jsx";
const Login = () => {
  const formRef = useRef(null);
  const spanRef = useRef(null);
  const { setUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formRef.current) {
        const data = new FormData(formRef.current);
        const email = data.get("email");
        const password = data.get("password");
        const newUser = {
          email,
          password,
        };
        const sendData = await fetch(import.meta.env.VITE_URL_LOGIN, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        const response = await sendData.json();
        setUser(response);
        if (spanRef.current && typeof response === "string") {
          console.log(typeof response);
          spanRef.current.innerText = response;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialiseError = () => {
    if (spanRef.current) {
      spanRef.current.innerText = "";
    }
  };
  return (
    <div className="register_container">
      <section className="welcom">
        <h1>Welcom to hikaya</h1>
        <p>Your private message app</p>
      </section>
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        ref={formRef}
        onClick={initialiseError}
      >
        <h2>Login</h2>
        <input type="email" placeholder="Email" name="email" required={true} />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required={true}
        />
        <span className="hiddenErroMessage" ref={spanRef}></span>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
