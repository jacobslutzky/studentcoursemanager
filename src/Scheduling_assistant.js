import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Scheduling_Assistant(props) {

    let navigate = useNavigate();
    const back = () => {
        navigate("/welcome")
    }
    const add_course = (course_id) => {
        axios.post("http://localhost:3000/add_course", {
        student_id: props.student.student_id,
        course_id: course_id,
    })
    }
    

  

    return (
        <div className="App">
        <h1><b>Available Courses</b></h1> 
        
        {props.available_courses.map((item) => {
    return (
       <div className="courseinfo">
          <h3>Course Number: {item.course_id}</h3>
          <h3>Course Name: {item.name}</h3>
          <button> Add Course</button>
       </div>
     );
    })}
     <button onClick={back} >Back</button>
        </div>
    );

}