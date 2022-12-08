import "./App.css";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate, useParams, useLocation} from "react-router-dom";

export default function CheckReviews(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:3000/get_all_reviews")
          .then(res => setData(res.data))
          .catch(err => console.log(err));
      }, []);

    let navigate = useNavigate();

    const back = () => {
        navigate("/welcome")
    }

    return (
        <div>
            <h1>See All Reviews</h1>
          {data.map((val, key) => {
            return(
                <div key = {val.course_id}>
                    <h1>{"CourseID: " + val.course_id}</h1>
                    <h3>{"Date: " + val.date}</h3>
                    <h4>{"Rating: " + val.rating} </h4>
                </div>
            )
          }
          )}
         <button onClick={back} >Back</button>
        </div>

      );








}

