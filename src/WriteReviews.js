import "./App.css";
import React from 'react';
import axios from "axios";
import { useNavigate, useParams, useLocation} from "react-router-dom";


export default function WriteReviews(props) {
    const date = new Date();
    const fullDate = date.toDateString();

    let navigate = useNavigate();
    const { course_id } = useParams();
    const location = useLocation();
    

    const next = (studentId, courseId, date, rating,final_grade) => {
        console.log(date);
        axios.post("http://localhost:3000/add_review", {
          data: { student_id: studentId, course_id: courseId, date: date, rating: rating },
        });
        axios.post("http://localhost:3000/finish_course", {
         data:{student_id:studentId, final_grade: final_grade,
         course_id: courseId},
     })
        navigate("/Current_courses")
        props.getAvailableCourses()
        props.getCurrCourses()
      };
        //idk what this does atm




    const handleSelect = (e) => {
        console.log(e.target.value);
        props.setRating(e.target.value);
      };
    const handleSelect1 = (e) => {
        console.log(e.target.value);
        props.setGrade(e.target.value);
      };
    


    //<h1><button onClick = {() =>  next(location.state.course_id)} >Add Review</button></h1>



    return (
        <div className = "App">
            <h1><b>Selected Course: </b></h1>
            <h1>{location.state.course_id}</h1>
            <h1>Current Date: {fullDate}</h1>
            <h1>Rating out of 5?</h1>
            
            <select defaultValue={{ label: "1", value: 1 }} onChange={(e) => {props.setRating(e.target.value)}}>
                <option value=" "> </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <p> Student ID: {props.student_id}</p>
            <h1>Final Grade:</h1>
            <select  onChange={(e) => {props.setGrade(e.target.value)}}>
                <option value=" "> </option>
                <option value="100">100</option>
                <option value="90">90</option>
                <option value="80">80</option>
                <option value="70">70</option>
                <option value="0">Fail</option> 

            </select>

            <h1><button onClick = {() => next(props.student_id, location.state.course_id, fullDate, props.rating, props.grade)} >Add Review</button></h1>




            



    </div>
    );





}
