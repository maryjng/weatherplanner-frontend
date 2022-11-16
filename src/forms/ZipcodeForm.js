import React, { useState } from "react"

// FORM FOR GETTING FORECAST FOR GIVEN ZIPCODE SO USERS CAN VIEW FORECAST WHILE MAKING/EDITING AN APPOINTMENT

function ZipcodeForm({ getForecast, setFahrenheit }) {
    const [formData, setFormData] = useState({ 
        zipcode: "",
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if ((formData.zipcode.length !== 5) || (601 <= (parseInt(formData.zipcode)) <= 99999 )) throw new Error("Invalid zipcode");

            //change fahrenheit back to true as it is the default unit, then update forecast 
            await setFahrenheit(true)
            await getForecast(formData)

            setFormData({
                zipcode: "",
            })
        } catch(e) {
            alert("Invalid zipcode.")
            console.error(Error(e.message ?? e));
        }
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
