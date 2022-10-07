import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import UserContext from "./UserContext"
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

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



function ShowCalendar({ allEvents, handleSelected }) {
  const { currentUser } = useContext(UserContext)

    function showNav() {
      return(
        <nav>
          <Link to="/calendar/view">View/Edit</Link>
          <Link to="/calendar/add"> | Add Appointment</Link>
        </nav>
      )
    }
  return (
    <>
      <div>
        <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} onSelectEvent={handleSelected} />
      </div>

      {currentUser ? showNav(): ""}

    </>
  );
}

export default ShowCalendar;