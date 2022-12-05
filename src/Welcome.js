import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export default function Welcome(props) {


    return (
 
        <div className="App">
        <h6>Hello</h6>
       <h4>hello {props.name}!</h4>
        </div>
    );

}