import "./App.css";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate, useParams, useLocation} from "react-router-dom";

export default function CheckReviews(props) {
    
    let navigate = useNavigate();
    const back = () => {
        navigate("/welcome")
    }
    


      return (
        <div className="App">
        <h1><b>See all ratings</b></h1> 
        <label>Enter min rating</label>
        <input type = "text" 
        onChange={(e) => {props.setMinRating(e.target.value)}}/>

        {props.allReviews.map((element, index) => {
      return(
          <div key = {index}>
              <h1>{"CourseID: " + element.course_id}</h1>
              <h3>{"Name: "+ element.name}</h3>
              <h3>{"Date: " + element.date}</h3>
              <h4>{"Rating: " + element.rating} </h4>
          </div>
      )
    }
    )}
     <button onClick={back} >Back</button>
        </div>
    );

      








}

