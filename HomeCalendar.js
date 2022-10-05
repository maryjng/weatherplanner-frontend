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
        //save appt id for use in editApptForm
        console.log(appt)
        
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
        navigate("/", { replace: true });
        return result;
    }

    function showEditForm() {
        return(
            <EditApptForm handleEditEvent={handleEditEvent} appt_id={apptDetails.id} />
        )
    }

    return(
        <>
            <ShowCalendar handleSelected={handleSelected} allEvents={allEvents} />

            <Container>
                <Row>
                    <Col sm={8} style={{padding: "0px"}}>
                        <div>
                            <button onClick={showEditForm}>Edit Appointment</button> 
                            <button onClick={handleDelete}>Delete Appointment</button>
                        </div>

                        <ApptDetail apptForecast={apptForecast} />
                        <div>
                            <div>Title: {apptDetails.title}</div>
                            <div>Start: {apptDetails.startdate}</div>
                            <div>End: {apptDetails.enddate}</div>
                            <div>Location: {apptDetails.location}</div>
                            <div>Zipcode: {apptDetails.zipcode}</div>
                            <div>Description:{apptDetails.description}</div>
                        </div>
                    </Col>
                    <Col sm={4}>
                        {apptDetails !== "" ? showEditForm() : ''}
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default HomeCalendar;