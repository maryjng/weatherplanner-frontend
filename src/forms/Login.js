import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { STORETOKEN } from "../App";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login({ login }) {
    const { currentUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    function handleSubmit(e){
        e.preventDefault()
        login(formData)

        //redirect to calendar page if successful
        // if (currentUser) {
        //     navigate("/calendar/view", { replace: true });
        // } else { 
        //     //if not then back to login
        //     navigate("/login", { replace: true })
        // }

        setFormData({
            username:"",
            password:""
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
        <div style={{marginLeft: "5%", width: "20%"}}>
            <h2>Login</h2>
            <Form>
                <Form.Group classname="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                </Form.Group>

                <Form.Group classname="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                </Form.Group>

                <Button onClick={handleSubmit} variant="primary" type="submit" style={{marginTop: "10px"}}>
                    Login
                </Button>

            </Form>
        </div>
    )
}

export default Login;