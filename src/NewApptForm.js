import React, { useContext, useState } from "react"
import UserContext from "./UserContext"
import PlannerApi from "./api"
import DatePicker from "react-datepicker";


function NewApptForm({handleAddEvent}) {
    const currentUser = useContext(UserContext)

    const [formData, setFormData] = useState({ 
        name: "", 
        start: "", 
        end: "", 
        location: "", 
        description: "" });

    async function handleSubmit(e) {
        e.preventDefault()
        let newAppt = await PlannerApi.addAppt(currentUser.username, formData)
        handleAddEvent(newAppt)
    }

    // function handleChange(e){
    //     const {value, name} = e.target
    //     setFormData(data => ({
    //         ...data,
    //         [name]: value
    //     }))
    // }

    // redirect if not logged in
    // if (!currentUser) {
    //     return <Redirect to="/login" />;
    //   }

    return(
        <>
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Add Name" style={{ width: "20%", marginRight: "10px" }} value={formData.title} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                <DatePicker placeholderText="Start Date" showTimeSelect timeIntervals={15} style={{ marginRight: "10px" }} value={formData.start} selected={formData.start} onChange={(start) => setFormData({ ...formData, start })} />

                <DatePicker placeholderText="End Date" showTimeSelect timeIntervals={15} value={formData.end} selected={formData.start} onChange={(end) => setFormData({ ...formData, end })} />

                <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>

                <input type="text-area" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                <button style={{ marginTop: "10px" }} onClick={handleSubmit}>
                    Add Event
                </button>
          </form>
        </>
    )
}


export default NewApptForm;