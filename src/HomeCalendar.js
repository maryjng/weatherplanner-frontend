import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowCalendar from "./ShowCalendar";
import ApptDetail from "./ApptDetail";
import EditApptForm from "./forms/EditApptForm";
import PlannerApi from "./api";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomeCalendar({ allEvents, handleEditEvent, handleDeleteEvent }) {
    const navigate = useNavigate()
    const [apptForecast, setApptForecast] = useState([])
    const [apptDetails, setApptDetails] = useState("")
    
  // upon click of event, fetch stored forecast and display it through apptForecast component. Takes the appt info and sets the state for apptDetails
    async function handleSelected(event) {
        let appt = await PlannerApi.getAppt(event.id)
                
        //adding back missing leading zeroes...
        if (appt.zipcode.length < 5) {
            appt.zipcode = ("0" * (5 - appt.zipcode.length)) + appt.zipcode
        } 
        setApptDetails(appt)

        let forecast = await PlannerApi.getApptForecast(event.id)
        console.log(forecast)
        setApptForecast(forecast)
    }

    async function handleDelete() {
        let result = await PlannerApi.deleteAppt(apptDetails.id)
        handleDeleteEvent(apptDetails.id)
        navigate("/calendar/view", { replace: true });
        return result;
    }

    function showEditForm() {
        return (
            <EditApptForm handleEditEvent={handleEditEvent} appt_id={apptDetails.id} />
        )
    }

    //make date and time look nice for display
    function convToDateAndTime(t) {
        let date = t.slice(0, 10)
        let hour = (t.slice(11, 13) >= 12) ? (t.slice(11, 13) - 12) : t.slice(11, 13)
        let minute = t.slice(14, 16)
        let ampm = hour > 0 ? "PM" : "AM"
        return date + " " + hour + ":" + minute +  " " + ampm
    }

    return(
        <>
            <ShowCalendar handleSelected={handleSelected} allEvents={allEvents} />

            <Container>
                <Row>
                    <Col sm={7}>
                        <div style={{textAlign:"center"}}>
                            <h3>Appointment Details</h3>
                            <p>Click on an appointment on the calendar above to view its details below. You will also be able to edit the details on the right.</p>
                            <h5><i>Saved Forecast</i></h5>
                        </div>
                    
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
                            {/* <button onClick={showEditForm}>Edit Appointment</button>  */}
                            <button onClick={handleDelete}>Delete Appointment</button>
                        </div>
                    </Col>
                    <Col sm={5}>
                        {apptDetails !== "" ? showEditForm() : ''}
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default HomeCalendar;