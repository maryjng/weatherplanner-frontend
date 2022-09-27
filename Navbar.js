import React, { useContext } from "react"
import { BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import UserContext from "./UserContext"
import Register from "./Register"
import Profile from "./Profile"
import Login from "./Login"
import NewApptForm from "./NewApptForm"

// shows a navbar with links depending on whether user is logged in or not (i.e. whether currentUser state is not null)

function Navbar({logout }) {
    const { currentUser } = useContext(UserContext)

    function loggedIn(){
        return(
            <nav>
                <Link to="/">Home</Link> 

                <Link to="/profile"> | Profile</Link>
                <Link to="/add"> | Add Appointment </Link>
                <Link to="/" onClick={logout}> | Logout</Link>
            </nav>
        )
    }

    function loggedOut(){
        return(
            <nav>
                <Link to="/">Home</Link> 

                <Link to="/login"> | Login</Link>
                <Link to="/register"> | Register</Link>
            </nav>
        )
    }

    return(
        <div>
            {currentUser ? loggedIn(): loggedOut()}
        </div>
    )

}

export default Navbar;