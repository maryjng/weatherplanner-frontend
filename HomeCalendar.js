import React, { useState } from "react";
import ShowCalendar from "./ShowCalendar";
import ApptDetail from "./ApptDetail";
import PlannerApi from "./api";

function HomeCalendar({ allEvents }) {
    const [apptForecast, setApptForecast] = useState([])
    const [apptDetails, setApptDetails] = useState([])
    
  // upon click of event, fetch stored forecast and display it through apptForecast component. Takes the appt info and sets the state for apptDetails
    async function handleSelected(event) {
        let appt = await PlannerApi.getAppt(event.id)
        console.log(appt)
        //separate the forecast and appt details for display purposes
        setApptDetails(appt)
        // if (appt.forecast) {
        //     setApptForecast(appt.forecast)
        // }
    }

    return(
        <>
            <ApptDetail apptForecast={apptForecast} />
            <div>
                <div>Title: {apptDetails.title}</div>
                <div>Start: {apptDetails.startdate}</div>
                <div>End: {apptDetails.enddate}</div>
                <div>Location: {apptDetails.location}</div>
                <div>Description:{apptDetails.description}</div>
            </div>
            <ShowCalendar handleSelected={handleSelected} allEvents={allEvents} />
        </>
    )
}

export default HomeCalendar;