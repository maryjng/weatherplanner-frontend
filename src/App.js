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
  // displayForecast is meant to display forecast data received either from submitting the ZipcodeForm or from clicking an event (appt) in the Calendar component and fetching the saved forecast from db
  const [displayForecast, setDisplayForecast] = useState([
      {
        "date": "2022-09-14",
        "max_temp": 78.5,
        "min_temp": 65.5,
        "weather": "thunderstorm"
      },
      {
        "date": "2022-09-15",
        "max_temp": 78.3,
        "min_temp": 58.7,
        "weather": "thunderstorm"
      },
      {
        "date": "2022-09-16",
        "max_temp": 69.5,
        "min_temp": 58.1,
        "weather": "fog"
      },
      {
        "date": "2022-09-17",
        "max_temp": 75.3,
        "min_temp": 47.5,
        "weather": "cloudy"
      },
      {
        "date": "2022-09-18",
        "max_temp": 78.7,
        "min_temp": 56.8,
        "weather": "cloudy"
      },
       {
        "date": "2022-09-19",
        "max_temp": 82.1,
        "min_temp": 60.9,
        "weather": "drizzle"
      },
      {
        "date": "2022-09-20",
        "max_temp": 82.1,
        "min_temp": 62.7,
        "weather": "sunny"
      }
  ])

  //change appointment keys of dateStart and dateEnd to start and end for Calendar event use
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

  function handleAddEvent(newAppt) {
      setAllEvents(allEvents => [...allEvents, newAppt]);
  }

  // upon click of event, fetch stored forecast and display it through ForecastCalendar component
  async function handleSelected(event) {
    let appt = await PlannerApi.getAppt(event.id)
    console.log(appt)
    if (appt.forecast) {
      setDisplayForecast(appt.forecast)
    }
  }

  // function handleZipcodeZeroes(zipcode) {
  //   if (zipcode[0] != 0) return {"zeroes": 0, "zipcode": zipcode}
  //   if (zipcode[1] == 0) return {"zeroes": 1, "zipcode": zipcode.slice(2)}
  //   return {"zeroes": 2, "zipcode": zipcode.slice(1)}
  // }

  //need {zipcode, tempUnit=fahrenheit} 
  async function getForecast(data) {
    //get rid of leading 0s
    //*** WILL NEED TO IMPLEMENT AN ACTUAL FIX FOR STORING ZIPCODES WITH LEADING 0s INTO DB*/
    data["zipcode"] = parseInt(data["zipcode"])
    console.log(`ForecastCalendar data: ${JSON.stringify(data)}`)
    let results = await PlannerApi.getForecast(data)
    console.log(`Results: ${results}`)
    let resArr = results.values()
    setDisplayForecast(resArr) 
    console.log(resArr)
    console.log(displayForecast)
  }

  //upon token change, set currentUser state and setAllEvents if any appointments
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

          // organize and set state for user's appointments, if any
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

        <ForecastCalendar displayForecast={displayForecast} setDisplayForecast={setDisplayForecast} getForecast={getForecast} />

        <NewApptForm handleAddEvent={handleAddEvent} />
        <h1>Calendar</h1>

        <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} onSelectEvent={handleSelected} />
      </div>
    </UserContext.Provider>

  );
}

export default App