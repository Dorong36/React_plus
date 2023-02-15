import React from "react";
import { Outlet } from "react-router-dom";

function About(){
    return(
        <div>
            <h4>회사 기본정보~~</h4>
            <Outlet></Outlet>
        </div>
    )
}

export default About;