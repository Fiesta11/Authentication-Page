import React, { useState } from "react";
import axios from "axios"
import "./reg.css"
import { useNavigate  } from "react-router-dom";

 const Register = () => {
    const navigate = useNavigate()
    const [user , setUser] =  useState({
        name : "",
        email : "",
        password : "",
        reEnterPassword : ""
    })

    const handlechange = (e) => {
        const { name , value} = e.target
         setUser({
            ...user , 
            [name] : value
        })
    }   

    const register = () => {
        const {name , email , password , reEnterPassword} = user

        if(name && email && password && (password === reEnterPassword))
        {  
            axios.post("http://localhost:9000/register" , user)
            .then(res =>{ alert(res.data.message)
               navigate('/')
        })
            
        }
        else
        {
            alert("Invalid Input")
        }

    }

    return(
       <div className="register">
        <input type = "text" name = "name" value = {user.name}placeholder="Enter Your Name" onChange={handlechange}></input>
        <input type = "text" name = "email" value = {user.email} placeholder="Enter Your Email" onChange={handlechange}></input>
        <input type = "password" name = "password" value = {user.password}placeholder="Enter Your Password" onChange={handlechange}></input>
        <input type = "password" name = "reEnterPassword" value={user.reEnterPassword} placeholder="Re-Enter Your Password" onChange={handlechange}></input>
        <div className="button" onClick={register}>Register</div>
        <div>or</div>
        <div className="button" onClick={() => navigate("/")}>Login</div>
       </div>
    )
}

export default Register