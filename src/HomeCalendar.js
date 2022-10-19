import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowCalendar from "./ShowCalendar";
import ApptDetail from "./ApptDetail";
import EditApptForm from "./forms/EditApptForm";
import PlannerApi from "./api";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

function HomeCalendar({ allEvents, handleEditEvent, handleDeleteEvent }) {
    const navigate = useNavigate()
    const [apptForecast, setApptForecast] = useState([])
    const [apptDetails, setApptDetails] = useState("")

  // upon click of appt on calendar, fetch stored forecast and display it through apptForecast component. Takes the appt info and sets the state for apptDetails
    async function handleSelected(event) {
        let appt = await PlannerApi.getAppt(event.id)
                
        //adding back missing leading zeroes...
        if (appt.zipcode.length < 5) {
            appt.zipcode = ("0" * (5 - appt.zipcode.length)) + appt.zipcode
        } 
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

        //make today the startDate if appt start date is before today (clears up the forecast and db and doesn't matter anyway)
        let startDate = new Date(apptDetails.startdate.slice(0, 10))
        if (startDate < today) {
            startDate = today
        }

        //clear all the old forecasts first
        PlannerApi.deleteAllForecasts(apptDetails.id)

        const res = await PlannerApi.getForecast({ 
            "zipcode": apptDetails.zipcode, 
            "tempUnit": "fahrenheit", 
            "startDate": startDate, 
            "endDate": apptDetails.enddate
        })

        //save each day's forecast to db.
        //Checking if max_temp is included is a temp fix because for some reason the first day does not get any forecast results from the third party weather api
        for (const key in res) {
            if (res[key].max_temp) {
            await PlannerApi.addForecast(apptDetails.id, res[key])
            }
        }

        //refresh the displayed forecast state
        const forecast = await PlannerApi.getApptForecast(apptDetails.id)
        setApptForecast(forecast)
    }

    //add back offset to db-stored UTC datetime
    function convToDateAndTime(t) {
        let d = new Date()
        const o = d.getTimezoneOffset()

        t = moment(t)
        t.subtract(o, 'm')
        return t.toString()
    }

    return(
        <>
            <ShowCalendar handleSelected={handleSelected} allEvents={allEvents} />

            <Container>
                <Row>
                    <Col sm={7} style={{padding: "0px"}}>
                        <h3>View Appointment Details and Saved Forecasts</h3>
                        <p><i>Saved Forecasts</i></p>
                        <button onClick={updateForecast}>Update Forecast</button>
                        <ApptDetail apptForecast={apptForecast} />
                         <div>
                            <div>Title: {apptDetails.title}</div>
                            <div>Start: {apptDetails.startdate ? convToDateAndTime(apptDetails.startdate) : ""}</div>
                            <div>End: {apptDetails.enddate ? convToDateAndTime(apptDetails.enddate) : ""}</div>
                            <div>Location: {apptDetails.location}</div>
                            <div>Zipcode: {apptDetails.zipcode}</div>
                            <div>Description:{apptDetails.description}</div>
                        </div>

                        <div style={{alignContent: "right"}}>
                            <button onClick={handleDelete} style={{marginTop: "10px"}}>Delete Appointment</button>
                        </div>
                    </Col>
                    <Col sm={5}>
                        <EditApptForm handleEditEvent={handleEditEvent} setApptDetails={setApptDetails} appt_id={apptDetails.id} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default HomeCalendar;