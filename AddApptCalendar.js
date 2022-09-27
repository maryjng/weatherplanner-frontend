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
        data["zipcode"] = parseInt(data["zipcode"])
        console.log(`ForecastCalendar data: ${JSON.stringify(data)}`)
        let results = await PlannerApi.getForecast({
            "zipcode": JSON.stringify(data.zipcode),
            "tempUnit": data.tempUnit
        })
        console.log(`Results: ${results}`)
        let resArr = results.values()
        setForecast(resArr) 
        console.log(resArr)
        console.log(forecast)
    }

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
