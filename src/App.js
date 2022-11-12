import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PlannerApi from "./api";
import HomeCalendar from "./HomeCalendar";
import moment from 'moment';
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
    //convert event for RBC to read
    let newCalAppt = convertEventForCalendar(newAppt)
    setAllEvents(allEvents => [...allEvents, newCalAppt]);
  }

  function handleEditEvent(editAppt) {
    let updatedEvents = allEvents.filter(e => e.id !== editAppt.id)
    //convert event for RBC to read
    let editedEvent = convertEventForCalendar(editAppt)
    updatedEvents.push(editedEvent)
    setAllEvents(updatedEvents)
  }

  function handleDeleteEvent(appt_id) {
    let updatedEvents = allEvents.filter(e => e.id !== appt_id)
    setAllEvents(updatedEvents)
  }

   //add back offset to db-stored UTC datetime
   function convToDateAndTime(t) {
    let d = new Date()
    const o = d.getTimezoneOffset()

    t = moment(t)
    t.subtract(o, 'm')
    return t.toString()
  }

  function convertEventForCalendar(event) {
    let { id, title, startdate, enddate, location, description, zipcode } = event
    //convert to js date object for react big calendar to work with while adding back timezone offset to database-queried UTC datetimes
    startdate = new Date(convToDateAndTime(startdate))
    enddate = new Date(convToDateAndTime(enddate))
    
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
            setAllEvents(calendarEvents)
          }
        } catch(e) {
          console.error(Error(e.message ?? e));
          //if an error occurs, the user will have to login again
          setCurrentUser("")
        }
      }
    }
    getCurrentUser()
  }, [token, currentUser]
  );

  async function login(data) {
    try {
      let token = await PlannerApi.login(data)
      setToken(token);
    } catch(e) {
      alert("Login unsuccessful.")
      console.error(Error(e.message ?? e));
    }
  }

  //registers user. User still needs to log in after.
  async function register(data) {
    await PlannerApi.register(data)
  }

  function logout() {
      setCurrentUser(null);
      setToken(null);
  }

  //going to /calendar/view will redirect to login if user is not logged in. Otherwise, HomeCalendar is rendered.

  return (
    <>
    <UserContext.Provider value={{currentUser, token }}>
      <BrowserRouter>
        <CalNavbar login={login} logout={logout} register={register} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar">
            <Route path="/calendar/view" element={ currentUser ? 
            <HomeCalendar allEvents={allEvents} handleEditEvent={handleEditEvent} handleDeleteEvent={handleDeleteEvent} handleAddEvent={handleAddEvent} /> : <Navigate to="/login" /> } />
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