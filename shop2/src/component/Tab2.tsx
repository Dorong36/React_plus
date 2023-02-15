import React from "react";
import { useState } from "react";
import styled from "styled-components";

import Nav from 'react-bootstrap/Nav';
import { propTypes } from "react-bootstrap/esm/Image";



function Tap2(){


    let [tap, setTap] = useState(0);


    return (
        <div>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                <Nav.Link eventKey="link0" onClick={()=>{setTap(0)}}>상세정보</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link1" onClick={()=>{setTap(1)}}>후기</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link2" onClick={()=>{setTap(2)}}>문의</Nav.Link>
                </Nav.Item>
            </Nav>
            <TapContent tap = {tap}></TapContent>
        </div>
        
    )

}

function TapContent(props : {tap : number}){
    if(props.tap == 0){
        return <div>상세정보 입니다</div>
    }else if(props.tap == 1){
        return <div>후기 입니다</div>
    }else if(props.tap == 2){
        return <div>문의 입니다</div>
    }else {
        return <div>그런거 없다</div>
    }
}

export default Tap2;