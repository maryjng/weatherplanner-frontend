import React, {useState} from "react"
import ForecastDay from "./ForecastDay"
import "./ForecastCalendar.css"

function ForecastCalendar({ displayForecast, fahrenheit, setFahrenheit }) {
  
  //convert between F and C. Units always start at F as forecasts are saved in F. 
  const convertTemp = () => {
    if (!fahrenheit) {
      displayForecast.map(function(day) {
        day.min_temp = Number.parseFloat((day.min_temp * 1.8) + 32).toFixed(1);
        day.max_temp = Number.parseFloat((day.max_temp * 1.8) + 32).toFixed(1);
        })
    } else {
      displayForecast.map(function(day) {
        day.min_temp = Number.parseFloat((day.min_temp - 32) * 0.5556).toFixed(1);
        day.max_temp = Number.parseFloat((day.max_temp - 32) * 0.5556).toFixed(1);
      })
    }
    setFahrenheit(t => !t)
  }

  //each ForecastDay represents one day with forecast data, displayed in a calendar-like format
  const forecast = displayForecast.map((day, idx) => <ForecastDay key={idx} min_temp={day.min_temp} max_temp={day.max_temp} date={day.date} weather={day.weather} tempUnit={fahrenheit} />)
    
    return (
      <div>
        {/* <a onClick={convertTemp}>°F/°C</a> */}

        <div className="forecast">
          {forecast.length == 0 ? <h4>(Forecasts are only available for up to 7 days from today.)</h4> : forecast }
        </div>
        <br />
      </div>
    )
  }

export default ForecastCalendar;