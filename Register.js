import React, { useState } from "react"
import { navigate } from "react-big-calendar/lib/utils/constants";
import { useNavigate } from "react-router-dom";

function Register({ register }) {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email: "",
        confirmPassword: ""
    })

    async function handleSubmit(e){
        e.preventDefault()
        if (formData.password === formData.confirmPassword) {
            await register(formData);
            setFormData({
                username:"",
                password:"",
                email: ""
            })
            //redirect to "/"
            navigate("/", { replace: true });
        } else {
            alert("Passwords do not match.")
            setFormData({
                username:"",
                password:"",
                email: "",
                confirmPassword: ""
            })
        }
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

            <label>Email</label>
            <input type="email" name="email" value={formData.email} placeholder="email" onChange={handleChange} required/>

            <label>Password</label>
            <input type="password" name="password" value={formData.password} placeholder="password" onChange={handleChange} required />
            
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} placeholder="reenter password" onChange={handleChange} required />

            <button type="submit" onSubmit={handleSubmit}>Register</button>
        </form>
    )
}

export default Register;