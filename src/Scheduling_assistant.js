import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Current_courses(props) {
    let navigate = useNavigate();
    const back = () => {
        navigate("/summary")
    }
    const add_course = () => {
        
        props.getAvailableCourses();
        navigate("/add_course")
    }
    console.log(props.available_courses);
    return (
        <div className="App">
        <h1><b>Available Courses</b></h1> 
        
        {props.available_courses.map((item) => {
    return (
       <div className="courseinfo">
          <h3>Course Number: {item.course_id}</h3>
          <h3>Course Name: {item.name}</h3>
          <button onClick={add_course} >Add Course</button>
       </div>
     );
    })}
        </div>
    );

}