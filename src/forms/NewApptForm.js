import React, { useContext, useState } from "react"
import UserContext from "../UserContext"
import PlannerApi from "../api"
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./DatePicker.css";

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

        //test zipcode regex - 5 digits
        const re = /(^\d{5}$)/;
        if (re.test(formData.zipcode)) {
            let newAppt = await PlannerApi.addAppt(formData)
            await handleAddEvent(newAppt)
            await saveForecast(newAppt.id)
            } else {
            alert("Invalid zipcode.")
        }
   
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
            "tempUnit": "fahrenheit"
        }
        //get the api response data, ready for db insertion 
        let res = await PlannerApi.getForecast(req)

        for (const key in res) {
            PlannerApi.addForecast(appt_id, res[key])
        }
    }

    return(
        <>
        <Form>
            <Form.Group classname="mb-3" controlId="formBasicTitle">
                <Form.Label>Appointment Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleChange}/>
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicStartDate">
                <Form.Label>Start Date and Time</Form.Label>
                <DatePicker placeholderText="Start Date" showTimeSelect timeIntervals={15} value={formData.startDate} selected={formData.startDate} dateFormat="MMMM d, yyyy h:mm aa" onChange={(startDate) => setFormData({ ...formData, startDate })} />
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicEndDate">
                <Form.Label>End Date and Time</Form.Label>
                <DatePicker placeholderText="End Date" showTimeSelect timeIntervals={15} value={formData.endDate} selected={formData.endDate} dateFormat="MMMM d, yyyy h:mm aa" onChange={(endDate) => setFormData({ ...formData, endDate })} />
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicLocation">
                <Form.Label>Location Street and City/Town</Form.Label>
                <Form.Control type="text" placeholder="Enter street and city/town" name="location" value={formData.location} onChange={handleChange}/>
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicZipcode">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control type="text" placeholder="Enter zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange}/>
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" name="description" value={formData.description} onChange={handleChange}/>
            </Form.Group>

            <Button onClick={handleSubmit} variant="primary" type="submit">
                Submit
            </Button>

        </Form>
        </>
    )
}


export default NewApptForm;