import React from "react";
import ForecastCalendar from "./ForecastDisplay/ForecastCalendar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditApptForm from "./forms/EditApptForm";  
import Button from "react-bootstrap/Button"


function ViewEditAppt({handleDelete, handleEditEvent, updateForecast, apptDetails, apptForecast, setApptForecast, setApptDetails, toggleFahrenheit, fahrenheit, setFahrenheit}) {

    //change fahrenheit back to true as it is the default unit, then update forecast 
    async function handleRefreshClick() {
        setFahrenheit(true)
        await updateForecast()
    }

    return(
        <Container>
            <Row>
                <Col sm={8} style={{padding: "0px"}}>
                    <h3>View Appointment Details and Saved Forecasts</h3>
                    <p>Saved forecasts for the appointment are shown below. To get the most recent forecast, click the Update Forecast button. Doing so will delete forecasts from before today as well. Please note that forecasts are only available for up to 7 days from today.</p>
                    <Button variant="outline-secondary" size="sm" onClick={handleRefreshClick}>Refresh Forecast</Button>

                    <ForecastCalendar displayForecast={apptForecast} fahrenheit={fahrenheit} toggleFahrenheit={toggleFahrenheit} />

                    <div>
                        <div>Title: {apptDetails.title}</div>
                        <div>Start: {apptDetails.startdate}</div>
                        <div>End: {apptDetails.enddate}</div>
                        <div>Location: {apptDetails.location}</div>
                        <div>Zipcode: {apptDetails.zipcode}</div>
                        <div>Description: {apptDetails.description}</div>
                    </div>

                    <div style={{alignContent: "right"}}>
                        <button onClick={handleDelete} style={{marginTop: "10px"}}>Delete Appointment</button>
                    </div>
                </Col>
                <Col sm={4}>
                    <EditApptForm handleEditEvent={handleEditEvent} apptDetails={apptDetails} setApptDetails={setApptDetails} appt_id={apptDetails.id} updateForecast={updateForecast} setApptForecast={setApptForecast} setFahrenheit={setFahrenheit} />
                </Col>
            </Row>
        </Container>
    )
}

export default ViewEditAppt;