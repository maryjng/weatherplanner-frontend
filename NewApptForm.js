import React, { useContext, useState } from "react"
import UserContext from "./UserContext"
import PlannerApi from "./api"
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
        //*** NEED TO FIGURE OUT HOW TO set the username without having to submit the form twice */
        setFormData(data => ({ ...data, "username": currentUser}))

        let newAppt = await PlannerApi.addAppt(formData)

        console.log(newAppt)
        handleAddEvent(newAppt)
        
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