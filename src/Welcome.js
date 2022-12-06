import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Welcome(props) {
    let navigate = useNavigate();

    const summary = () => {
        navigate("/summary")
    }

    const curr_courses = () => {
        navigate("/current_courses")
    }

    const scheduling_assistant = () => {
        navigate("/scheduling_assistant")
    }
    const reviewpage = () => {
        navigate("/Reviews")
    }

    const loginscrn = () => {
        navigate("/")
    }

    return (
        <div className="App">
        <h1>Hello {props.student.name}!</h1> 
        <button onClick={summary}> Summary </button>  {'\n'}
        <button onClick={curr_courses}>Current Courses </button>  {'\n'}
        <button onClick={scheduling_assistant}>Scheduling Assistant: </button>
        <button onClick={reviewpage}>See all Course Reviews </button>
        <button onClick={loginscrn}>Go Back: </button>
        </div>
    );

}