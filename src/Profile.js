import EditProfileForm from "./forms/EditProfileForm";
import { useContext } from "react"
import UserContext from "./UserContext"


function Profile() {
    const { currentUser } = useContext(UserContext)

    return(
        <EditProfileForm />
    )

}

export default Profile;