import NewApptForm from "./forms/NewApptForm";
import ForecastCalendar from "./ForecastDisplay/ForecastCalendar";
import ZipcodeForm from "./forms/ZipcodeForm"
import React, { useState } from "react";
import PlannerApi from "./api";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AddApptCalendar({handleAddEvent, fahrenheit, setFahrenheit, toggleFahrenheit}) {
    const [forecast, setForecast] = useState([])
    
      //need {zipcode}
    async function getForecast(data) {
        let results = await PlannerApi.getForecast(data)

        //forecast state format is [{weather, min_temp, max_temp, date}] for mapping
        let resArr = Object.values(results)
        setForecast(resArr) 
    }

  return(
    <>
        <Container>
          <Row>
            <Col sm={8} style={{left: "10px"}}>
              <h3>Step One: Enter Zipcode to Get Forecast</h3>
              <p>Use the forecast to decide where and when your appointment will be.</p>
              <ZipcodeForm getForecast={getForecast} setFahrenheit={setFahrenheit} />
              <ForecastCalendar displayForecast={forecast} fahrenheit={fahrenheit} toggleFahrenheit={toggleFahrenheit} />            </Col>
            <Col sm={4}>
              <h3>Step Two: Confirm Appointment</h3>
              <NewApptForm handleAddEvent={handleAddEvent} />
            </Col>
          </Row>
        </Container>
 
    </>
  )

}

export default AddApptCalendar;
