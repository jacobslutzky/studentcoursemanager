import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Summary(props) {
    let navigate = useNavigate();
    const back = () => {
        navigate("/welcome")
    }
    return (
        <div className="App">
        <h1><b>Summary</b></h1> 
        <h3> Name: {props.student.name} </h3> 
        <h3>Student ID: {props.student.student_id} </h3> 
        <h3>GPA: </h3>
        <h3>Credits: </h3>
        <button onClick={back} >Back</button>
        </div>
    );

}