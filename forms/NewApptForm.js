import React, { useContext, useState } from "react"
import UserContext from "../UserContext"
import PlannerApi from "../api"
import DatePicker from "react-datepicker";


function NewApptForm({handleAddEvent}) {
    const { currentUser } = useContext(UserContext)

    const [formData, setFormData] = useState({ 
        username: currentUser,
        title: "", 
        startDate: "", 
        endDate: "", 
        location: "",
        zipcode: "", 
        description: "" });

    async function handleSubmit(e) {
        e.preventDefault()
 
        // setFormData(data => ({ ...data, "username": currentUser}))

        let newAppt = await PlannerApi.addAppt(formData)

        console.log(newAppt)
        await handleAddEvent(newAppt)
        await saveForecast(newAppt.id)
        
        setFormData({
            username: currentUser,
            title: "", 
            startDate: "", 
            endDate: "", 
            location: "", 
            zipcode: "",
            description: "" 
        })


    }

    function handleChange(e){
        let {value, name} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    async function saveForecast(appt_id) {
        let req = {
            "startDate": formData.startDate,
            "endDate": formData.endDate,
            "zipcode": formData.zipcode,
            //for now
            "tempUnit": "fahrenheit"
        }
        //get the api response data, ready for db insertion 
        console.log(req)
        let res = await PlannerApi.getForecast(req)
        console.log(res)

        for (const key in res) {
            PlannerApi.addForecast(appt_id, res[key])
        }
    }

    // redirect if not logged in
    // if (!currentUser) {
    //     return <Redirect to="/login" />;
    //   }

    return(
        <>
            <h2 style={{textAlign: "center"}}>Add Appointment</h2>
            <form onSubmit={handleSubmit} style={{textAlign:"center"}}>
                <label>Appointment Title: </label>
                <input type="text" placeholder="Add Title" name="title" value={formData.title} onChange={handleChange} />

                <label>Start Date and Time: </label>
                <DatePicker placeholderText="Start Date" showTimeSelect timeIntervals={15} value={formData.startDate} selected={formData.startDate} onChange={(startDate) => setFormData({ ...formData, startDate })} />

                <label>End Date and Time: </label>
                <DatePicker placeholderText="End Date" showTimeSelect timeIntervals={15} value={formData.endDate} selected={formData.endDate} onChange={(endDate) => setFormData({ ...formData, endDate })} />

                <label>Street address and city/town: </label>
                <input type="text" placeholder="Location" name="location" value={formData.location} onChange={handleChange} />

                <label>Zipcode: </label>
                <input type="text" placeholder="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} />

                <label>Description: </label> 
                <input type="text-area" placeholder="Description" name="description" value={formData.description}  onChange={handleChange} />

                <button style={{ marginTop: "10px" }} onClick={handleSubmit}>
                    Add Event
                </button>
          </form>
        </>
    )
}


export default NewApptForm;