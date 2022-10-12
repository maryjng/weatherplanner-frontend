import React, { useState } from "react"
import { navigate } from "react-big-calendar/lib/utils/constants";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
        <>
        <h2>Register</h2>
        <Form>
            <Form.Group classname="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange}/>
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicPasswordReenter">
                <Form.Label>Reenter Password</Form.Label>
                <Form.Control type="password" placeholder="Reenter password to confirm" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
            </Form.Group>

            <Button onClick={handleSubmit} variant="primary" type="submit">
                Register
            </Button>

        </Form>
        </>
    )
}

export default Register;