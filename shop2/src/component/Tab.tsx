import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

import Nav from 'react-bootstrap/Nav';


function Tap(){

    let contents = ['상세정보입니다', '후기입니다', '나문희입니다'];

    let [idx, setIdx] = useState(0);

    return (
        <div>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                <Nav.Link eventKey="link0" onClick={()=>{setIdx(0)}}>상세정보</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link1" onClick={()=>{setIdx(1)}}>후기</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link2" onClick={()=>{setIdx(2)}}>문의</Nav.Link>
                </Nav.Item>
            </Nav>
            {/* <div className="start">{contents[idx]}</div> */}
            <TapContent tap={idx}></TapContent>
            
        </div>
    )
}

function TapContent(props : {tap : number}){

    let [fade, setFade] = useState('');

    useEffect(()=>{
        let a = setTimeout(()=>{
            setFade('end');
        }, 100)
        
        return ()=>{clearTimeout(a); setFade('')}
    }, [props.tap])
    
    return (
        <div className={`start ${fade}`}>
            {[<div>상세정보 입니다</div>, <div>후기 입니다</div>, <div>문의 입니다</div>][props.tap]}
        </div>
        
    )
}

export default Tap