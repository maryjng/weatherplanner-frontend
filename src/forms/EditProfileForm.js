import React, { useContext, useState } from "react"
import UserContext from "../UserContext"
import PlannerApi from "../api"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

// for updating user's profile. Basically to update their email or password. Password field is also for verification.

function EditProfileForm() {
    const { currentUser } = useContext(UserContext)

    const DEFAULT_STATE = {
        username: currentUser,
        email: "",
        newPassword: "",
        newPasswordReenter: "",
        currPassword:""
    }

    const [formData, setFormData] = useState(DEFAULT_STATE)

    //sending patch request with body {currPassword, password, email }
    async function handleSubmit(e){
        e.preventDefault()
        try {
            let data = {
                "username": currentUser,
                "currPassword": formData.currPassword
            }
            //if password is being updated, make sure new password and its confirmation field match
            if (formData.newPassword.length >= 5 && formData.newPassword === formData.newPasswordReenter) {
                data.password = formData.newPassword
            }
            if (formData.email.length >= 6) {
                data.email = formData.email
            } 

            await PlannerApi.update(data)
            setFormData(DEFAULT_STATE)

        } catch(e) {
            console.log(e)
            alert("Update failed. Please check inputs.")
            setFormData(DEFAULT_STATE)
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
        <div style={{marginLeft: "5%"}}>
            <h2>Editing {currentUser}'s Profile</h2>
            <Form style={{width: "20%"}}>
                <Form.Group classname="mb-3" controlId="formBasicEmail">
                    <Form.Label>New Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter new email" name="email" value={formData.email} onChange={handleChange}/>
                </Form.Group>

                <Form.Group classname="mb-3" controlId="formBasicNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </Form.Group>

                <Form.Group classname="mb-3" controlId="formBasicNewPasswordReenter">
                    <Form.Label>Reenter New Password</Form.Label>
                    <Form.Control type="password" placeholder="Reenter new password" name="newPasswordReenter" value={formData.newPasswordReenter} onChange={handleChange} />
                </Form.Group>

                <Form.Group classname="mb-3" controlId="formcurrPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter current password to confirm" name="currPassword" value={formData.currPassword} onChange={handleChange}/>
                </Form.Group>

                <Button onClick={handleSubmit} variant="primary" type="submit" style={{marginTop: "10px"}}>
                    Update Profile
                </Button>

            </Form>
        </div>
    )
}

export default EditProfileForm;