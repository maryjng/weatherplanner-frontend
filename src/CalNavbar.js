import React, { useContext } from "react"
import { NavLink } from 'react-router-dom'
import UserContext from "./UserContext"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// shows a navbar with links depending on whether user is logged in or not (i.e. whether currentUser state is not null)

function CalNavbar({logout }) {
    const { currentUser } = useContext(UserContext)

    function loggedIn(){
        return(
            <>
                <Nav.Link as={NavLink} to="/calendar/view">Calendar</Nav.Link>
                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                <Nav.Link as={NavLink} to="/" onClick={logout}>Logout</Nav.Link>
            </>
            )
        }

    function loggedOut(){
        return(
            <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            </>
        )
    }

    return(
        <Navbar>
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {currentUser ? loggedIn(): loggedOut()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default CalNavbar;