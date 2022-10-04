import React from "react"

function Home() {

    return(
        <div style={{ margin:'7%', padding:'10px'}}>
            <h1>Weather and Planner App</h1>
            <p>Welcome to my weather calendar app, a planner app that incorporates weather forecasts for better-informed appointment-setting. Please register an account and login to get started.</p>

            <p>Please note the maximum length forecast that the app currently works with is 7 days because that is the most one can get without paying a subscription fee. The app can be easily adapted to work with more days and other weather APIs should a paid subscription be paid for and maintained.</p>
        </div>
    )
}

export default Home;