import React from 'react';
import { FormEvent, useRef } from "react";
const Login = () => {
    const formRef = useRef(null)
    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        try{
            e.preventDefault()
            if (formRef.current){
                const data:FormData = new FormData(formRef.current)
                const email: string | null = data.get("email") as string
                const passwod: string | null = data.get("password") as string
                const newUser = {
                    email,
                    passwod
                }

                const response = await fetch("http://localhost:3000/users/register",{
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                })

                console.log(response)



            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='register_container'>
        <section className='welcom'>
             <h1>Welcom to hikaya</h1>
             <p>Your private message app</p>
        </section>
        <form action=""  onSubmit={(e)=> handleSubmit(e)} ref={formRef}
        >
             <h2>Login</h2>
             <input type="password" placeholder='Password' name='password' required={true}/>
             <input type="email" placeholder='Email' name='email'required={true}/>
             <input type="submit" value="Login" />
        </form>
     </div>
    );
};

export default Login;