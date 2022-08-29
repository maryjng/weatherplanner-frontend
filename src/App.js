import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
// import { render } from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import NewApptForm from "./NewApptForm"
import PlannerApi from "./api"
import Navbar from "./Navbar"
import UserContext from "./UserContext"
import jwt from "jsonwebtoken"
import useLocalStorageState from "./hooks/useLocalStorageState"
// import ForecastCalendar from "./ForecastCalendar"
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
  const [currentUser, setCurrentUser] = useState(null);
  const [allEvents, setAllEvents] = useState([]);

  function handleAddEvent(newAppt) {
      setAllEvents([...allEvents, newAppt]);
  }

  //upon token change, set currentUser allEvents states
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token)
          let currentUser = await PlannerApi.getUser(username)
          setCurrentUser(currentUser)
          setAllEvents(currentUser.appointments)
        } catch (error) {
          console.log(error.stack)
          setCurrentUser(null)
        }
      }
    }}, [token]
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
    <UserContext.Provider value={{currentUser, setCurrentUser, allEvents, setAllEvents, token, setToken}}>
      <div className="App">
        <Navbar login={login} logout={logout} register={register} />

        <NewApptForm handleAddEvent={handleAddEvent}/>

          <h1>Calendar</h1>

          <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
      </div>
    </UserContext.Provider>

  );
}

export default App