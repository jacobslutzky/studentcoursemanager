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
    // const drop_course = () => {
    //     axios.delete("http://localhost:3000/drop_course", {
    //     student_id: props.student_id,
    //     course_id: item.course_id,
    // })

 //   }

    return (
        <div className="App">
        <h1><b>Current Courses</b></h1> 
        
        {props.curr_courses.map((item) => {
    return (
       <div className="courseinfo">
          <h3>Course Number: {item.course_id}</h3>
          <h3>Course Name: {item.name}</h3>
          <button  >Drop course</button>
       </div>
     );
    })}
     <button onClick={back} >Back</button>
        </div>
    );

}