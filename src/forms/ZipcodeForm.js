import React, { useState } from "react"
import PlannerApi from "../api"

// FORM FOR GETTING FORECAST FOR GIVEN ZIPCODE SO USERS CAN VIEW FORECAST WHILE MAKING/EDITING AN APPOINTMENT

function ZipcodeForm({ getForecast, setFahrenheit }) {
    const [formData, setFormData] = useState({ 
        zipcode: "",
    })

    async function handleSubmit(e) {
        e.preventDefault()

        //test zipcode regex - 5 digits
        const re = /(^\d{5}$)/;
        if (re.test(formData.zipcode)) {
            //change fahrenheit back to true as it is the default unit, then update forecast 
            await setFahrenheit(true)
            await getForecast(formData)
        } else {
            alert("Invalid zipcode.")
        }

        setFormData({
            zipcode: "",
        })
    }

    function handleChange(e) {
        const {value, name} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Location Zipcode: </label>
            <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />

            <button type="submit" onClick={handleSubmit}>Get 7 Day Forecast</button>
        </form>
    )
}


export default ZipcodeForm;
