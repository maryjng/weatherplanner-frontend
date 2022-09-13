import React from "react"
import "./ForecastDay.css"

function ForecastDay({ min_temp, max_temp, weather, date, }) {
    const weekday = "test weekday"

    return(
    <div>
        <div class="forecast-day">
            <h6>{weekday} {date}</h6>
            <p><img src=""></img>{weather}</p>
            <p class="high">{min_temp}</p>
            <p class="low">{max_temp}</p>
        </div>
    </div>
    )
}



export default ForecastDay;