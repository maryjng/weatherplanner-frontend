import EditProfileForm from "./forms/EditProfileForm";
import { useContext } from "react"
import { Navigate } from 'react-router-dom'
import UserContext from "./UserContext"


function Profile() {
    const { currentUser } = useContext(UserContext)

    // redirect if not logged in
    if (!currentUser) {
        return <Navigate to="/login" />;
      }

    return(
        <EditProfileForm />
    )

}

export default Profile;