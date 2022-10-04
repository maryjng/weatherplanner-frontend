import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlannerApi from "./api";
import HomeCalendar from "./HomeCalendar";
import AddApptCalendar from "./AddApptCalendar";
import Home from "./Home";
import CalNavbar from "./CalNavbar"
import UserContext from "./UserContext"
import jwt from "jsonwebtoken"
import useLocalStorageState from "./hooks/useLocalStorageState"
import Register from "./forms/Register"
import Profile from "./Profile"
import Login from "./forms/Login"
import "./App.css";

export const STORETOKEN = "weatherplanner-token";

function App() {
  const [token, setToken] = useLocalStorageState(STORETOKEN)
  const [currentUser, setCurrentUser] = useState("");
  const [allEvents, setAllEvents] = useState("")

  function handleAddEvent(newAppt) {
      setAllEvents(allEvents => [...allEvents, newAppt]);
  }

  function handleEditEvent(editAppt) {
    console.log(allEvents)
    let updatedEvents = allEvents.filter(e => e.id !== editAppt.id)
    console.log(updatedEvents)
    updatedEvents.push(editAppt)
    console.log(updatedEvents)
    setAllEvents(updatedEvents)
  }

  function handleDeleteEvent(appt_id) {
    let updatedEvents = allEvents.filter(e => e.id !== appt_id)
    setAllEvents(updatedEvents)
  }

  function convertEventForCalendar(event) {
    let { id, title, startdate, enddate, location, description, zipcode } = event
    //convert to js date object for react big calendar to work with
    startdate = new Date(startdate)
    enddate = new Date(enddate)

    let calendarEvent = {
      "id": id,
      "title": title,
      "start": startdate,
      "end": enddate,
      "location": location,
      "description": description,
      "zipcode": zipcode
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
  }, [token, currentUser]
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
        <CalNavbar login={login} logout={logout} register={register} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar">
            <Route path="/calendar/view" element={<HomeCalendar allEvents={allEvents} handleEditEvent={handleEditEvent} handleDeleteEvent={handleDeleteEvent} />} />
            <Route path="/calendar/add" element={<AddApptCalendar handleAddEvent={handleAddEvent} allEvents={allEvents}/>} />
          </Route>

          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register register={register} />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App