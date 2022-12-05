import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

//const [course_id, setCourseID] = useState("");

export default function Add_course(props) {
    let navigate = useNavigate();
    const back = () => {
        navigate("/current_courses")
    }
    const submit = () => {
        
    }
    return (
        <div className="App">
        <h1><b>Add Course</b></h1> 
        <h3>Please put in the course number:</h3> 
        <input
            type="text"
            value = {props.course_id}
            onChange= {(e) => {
                props.setCourseID(e.target.value);
            }}
         />
        <button onClick={submit}>Submit</button>
        
        <button onClick={back} >Back</button>
        </div>
    );

}