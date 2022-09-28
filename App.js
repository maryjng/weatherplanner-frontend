import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import PlannerApi from "./api";
import HomeCalendar from "./HomeCalendar";
import AddApptCalendar from "./AddApptCalendar";
import Navbar from "./Navbar"
import UserContext from "./UserContext"
import jwt from "jsonwebtoken"
import useLocalStorageState from "./hooks/useLocalStorageState"
import Register from "./Register"
import Profile from "./Profile"
import Login from "./Login"
import "./App.css";

export const STORETOKEN = "weatherplanner-token";

function App() {
  const [token, setToken] = useLocalStorageState(STORETOKEN)
  const [currentUser, setCurrentUser] = useState("");
  const [allEvents, setAllEvents] = useState("")

  function handleAddEvent(newAppt) {
      setAllEvents(allEvents => [...allEvents, newAppt]);
  }

  function convertEventForCalendar(event) {
    let { id, title, startdate, enddate, location, description } = event
    let calendarEvent = {
      "id": id,
      "title": title,
      "start": startdate,
      "end": enddate,
      "location": location,
      "description": description
    }
    return calendarEvent;
  }

  //upon token change, set currentUser state and setAllEvents if any appointments
  useEffect(() => {
      async function getCurrentUser() {
        if (token) {
        try {
          PlannerApi.token = token;
          let { username } = jwt.decode(token)
          let res = await PlannerApi.getUser(username)
          setCurrentUser(res.username)

          // organize and set state for user's appointments, if any
          if (res.appointments.length > 0) {
            let calendarEvents = res.appointments.map(function(e) {
              return convertEventForCalendar(e)
            })
            console.log(calendarEvents)
            setAllEvents(calendarEvents)
        }
        } catch (error) {
          console.log(error.stack)
          //if an error occurs, the user will have to login again
          setCurrentUser("")
        }
      }
    }
    getCurrentUser()
  }, [token]
  );

  async function login(data) {
    let token = await PlannerApi.login(data)
    setToken(token);
  }

  async function register(data) {
    let token = await PlannerApi.register(data)
    setToken(token);
  }

  function logout() {
      setCurrentUser(null);
      setToken(null);
    }

  return (
    <>
    <UserContext.Provider value={{currentUser, token}}>
      <BrowserRouter>
        <Navbar login={login} logout={logout} register={register} />
        <Routes>
          <Route path="/" element={<HomeCalendar allEvents={allEvents} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register register={register} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add" element={<AddApptCalendar handleAddEvent={handleAddEvent} allEvents={allEvents}/>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App