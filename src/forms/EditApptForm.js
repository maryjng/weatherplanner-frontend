import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext"
import PlannerApi from "../api"
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./DatePicker.css";


function EditApptForm({handleEditEvent, appt_id}) {
    const navigate = useNavigate()
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

        let editAppt = await PlannerApi.updateAppt(appt_id, formData)
        handleEditEvent(editAppt)
        
        setFormData({
            username: currentUser,
            title: "", 
            startDate: "", 
            endDate: "", 
            location: "", 
            zipcode: "",
            description: "" 
        })
        navigate("/calendar/view", { replace: true });
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
        <h2>Edit Appointment</h2>
        <Form>
            <Form.Group classname="mb-3" controlId="formBasicTitle">
                <Form.Label>Appointment Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleChange}/>
            </Form.Group>

            <Form.Group classname="mb-3" controlId="formBasicStartDate">
                <Form.Label>Start Date and Time</Form.Label>
                <DatePicker placeholderText="Start Date" showTimeSelect timeIntervals={15} value={formData.startDate} selected={formData.startDate} dateFormat="MMMM d, yyyy h:mm aa" onChange={(startDate) => setFormData({ ...formData, startDate })} style={{width:"100%"}} />
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


export default EditApptForm;