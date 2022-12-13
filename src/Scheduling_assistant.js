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
        console.log("it works")
        axios.post("http://localhost:3000/add_course", {
        student_id: props.student.student_id,
        course_id: course_id,
    })
    props.getAvailableCourses()
    props.getCurrCourses()

    }


  

    return (
        <div className="App">
        <h1><b>Available Courses</b></h1> 
        <label>Filter Course with Course ID</label>
        <input type = "text" 
        onChange={(e) => {props.setsubname(e.target.value)}}/>

        {props.available_courses.map((item) => {
    return (
       <div key = {item.course_id} className="courseinfo">
          <h3>Course Number: {item.course_id}</h3>
          <h3>Course Name: {item.course_name}</h3>
          <h3>Teacher: {item.teacher}</h3>
          
          <button onClick = {() => add_course(item.course_id)} >Add Course</button>
       </div>
     );
    })}
     <button onClick={back} >Back</button>
        </div>
    );

}