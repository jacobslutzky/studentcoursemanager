import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Summary(props) {
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [gpa, setGPA] = useState([]);

    
    useEffect(() => {
        axios.post("http://localhost:3000/finished_courses", { student_id: props.student.student_id
          })
          .then(res => setData(res.data))
          .catch(err => console.log(err));
      }, []);
    
    useEffect(() => {
    axios.post("http://localhost:3000/get_gpa", { student_id: props.student.student_id
        })
        .then(res => setGPA(res.data))
        .catch(err => console.log(err));
    }, []);
    
    const back = () => {
        navigate("/welcome")
    }
    return (
        <div className="App">
        <h1><b>Transcript</b></h1> 
        <h3> Name: {props.student.name} </h3> 
        <h3>Student ID: {props.student.student_id} </h3> 
        <h3>GPA: </h3>
        <h3>Credits: </h3>
        <h3>Completed Courses:</h3>
        {data.map((val, key) => {
            return(
                <div key = {val.course_id}>
                    <h1>{"CourseID: " + val.course_id}</h1>
                    <h3>{"Credits: " + val.credits}</h3>
                    <h4>{"Final Grade: " + val.final_grade} </h4>
                </div>
            )
          }
          )}
        <button onClick={back} >Back</button>
        </div>
    );

}