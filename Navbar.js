import React, { useContext } from "react"
import { BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import UserContext from "./UserContext"
import Register from "./Register"
import Profile from "./Profile"
import Login from "./Login"


function Navbar({login, logout, register }) {
    const { currentUser } = useContext(UserContext)

    function loggedIn(){
        return(
            <nav>
                <Link to="/">Home</Link> 

                <Link to="/profile"> | Profile</Link>
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
            <BrowserRouter>
                {currentUser ? loggedIn(): loggedOut()}
                <Routes>
                    <Route path="/login" element={<Login login={login} />} />
                    <Route path="/register" element={<Register register={register} />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default Navbar;