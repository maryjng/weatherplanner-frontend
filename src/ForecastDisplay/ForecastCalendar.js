import React from "react"
import ForecastDay from "./ForecastDay"
import "./ForecastCalendar.css"

function ForecastCalendar({ displayForecast }) {

      //each ForecastDay represents one day with forecast data, displayed in a calendar-like format
  const forecast = displayForecast.map((day, idx) => <ForecastDay key={idx} min_temp={day.min_temp} max_temp={day.max_temp} date={day.date} weather={day.weather} tempUnit={day.tempUnit} />)
    
    return (
      <div>

        <div className="forecast">
          <span>FORECAST</span>

          {forecast}

        </div>
        <br />
      </div>
    )
  }

export default ForecastCalendar;