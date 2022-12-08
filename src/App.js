import { useState, useEffect, useContext } from "react";

import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import axios from "axios";
import './App.css';
import Login from './Login';
import Summary from "./Summary"
import Welcome from './Welcome';
import Current_courses from "./Current_courses";
import Add_course from "./Add_course";
import Scheduling_assistant from "./Scheduling_assistant";
import WriteReviews from "./WriteReviews";
import CheckReviews from "./Reviews"
import { get } from "react-hook-form";

function App() {

const [student, setStudent] = useState("");
const [subname, setsubname] = useState("");
const [Review, setReview] = useState("");
const [rating, setRating] = useState("");
const [grade, setGrade] = useState("");
const [allReviews, setAllReviews] = useState("");

//const getReviews = () => {
    //axios.post("http://localhost:3000/get_available_courses"

//}
 

const [course_id, setCourseID] = useState("");
const [available_courses, setAvailableCourses] = useState("");
const [curr_courses, setCurrCourses] = useState("");

const getAvailableCourses = () => {
    axios.post("http://localhost:3000/get_available_courses",  {
        student_id: student.student_id, course_subname: subname }).then((res) => {
        setAvailableCourses(res.data);
});
};

const getCurrCourses = () => {
console.log(student)
    axios.post("http://localhost:3000/get_curr_courses",{
        student_id: student.student_id }).then((res) => {
        console.log(res.data)
        setCurrCourses(res.data);
});
};

const getSelectedCourse = () => {
    console.log(student)
    axios.post("http://localhost:3000/get_curr_courses",{
        student_id: student.student_id }).then((res) => {
        console.log(res.data)
        setCurrCourses(res.data);
});
};

const getAllReviews = () => {
    axios.post("http://localhost:3000/get_all_reviews",{
         }).then((res) => {
    });
    };



useEffect(() => {
    getAvailableCourses();
}, [student.student_id, subname]);

useEffect(() => {
    getCurrCourses();
}, [student.student_id]);

return (

    <div className="App">
        <Router>
        <Routes>
        <Route path="/" element={<Login student ={student} setStudent={setStudent} />} />
        <Route path="/welcome" element={<Welcome student ={student} /> } />
        <Route path="/summary" element={<Summary student ={student} />} />
        <Route path="/Current_courses" element = {<Current_courses curr_courses={curr_courses} setCurrCourses={setCurrCourses} getAvailableCourses = {getAvailableCourses} student_id = {student.student_id} getCurrCourses = {getCurrCourses}/>}/>
        <Route path="/Scheduling_Assistant" element = {<Scheduling_assistant student={student} setStudent={setStudent} course_id={course_id} setCourseID={setCourseID} available_courses={available_courses} setAvailableCourses={setAvailableCourses} getAvailableCourses={getAvailableCourses} setsubname = {setsubname} subname = {subname} getCurrCourses = {getCurrCourses} />}/>
        <Route path="/WriteReviews" element = {<WriteReviews curr_courses={curr_courses} setCurrCourses={setCurrCourses} getAvailableCourses = {getAvailableCourses} student_id = {student.student_id} getCurrCourses = {getCurrCourses} setReview = {setReview} Review = {Review} setRating = {setRating} rating = {rating} setGrade = {setGrade} grade = {grade} />}/>
        <Route path="/Reviews" element = {<CheckReviews setAllReviews = {setAllReviews} allReviews = {allReviews}  curr_courses={curr_courses} setCurrCourses={setCurrCourses} getAvailableCourses = {getAvailableCourses} student_id = {student.student_id} getCurrCourses = {getCurrCourses} setReview = {setReview} Review = {Review} setRating = {setRating} rating = {rating} setGrade = {setGrade} grade = {grade} />}/>
        </Routes>
        
    </Router> 
    </div>
    //element ={<Reviews student ={student} course_id = {course_id} />}
   
);
}

export default App;
