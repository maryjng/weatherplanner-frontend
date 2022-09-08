import React, { useContext, useState } from "react"
import UserContext from "./UserContext"
import PlannerApi from "./api"
import DatePicker from "react-datepicker";


function NewApptForm({handleAddEvent}) {
    const { currentUser } = useContext(UserContext)

    const [formData, setFormData] = useState({ 
        username: "",
        title: "", 
        startDate: "", 
        endDate: "", 
        location: "", 
        description: "" });

    async function handleSubmit(e) {
        e.preventDefault()
        setFormData(data => ({ ...data, username: currentUser}))
        console.log(formData)
        let newAppt = await PlannerApi.addAppt(formData)
        handleAddEvent(newAppt)
    }

    function handleChange(e){
        const {value, name} = e.target
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
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Add Title" name="title" style={{ width: "20%", marginRight: "10px" }} value={formData.title} onChange={handleChange} />

                <DatePicker placeholderText="Start Date" showTimeSelect timeIntervals={15} style={{ marginRight: "10px" }} value={formData.startDate} selected={formData.startDate} onChange={(startDate) => setFormData({ ...formData, startDate })} />

                <DatePicker placeholderText="End Date" showTimeSelect timeIntervals={15} value={formData.endDate} selected={formData.endDate} onChange={(endDate) => setFormData({ ...formData, endDate })} />

                <input type="text" placeholder="Location" name="location" value={formData.location} style={{ width: "20%", marginRight: "10px" }} onChange={handleChange} />

                <input type="text-area" placeholder="Description" name="description" value={formData.description} style={{ width: "20%", marginRight: "10px" }} onChange={handleChange} />

                <button style={{ marginTop: "10px" }} onClick={handleSubmit}>
                    Add Event
                </button>
          </form>
        </>
    )
}


export default NewApptForm;