import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Login from './Login';

function App() {
// 1.
const [studentsinfo, setStudents] = useState([]);
// 2.
const getStudents = () => {
    axios.get("http://localhost:3000/studentsinfo").then((res) => {
      setStudents(res.data);
    });
};
// 3.
useEffect(() => {
    getStudents();
}, [studentsinfo]);
return (
<div className="App">
<Login studentsinfo={studentsinfo} setStudents={setStudents} /> 
<div className="studentsinfo">
{studentsinfo.map((item) => {
    return (
       <div className="studentinfo">
          <h3>Name: {item.name}</h3>
          <h3>Major: {item.major}</h3>
          <h3>Class: {item.class}</h3>
       </div>
    );
})}
</div>
</div>
);
}

export default App;
