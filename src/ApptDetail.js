import ForecastCalendar from "./ForecastDisplay/ForecastCalendar";
import React from "react";

function ApptDetail({ apptForecast }) {

    return(
        <div>
            <ForecastCalendar displayForecast={apptForecast}/>
        </div>
    )
}

export default ApptDetail;