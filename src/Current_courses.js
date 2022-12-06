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
     const drop_course = (course_id) => {
         axios.delete("http://localhost:3000/drop_course", {
         data:{student_id: props.student_id,
         course_id: course_id},
     })
     props.getAvailableCourses()
    props.getCurrCourses()
    }

    return (
        <div className="App">
        <h1><b>Current Courses</b></h1> 
        
        {props.curr_courses.map((item) => {
    return (
       <div key = {item.course_id} className="courseinfo">
          <h3>Course Number: {item.course_id}</h3>
          <h3>Course Name: {item.name}</h3>
          <button onClick = {() => drop_course(item.course_id)} >Drop Course</button>
       </div>
     );
    })}
     <button onClick={back} >Back</button>
        </div>
    );

}