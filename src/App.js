import { useState, useEffect, useContext } from "react";

import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import axios from "axios";
import './App.css';
import Login from './Login';
import Welcome from './Welcome';

function App() {

// const UserDataContext = React.createContext();
const [student_id, setStudentID] = useState("");
const [name, setName] = useState("");
const [major, setMajor] = useState("");
const [year, setYear] = useState("");
const [password, setPassword] = useState("");


return (

    <div className="App">
        <Router>
        <Routes>
        <Route path="/" element={<Login student_id={student_id} setStudentID={setStudentID} name={name} setName={setName} major={major} setMajor={setMajor} password={password} setPassword={setPassword} year={year} setYear={setYear}/>} />
        <Route path="/welcome" element={<Welcome student_id={student_id} setStudentID={setStudentID} name={name} setName={setName} major={major} setMajor={setMajor} password={password} setPassword={setPassword} year={year} setYear={setYear}/>} />
        </Routes>
        
    </Router> 
    </div>
   
);
}

export default App;
