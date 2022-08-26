import "./register.css"

import React, { useRef, useState } from 'react'
import Room from "@mui/icons-material/Room"
import axios from "axios"
import { Cancel } from "@mui/icons-material"



export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) =>{ 
        e.preventDefault()
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try{
            await axios.post("/users/register", newUser)
            setError(false)
            setSuccess(true)
        } catch(err){
            setError(true)
        }
    }
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        Adlers
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef}/>
        <button className="registerBtn">Register</button>
        {success && (
        <span className="success"> Voila !!! Login Now</span>
        )}
        {error && (
        <span className="failure"> Achh !!! Something went wrong</span>
        )}

      </form>
      <Cancel className="registerCancel" onClick={() => setShowRegister(false)} />
    </div>
  )
}
