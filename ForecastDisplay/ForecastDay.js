import React from "react"
import "./ForecastDay.css"

// this is the box representing a date and its forecast data in a week-long calendar-like view.

function ForecastDay({ min_temp, max_temp, weather, date }) {
    // to convert the weekday integer representation into the actual word
    const weekday = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
    let d = new Date(date);
    let day = weekday[d.getDay()];

    return(
    <div>
        <div className="forecast-day">
            <h6>{day} 
                <div>{date}</div>
            </h6>
            <p><img src=""></img>{weather}</p>
            <p className="high">{max_temp}</p>
            <p className="low">{min_temp}</p>
        </div>
    </div>
    )
}



export default ForecastDay;