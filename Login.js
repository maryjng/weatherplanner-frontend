import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { STORETOKEN } from "../App";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
        <Form>
            <Form.Group classname="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>

            <Button onClick={handleSubmit} variant="primary" type="submit">
                Login
            </Button>

        </Form>
    )
}

export default Login;