import { useContext } from "react";
import { useRef } from "react";
import { AuthContext } from "../context/userContext.jsx";

const Register = () => {
  const formRef = useRef(null);
  const spanRef = useRef(null);
  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formRef.current) {
        const data = new FormData(formRef.current);
        const name = data.get("name");
        const email = data.get("email");
        const password = data.get("password");
        const newUser = {
          name,
          email,
          password,
        };

        const sendData = await fetch(import.meta.env.VITE_URL_REGISTER, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        const response = await sendData.json();
        if (spanRef.current && typeof response === "string") {
          spanRef.current.innerText = response;
        }
        console.log(response);
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
        <h2>Register</h2>
        <input type="text" placeholder="Name" name="name" required={true} />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required={true}
        />
        <input type="email" placeholder="Email" name="email" required={true} />
        <span className="hiddenErroMessage" ref={spanRef}></span>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
