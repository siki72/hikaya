
import { FormEvent, useRef } from "react";
const Login = () => {
    const formRef = useRef(null)
    const spanRef = useRef<HTMLSpanElement>(null)
    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        try{
            e.preventDefault()
            if (formRef.current){
                const data:FormData = new FormData(formRef.current)
                const email: string | null = data.get("email") as string
                const password: string | null = data.get("password") as string
                const newUser = {
                    email,
                    password
                }
                const sendData = await fetch("http://localhost:3000/users/login",{
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                })
                const response = await sendData.json()
                if (spanRef.current && typeof response === "string"){
                    console.log(typeof response)
                    spanRef.current.innerText = response
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    const initialiseError = () =>{
        if (spanRef.current){
            spanRef.current.innerText = ""
        }
    }
    return (
        <div className='register_container'>
        <section className='welcom'>
             <h1>Welcom to hikaya</h1>
             <p>Your private message app</p>
        </section>
        <form action=""  onSubmit={(e)=> handleSubmit(e)} ref={formRef} onClick={initialiseError}
        >
             <h2>Login</h2>
             <input type="email" placeholder='Email' name='email'required={true}/>
             <input type="password" placeholder='Password' name='password' required={true}/>
             <span className="hiddenErroMessage" ref={spanRef}></span>
             <input type="submit" value="Login" />
        </form>
     </div>
    );
};

export default Login;