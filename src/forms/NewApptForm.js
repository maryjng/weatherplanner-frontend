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
            {/* <Form className="w-25 p-3" style={{ }}onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTitle" value={formData.title} onChange={handleChange}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Appointment Title" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate" value={formData.startDate} onChange={handleChange}>
                    <Form.Label>Start Date and Time</Form.Label>
                    <DatePicker placeholderText="Start Date" showTimeSelect timeIntervals={15} value={formData.startDate} selected={formData.startDate} onChange={(startDate) => setFormData({ ...formData, startDate })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle" value={formData.endDate} onChange={handleChange}>
                    <Form.Label>End Date and Time</Form.Label>
                    <DatePicker placeholderText="End Date" showTimeSelect timeIntervals={15} value={formData.endDate} selected={formData.endDate} onChange={(endDate) => setFormData({ ...formData, endDate })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLocation" value={formData.location} onChange={handleChange}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Appt Address and City/Town" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicZipcode" value={formData.zipcode} onChange={handleChange}>
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="text" placeholder="Location zipcode" /> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription" value={formData.description} onChange={handleChange}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form> */}

            <form onSubmit={handleSubmit} style={{textAlign: "left"}}>
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