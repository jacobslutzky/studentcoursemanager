import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Current_courses(props) {
    let navigate = useNavigate();
    const back = () => {
        navigate("/welcome")
    }
    const add_course = () => {
        navigate("/add_course")
    }
    const drop_course = () => {
        navigate("/drop_course")
    }

    return (
        <div className="App">
        <h1><b>Current Courses</b></h1> 
        <h3>Course Number:       Course Name:</h3> 
        <h3>1                    Course1 </h3> 
        <h3>2                    Course2 </h3>
        
        <button onClick={add_course} >Add Course</button>
        <button onClick={drop_course} >Drop Course</button>
        <button onClick={back} >Back</button>
        </div>
    );

}