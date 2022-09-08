import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect, useCallback } from "react";
// import { render } from "react-dom";
import { Router, Routes, Route } from "react-router-dom";
import NewApptForm from "./NewApptForm"
import PlannerApi from "./api"
import Navbar from "./Navbar"
import UserContext from "./UserContext"
import jwt from "jsonwebtoken"
import useLocalStorageState from "./hooks/useLocalStorageState"
import ForecastCalendar from "./ForecastCalendar"
import Register from "./Register"
import Profile from "./Profile"
import Login from "./Login"
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import { previousSaturday } from "date-fns";

export const STORETOKEN = "weatherplanner-token";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function App() {
  const [token, setToken] = useLocalStorageState(STORETOKEN)
  const [currentUser, setCurrentUser] = useState("");
  const [allEvents, setAllEvents] = useState([
    {
      title: "Birthday Party",
      start: new Date('2022, 9, 11, 08:15:00'),
      end: new Date('2022, 9, 12, 00:00:00')
    },
    {
      title: "LAN party",
      start: new Date('2022, 9, 15, 11:00:00'),
      end: new Date('2022, 9, 16, 15:00:00')
    }
  ]);

  //change appointment keys of dateStart and dateEnd to start and end for Calendar event use
  function convertEventForCalendar(event) {
    let { title, dateStart, dateEnd, location, description } = event
    let calendarEvent = {
      "title": title,
      "start": dateStart,
      "end": dateEnd,
      "location": location,
      "description": description
    }
    return calendarEvent;
  }

  function handleAddEvent(newAppt) {
      setAllEvents(allEvents => [...allEvents, newAppt]);
  }

  //upon token change, set currentUser state
  useEffect(() => {
      async function getCurrentUser() {
        console.log(token)
        if (token) {
        try {
          PlannerApi.token = token;
          let { username } = jwt.decode(token)
          let res = await PlannerApi.getUser(username)
          setCurrentUser(res.username)

          console.log(res.appointments)

          if (res.appointments.length > 0) {
            let calendarEvents = res.appointments.map(function(e) {
              return convertEventForCalendar(e)
            })
            console.log(calendarEvents)
            setAllEvents(calendarEvents)
        }

          console.log(currentUser)
        } catch (error) {
          console.log(error.stack)
          setCurrentUser("")
        }
      }
    }
    getCurrentUser()
  }, [token]
  );

  function handleSelected(event) {
    let appt = PlannerApi.getAppt(event.id) 
    //populate the forecast calendar with appt forecast info for each day

  }

  async function login(data) {
    let token = await PlannerApi.login(data)
    setToken(token);
    console.log(token)
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
    <UserContext.Provider value={{currentUser, token}}>
      <div>
        <Navbar login={login} logout={logout} register={register} />

        <ForecastCalendar />

        <NewApptForm handleAddEvent={handleAddEvent} />
        <h1>Calendar</h1>

        <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} onSelectEvent={handleSelected} />
      </div>
    </UserContext.Provider>

  );
}

export default App