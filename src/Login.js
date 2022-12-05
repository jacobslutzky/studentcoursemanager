import "./App.css";
import { useState, useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";


export default function Login(props) {
  let navigate = useNavigate();
  const [nameReg, setNameReg] = useState("");
  const [majorReg, setMajorReg] = useState("");
  const [yearReg, setYearReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [studentIDReg, setStudentIDReg] = useState("");
  
  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const register = () => {
    axios.post("http://localhost:3000/register", {
      name: nameReg,
      year: yearReg,
      major: majorReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
      props.setStudent(response.data[0])
      
  });

  navigate("/welcome")

  };

  const login = () => {
    axios.post("http://localhost:3000/login_student", {
      student_id: studentIDReg,
      password: passwordReg,
    }).then((response) => {
      if (response.data.message) {
        
      } else {
        props.setStudent(response.data[0])
        navigate("/welcome")
      }
    });
    
  };



  return (
 
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => {
            setNameReg(e.target.value);
          }}
        />
        <label>Major</label>
        <input
          type="text"
          onChange={(e) => {
            setMajorReg(e.target.value);
          }}
        />
        <label>Class</label>
        <input
          type="text"
          onChange={(e) => {
            setYearReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Student ID..."
          onChange={(e) => {
            setStudentIDReg(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={login}> Login </button>
      </div>

    </div>
);

   }