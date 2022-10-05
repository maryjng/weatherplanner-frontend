import ShowCalendar from "./ShowCalendar"
import NewApptForm from "./forms/NewApptForm";
import ForecastCalendar from "./ForecastDisplay/ForecastCalendar";
import ZipcodeForm from "./forms/ZipcodeForm"
import React, { useState } from "react";
import PlannerApi from "./api";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AddApptCalendar({handleAddEvent, allEvents}) {
    const [forecast, setForecast] = useState([])
      //need {zipcode, tempUnit=fahrenheit} 
    async function getForecast(data) {
        let results = await PlannerApi.getForecast(data)

        //forecast state format is [{weather, min_temp, max_temp, date}] for mapping
        let resArr = Object.values(results)
        setForecast(resArr) 
    }

    //save forecasts along with new appointment if zipcode is the same

  return(
    <>
        <ShowCalendar allEvents={allEvents} />

        <Container>
          <Row>
            <Col sm={8} style={{left: "10px"}}>
              <ZipcodeForm getForecast={getForecast} />
              <ForecastCalendar displayForecast={forecast} />
            </Col>
            <Col sm={4}>
              <NewApptForm handleAddEvent={handleAddEvent} />
            </Col>
          </Row>
        </Container>
 
    </>
  )

}

export default AddApptCalendar;
