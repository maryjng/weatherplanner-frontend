import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import moment from 'moment';

import React, { useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import UserContext from "./UserContext";
import ViewEditAppt from "./ViewEditAppt";
import AddApptCalendar from "./AddApptCalendar";
import PlannerApi from "./api";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from "react-bootstrap/Breadcrumb"


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


function HomeCalendar({ allEvents, handleEditEvent, handleDeleteEvent, handleAddEvent }) {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)

    //handles whether to show F or C temp units. Stored here because child EditApptForm's handle submit needs to reset the unit to F (true)
    const [fahrenheit, setFahrenheit] = useState(true)
    const toggleFahrenheit = () => {
        setFahrenheit(val => !val)
    }

    //this handles whether add appointment interface is displayed or the view/edit appointment one is
    const [displayAddAppt, setDisplayAddAppt] = useState(false)
    const [apptForecast, setApptForecast] = useState([])
    const [apptDetails, setApptDetails] = useState({
        id: "",
        username: "",
        title: "",
        startdate: "",
        enddate: "",
        location: "",
        zipcode: "",
        description: ""
    })

    if (!currentUser) {
        navigate("/login", { replace: true })
    }

    //add back offset to db-stored UTC datetime
    function convToDateAndTime(t) {
        let d = new Date()
        const o = d.getTimezoneOffset()

        t = moment(t)
        t.subtract(o, 'm')
        return t.toString()
    }

    // upon click of appt on calendar, fetch stored forecast and display it through apptForecast component. Takes the appt info and sets the state for apptDetails
    async function handleSelected(event) {

        //bring up the ViewEditAppt component if it is not currently displayed
        if (displayAddAppt) {
            setDisplayAddAppt(false)
        }

        let appt = await PlannerApi.getAppt(event.id)
        
        //adding back missing leading zeroes...
        if (appt.zipcode.length < 5) {
            appt.zipcode = ("0" * (5 - appt.zipcode.length)) + appt.zipcode
        } 

        //HANDLING THE TIMEZONE OFFSET
        appt.startdate = convToDateAndTime(appt.startdate)
        appt.enddate = convToDateAndTime(appt.enddate)  

        setApptDetails(appt)
        let forecast = await PlannerApi.getApptForecast(event.id)
        setApptForecast(forecast)
    }

    async function handleDelete() {
        let result = await PlannerApi.deleteAppt(apptDetails.id)
        handleDeleteEvent(apptDetails.id)
        navigate("/calendar/view", { replace: true });
        return result;
    }

    async function updateForecast() {
        let today = new Date()

        // //make today the startDate if appt start date is before today (clears up the forecast and db and doesn't matter anyway)
        let startDate = apptDetails.startdate < today ? today : apptDetails.startdate

        //clear all the old forecasts first
        await PlannerApi.deleteAllForecasts(apptDetails.id)

        const res = await PlannerApi.getForecast({ 
            "zipcode": apptDetails.zipcode, 
            "startDate": startDate, 
            "endDate": apptDetails.enddate
        })
        //save each day's forecast to db.
        //Checking if max_temp is included
        for (const key in res) {
            if (res[key].max_temp) {
            await PlannerApi.addForecast(apptDetails.id, res[key])
            }
        }
        //refresh the displayed forecast state
        const forecast = await PlannerApi.getApptForecast(apptDetails.id)
        setApptForecast(forecast)
    }

    function showAddApptForm() {
        return(            
            <AddApptCalendar handleAddEvent={handleAddEvent} fahrenheit={fahrenheit} setFahrenheit={setFahrenheit} toggleFahrenheit={toggleFahrenheit} />
        )
    }

    function showEditAndViewAppts() {
        return (
            <ViewEditAppt handleDelete={handleDelete} handleEditEvent={handleEditEvent} updateForecast={updateForecast} apptForecast={apptForecast} setApptForecast={setApptForecast} apptDetails={apptDetails} setApptDetails={setApptDetails} fahrenheit={fahrenheit} setFahrenheit={setFahrenheit} toggleFahrenheit={toggleFahrenheit} />
        )
    }


    return(
        <>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} onSelectEvent={handleSelected} />

            <Breadcrumb style={{marginLeft: "60px"}}>            
                <Breadcrumb.Item onClick={() => setDisplayAddAppt(false)}>
                    View and Edit Appointments
                </Breadcrumb.Item>

                <Breadcrumb.Item onClick={() => setDisplayAddAppt(true)}>
                    Add Appointment
                </Breadcrumb.Item>
            </Breadcrumb>


            { displayAddAppt ? showAddApptForm() : showEditAndViewAppts() }
        </>
    )
}


export default HomeCalendar;