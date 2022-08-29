import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

function Register({ register }) {
    const history = useNavigate()
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email: ""
    })

    async function handleSubmit(e){
        e.preventDefault()
        await register(formData);
        setFormData({
            username:"",
            password:"",
            email: ""
        })
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
            <input type="text" name="username" value={formData.username} placeholder="username" onChange={handleChange} required/>

            <label>Password</label>
            <input type="text" name="password" value={formData.password} placeholder="password" onChange={handleChange} required />
            
            <label>Email</label>
            <input type="email" name="email" value={formData.email} placeholder="email" onChange={handleChange} required/>

            <button type="submit" onSubmit={handleSubmit}>Register</button>
        </form>
    )
}

export default Register;