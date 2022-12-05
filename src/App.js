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

function App() {

const [student, setStudent] = useState("");


const [course_id, setCourseID] = useState("");
const [available_courses, setAvailableCourses] = useState("");
const [curr_courses, setCurrCourses] = useState("");

const getAvailableCourses = () => {
    axios.get("http://localhost:3000/get_available_courses",  {
        student_id: student.student_id }).then((res) => {
        setAvailableCourses(res.data);
});
};

const getCurrCourses = () => {

    axios.get("http://localhost:3000/get_curr_courses",{
        student_id: student.student_id }).then((res) => {
        setCurrCourses(res.data);
});
};

useEffect(() => {
    getAvailableCourses();
}, [available_courses]);

useEffect(() => {
    getCurrCourses();
}, [curr_courses]);

return (

    <div className="App">
        <Router>
        <Routes>
        <Route path="/" element={<Login student ={student} setStudent={setStudent} />} />
        <Route path="/welcome" element={<Welcome student ={student} /> } />
        <Route path="/summary" element={<Summary student ={student} />} />
        <Route path="/Current_courses" element = {<Current_courses curr_courses={curr_courses} setCurrCourses={setCurrCourses}/>}/>
        <Route path="/Scheduling_Assistant" element = {<Scheduling_assistant student={student} setStudent={setStudent} course_id={course_id} setCourseID={setCourseID} available_courses={available_courses} setAvailableCourses={setAvailableCourses} getAvailableCourses={getAvailableCourses}/>}/>
        </Routes>
        
    </Router> 
    </div>
   
);
}

export default App;
