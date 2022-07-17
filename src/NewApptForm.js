import React, { useState } from "react"
import { useHistory } from "react-router-dom";
// import CalendarApi from "./CalendarApi"


//FORM FOR MAKING A NEW APPT. TO SUBMIT TO CORRESPONDING BACKEND ROUTE FOR REQUESTING WITH GOOGLE API

function NewApptForm({ createAppt }) {
    const INITIAL_STATE = {
        summary:"",
        description:"",
        location:"",
        startDateTime:"",
        endDateTime:""
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    async function handleSubmit(e){
        e.preventDefault()
        await createAppt(formData.summary, formData.description, formData.location, formData.startDateTime, formData.endDateTime)

        setFormData(INITIAL_STATE)
    }

    function handleChange(e){
        const {value, name} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Appointment Name</label>
            <input type="text" name="summary" value={formData.summary} onChange={handleChange} required/>
        
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />

            <label>Description</label>
            <input type="textarea" name="description" value={formData.description} onChange={handleChange} required/>
            
            <label>Start date and time</label>
            <input type="datetime-local" name="startDateTime" value={formData.startDateTime} onChange={handleChange} required/>
            
            <label>End date and time</label>
            <input type="datetime-local" name="endDateTime" value={formData.endDateTime} onChange={handleChange} required/>

            <button type="submit" onSubmit={handleSubmit}>Create Appointment</button>
        </form>
    )
}

export default NewApptForm;