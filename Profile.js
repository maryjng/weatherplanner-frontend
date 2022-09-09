import React, { useContext, useState } from "react"
import { Navigate } from 'react-router-dom'
import UserContext from "./UserContext"
import PlannerApi from "./api"

function Profile() {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const [formData, setFormData] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password:""
    })

    async function handleSubmit(e){
        e.preventDefault()
        let updatedUser = await PlannerApi.updateProfile(formData)
        setCurrentUser(updatedUser)
    }

    function handleChange(e){
        const {value, name} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    // redirect if not logged in
    // if (!currentUser) {
    //     return <Navigate to="/login" />;
    //   }

    return(
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" value={formData.email} onChange={handleChange} />

            <label>Password</label>
            <input type="text" value={formData.password} name="password" onChange={handleChange} placeholder="Confirm password to make changes" required />

            <button type="submit" onClick={handleSubmit}>Update Profile</button>
        </form>
    )
}

export default Profile;