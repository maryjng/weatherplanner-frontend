import React, { useState } from "react"
import { navigate } from "react-big-calendar/lib/utils/constants";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Register({ register }) {
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email: "",
        confirmPassword: ""
    })

    async function handleSubmit(e){
        e.preventDefault()
        try {
            //check if passwords match. If yes then delete confirmPassword before sending request
            if (formData.password !== formData.confirmPassword) {
                throw new Error("Passwords do not match")
            } 
            delete formData.confirmPassword

            await register(formData);
            setFormData({
                username:"",
                password:"",
                email: ""
            })

            //redirect to login
            navigate("/login", { replace: true });

        } catch (error) {
            console.error(error)
            alert("Registration unsuccessful.")
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
        <div style={{marginLeft: "5%", width: "20%"}}>
        <h2>Register</h2>
        <Form>
            <Form.Group classname="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange}/>
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicPasswordReenter">
                <Form.Label>Reenter Password</Form.Label>
                <Form.Control type="password" placeholder="Reenter password to confirm" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
            </Form.Group>

            <Button onClick={handleSubmit} variant="primary" type="submit" style={{marginTop: "10px"}}>
                Register
            </Button>

        </Form>
        </div>
    )
}

export default Register;