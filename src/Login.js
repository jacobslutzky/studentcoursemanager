import "./App.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
        console.log(data);
        addStudent(data);
      };
     // function to make a POST req to the server to insert data to MySQL db
    const addStudent = (data) => {
      axios.post("http://localhost:3000/studentsinfo", data).then(() => {
        // 4.
        props.setStudents([
            ...props.studentsinfo, {data}]);
      });
    };

  return (
    <form className="login-student" onSubmit={handleSubmit(onSubmit)}>
            <h4>Login Student</h4>
             <input {...register("name")}
              type="text"
              placeholder="Student Name"
              name="name"
              
            />
            <input {...register("major")}
              type="text"
              placeholder="Student Major"
              name="major"
            />
            <input {...register("class")}
              type="text"
              placeholder="Student Class"
              name="class"
            />
      
            <input id="btn" type="submit" />
          </form>
)

   }