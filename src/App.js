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

const [student_id, setStudentID] = useState("");
const [name, setName] = useState("");
const [major, setMajor] = useState("");
const [year, setYear] = useState("");
const [password, setPassword] = useState("");

const [course_id, setCourseID] = useState("");
const [available_courses, setAvailableCourses] = useState("");

const getAvailableCourses = () => {

    axios.get("http://localhost:3000/get_available_courses").then((res) => {
        setAvailableCourses(res.data);
});
};
useEffect(() => {
    getAvailableCourses();
}, [available_courses]);

return (

    <div className="App">
        <Router>
        <Routes>
        <Route path="/" element={<Login student_id={student_id} setStudentID={setStudentID} name={name} setName={setName} major={major} setMajor={setMajor} password={password} setPassword={setPassword} year={year} setYear={setYear}/>} />
        <Route path="/welcome" element={<Welcome name={name} setName={setName} /> } />
        <Route path="/summary" element={<Summary student_id={student_id} setStudentID={setStudentID} name={name} setName={setName} major={major} setMajor={setMajor} password={password} setPassword={setPassword} year={year} setYear={setYear}/>} />
        <Route path="/Current_courses" element = {<Current_courses />}/>
        <Route path="/Add_course" element = {<Add_course course_id={course_id} setCourseID={setCourseID}/>}/>
        <Route path="/Scheduling_Assistant" element = {<Scheduling_assistant available_courses={available_courses} setAvailableCourses={setAvailableCourses} getAvailableCourses={getAvailableCourses}/>}/>
        </Routes>
        
    </Router> 
    </div>
   
);
}

export default App;
