import NewApptForm from "./forms/NewApptForm";
import ForecastCalendar from "./ForecastDisplay/ForecastCalendar";
import ZipcodeForm from "./forms/ZipcodeForm"
import React, { useState } from "react";
import PlannerApi from "./api";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AddApptCalendar({handleAddEvent, fahrenheit, toggleTempUnit}) {
    const [forecast, setForecast] = useState([])
      //need {zipcode}
    async function getForecast(data) {
        let results = await PlannerApi.getForecast(data)

        //forecast state format is [{weather, min_temp, max_temp, date}] for mapping
        let resArr = Object.values(results)
        setForecast(resArr) 
    }

    //save forecasts along with new appointment if zipcode is the same

  return(
    <>
        <Container>
          <Row>
            <Col sm={7} style={{left: "10px"}}>
              <h3>Step One: Enter Zipcode to Get Forecast</h3>
              <p>Use the forecast to decide where and when your appointment will be.</p>
              <ZipcodeForm getForecast={getForecast} />
              <ForecastCalendar displayForecast={forecast} fahrenheit={fahrenheit} toggleTempUnit={toggleTempUnit} />
            </Col>
            <Col sm={5}>
              <h3>Step Two: Confirm Appointment</h3>
              <NewApptForm handleAddEvent={handleAddEvent} />
            </Col>
          </Row>
        </Container>
 
    </>
  )

}

export default AddApptCalendar;
