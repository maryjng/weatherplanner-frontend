import ShowCalendar from "./ShowCalendar"
import NewApptForm from "./NewApptForm";
import ForecastCalendar from "./ForecastDisplay/ForecastCalendar";
import ZipcodeForm from "./ZipcodeForm"
import React, { useState } from "react";
import PlannerApi from "./api";


function AddApptCalendar({handleAddEvent, allEvents}) {
    const [forecast, setForecast] = useState([])
      //need {zipcode, tempUnit=fahrenheit} 
    async function getForecast(data) {
        //get rid of leading 0s
        //*** WILL NEED TO IMPLEMENT AN ACTUAL FIX FOR STORING ZIPCODES WITH LEADING 0s INTO DB*/
        data.zipcode = parseInt(data.zipcode)
        let results = await PlannerApi.getForecast(data)

        //forecast state format is [{weather, min_temp, max_temp, date}] for mapping
        let resArr = Object.values(results)
        setForecast(resArr) 
    }

    //save forecasts along with new appointment if zipcode is the same

  return(
    <>
        <ZipcodeForm getForecast={getForecast} />
        <ForecastCalendar displayForecast={forecast} />
        <NewApptForm handleAddEvent={handleAddEvent} />
        <ShowCalendar allEvents={allEvents} />
    </>
  )

}

export default AddApptCalendar;
