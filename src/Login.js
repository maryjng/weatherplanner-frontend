import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { STORETOKEN } from "./App";

function Login({ login }) {
    const history = useNavigate()
    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    async function handleSubmit(e){
        e.preventDefault()
        await login(formData.username, formData.password)
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
            <input type="text" name="password" value={formData.password} placeholder="password" onChange={handleChange} />

            <button type="submit" onSubmit={handleSubmit}>Login</button>
        </form>
    )
}

export default Login;