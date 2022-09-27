import React, { useContext, useState } from "react"
import { Navigate } from 'react-router-dom'
import UserContext from "./UserContext"
import PlannerApi from "./api"

// for updating user's profile. Basically to update their email or password. Password field is also for verification.

function EditProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const DEFAULT_STATE = {
        username: currentUser.username,
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
                "username": currentUser.username,
                "email": formData.email,
                "password": "",
                "currPassword": formData.password
            }
            //if password is being updated, make sure new password and its confirmation field match
            if (formData.newPassword === formData.newPasswordReenter) {
                data.newPassword = formData.password
            }
            if (formData.newPassword !== formData.newPasswordReenter) {
                alert("New passwords do not match.")
                setFormData(DEFAULT_STATE)
                return <Navigate to="/profile" />
            }

            //need to pass in username params
            let updatedUser = await PlannerApi.update(currentUser.username, data)
            setCurrentUser(updatedUser)
            return <Navigate to="/profile" />
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