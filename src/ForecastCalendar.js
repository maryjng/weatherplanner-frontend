import React, { useState, useCallback } from "react"
import ForecastDay from "./ForecastDay"
import ZipcodeForm from "./ZipcodeForm"
import PlannerApi from "./api"

//NEED TO MAKE THIS AND ZIPCODEFORM INTO ONE COMPONENT OR UNDER ONE COMPONENT SO FORECAST RESULTS CAN BE SETSTATED HERE
function ForecastCalendar() {
    const [forecast, setForecast] = useState([])

    //need {zipcode, tempUnit=fahrenheit} 
    async function getForecast(data) {
        console.log(data)
        let results = await PlannerApi.getForecast(data)
        console.log(results)
        let resArr = results.values()
        setForecast(resArr) 
        console.log(resArr)
    }

    //map the getForecast results into ForecastDay components
    
    return (
      <div>
        <ZipcodeForm getRequestForecast={getForecast} />

        {forecast.map(day => <ForecastDay min_temp={day.min_temp} max_temp={day.max_temp} date={day.date} weathercode={day.weathercode} />)}
      </div>
    )
  }

export default ForecastCalendar;