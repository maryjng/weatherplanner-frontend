import React from "react"


function ForecastDay({ min_temp, max_temp, weathercode, date, }) {
    const weekday = "test weekday"
    // const weather
    // const weatherImg

    return(
        <div class="forecastBox" >
            <div align="center">{date}</div>
            <div align="center"> {weekday} </div>

            <div class="forecastBoxWeather">
                <div align="left">{min_temp}</div>
                <div align="right">{max_temp}</div> 
                <div align="center">
                    <img src=""></img>
                    {weathercode}
                </div>
            </div>
        </div>
    )
}



export default ForecastDay;