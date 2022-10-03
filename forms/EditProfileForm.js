import React, { useContext, useState } from "react"
import { Navigate } from 'react-router-dom'
import UserContext from "../UserContext"
import PlannerApi from "../api"

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

    async function handleSubmit(e){
        e.preventDefault()
        try {
            let data = {
                "currPassword": formData.currPassword
            }
            //if password is being updated, make sure new password and its confirmation field match
            if (formData.newPassword.length >= 5 && formData.newPassword === formData.newPasswordReenter) {
                data.password = formData.newPassword
            }
            if (formData.email.length >= 6) {
                data.email = formData.email
            }

            await PlannerApi.update(currentUser, data)
            setFormData(DEFAULT_STATE)

        } catch(e) {
            console.log(e)
        }
    }

    function handleChange(e){
        const {value, name} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    // redirect if not logged in
    if (!currentUser) {
        return <Navigate to="/login" />;
      }

    return(
        <form onSubmit={handleSubmit}>
            <label>New Email: </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <label>New Password: </label>
            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />

            <label>Confirm New Password</label>
            <input type="password" name="newPasswordReenter" value={formData.newPasswordReenter} onChange={handleChange} />

            <label>Confirm Password to Make Changes: </label>
            <input type="password" value={formData.currPassword} name="currPassword" onChange={handleChange} required />

            <button type="submit" onClick={handleSubmit}>Update Profile</button>
        </form>
    )
}

export default EditProfileForm;