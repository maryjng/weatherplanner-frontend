import React from "react"
import ForecastDay from "./ForecastDay"
import ZipcodeForm from "./ZipcodeForm"
import "./ForecastCalendar.css"

//NEED TO MAKE THIS AND ZIPCODEFORM INTO ONE COMPONENT OR UNDER ONE COMPONENT SO FORECAST RESULTS CAN BE SETSTATED HERE
function ForecastCalendar({ displayForecast, setDisplayForecast, getForecast }) {

  const forecast = displayForecast.map((day, idx) => <ForecastDay key={{date}+idx} min_temp={day.min_temp} max_temp={day.max_temp} date={day.date} weather={day.weather} />)
    //map the getForecast results into ForecastDay components
    
    return (
      <div>
        <ZipcodeForm getForecast={getForecast} />

        <div class="forecast">
          <span>FORECAST</span>

          {forecast}

        </div>
      </div>
    )
  }

export default ForecastCalendar;