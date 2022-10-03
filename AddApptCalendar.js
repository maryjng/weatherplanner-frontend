import ShowCalendar from "./ShowCalendar"
import NewApptForm from "./forms/NewApptForm";
import ForecastCalendar from "./ForecastDisplay/ForecastCalendar";
import ZipcodeForm from "./forms/ZipcodeForm"
import React, { useState } from "react";
import PlannerApi from "./api";


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
        <ZipcodeForm getForecast={getForecast} />
        <ForecastCalendar displayForecast={forecast} />
        <NewApptForm handleAddEvent={handleAddEvent} />
    </>
  )

}

export default AddApptCalendar;
