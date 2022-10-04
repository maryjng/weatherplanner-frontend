import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { STORETOKEN } from "../App";

function Login({ login }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    function handleSubmit(e){
        e.preventDefault()
        let res = login(formData)
        setFormData({
            username:"",
            password:""
        })
        //redirect to calendar
        navigate("/calendar/view", { replace: true });
    }

    function handleChange(e){
        const {value, name} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} placeholder="username" onChange={handleChange} />

            <label>Password</label>
            <input type="password" name="password" value={formData.password} placeholder="password" onChange={handleChange} />

            <button type="submit" onSubmit={handleSubmit}>Login</button>
        </form>
    )
}

export default Login;