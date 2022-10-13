import React, { useState } from "react"
import PlannerApi from "../api"

// FORM FOR GETTING FORECAST FOR GIVEN ZIPCODE SO USERS CAN VIEW FORECAST WHILE MAKING/EDITING AN APPOINTMENT

function ZipcodeForm({ getForecast }) {
    const [formData, setFormData] = useState({ 
        zipcode: "",
        tempUnit: "celcius"
    })

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(`FORM DATA: ${formData.zipcode} ${formData.tempUnit}`)
        await getForecast(formData)
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

            {/* <label> Temperature Unit: </label>
            <select name="tempUnit" value={formData.tempUnit} onChange={handleChange}>
                <option value="celcius">Celcius</option>
                <option value="fahrenheit">Fahrenheit</option>
            </select> */}

            <button type="submit" onClick={handleSubmit}>Get Forecast</button>
        </form>
    )
}


export default ZipcodeForm;
