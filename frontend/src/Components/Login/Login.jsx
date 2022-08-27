import "./login.css"

import React, { useRef, useState } from 'react'
import Room from "@mui/icons-material/Room"
import axios from "axios"
import { Cancel } from "@mui/icons-material"



export default function Login({setShowLogin, myStorage, setCurrentUser}) {
    const [error, setError] = useState(false)

    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) =>{ 
        e.preventDefault()
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }

        try{
            const res = await axios.post("/users/login", user)
            setError(false)
            myStorage.setItem("user", res.data.username)
            setCurrentUser(res.data.username)
            setShowLogin(false)
        } catch(err){
            setError(true)
        }
    }
  return (
    <div className="loginContainer">
      <div className="logo">
        <Room />
        Adlers
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="password" placeholder="Password" ref={passwordRef}/>
        <button className="loginBtn">Login</button>
    
        {error && (
        <span className="failure"> Achh !!! Something went wrong</span>
        )}

      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  )
}
