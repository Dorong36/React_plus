import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import styled from 'styled-components'
import Tab from './Tab';
import Tab2 from './Tab2';

type MyType = {bg : string, txt : string}

// styled-component
let YellowBtn = styled.button<MyType>`
    background : ${props => props.bg};
    color : ${props => props.bg == 'green'? 'black' : 'white'};
    padding : 5px;
    margin : 10px;
`

let Box = styled.div`
    background : grey;
    color : white;
    padding : 20px;
`


// 라이프사이클 - 과거 class 문법
class Detail02 extends React.Component {
    componentDidMount(){
        // 컴포넌트 mount시 여기 코드가 실행됨
    }
    componentDidUpdate(){
        // 컴포넌트 update시 여기 코드가 실행됨
    }
    componentWillUnmount(){
        // 컴포넌트 unmount되려하면 여기 코드가 실행됨

    }
}



function Detail(props : {data : {id : number, title : string, content : string, price : string}[]}){

    let [tf, setTf] = useState(true);
    let [fade2, setFade2] = useState('');

    useEffect(()=>{
        // mount, update시 여기 코드가 실행됨
        let timer = setTimeout(()=>{
            setTf(false);
        }, 2000)
        return ()=>{
            clearTimeout(timer)
        }
    }, [])
    
    let [count, setCount] = useState(0);


    // :id로 붙어있던 값이 {id}로 들어옴
    let {id} = useParams();

    // id type narrowing
    let idx : number;
    if(id && typeof id == 'string'){
        idx = parseFloat(id);
    }else{
        idx = 0;
    }

    // 전체 페이지 페이드인 효과
    useEffect(()=>{
        setFade2('end');
        return(
            () => setFade2('') // unmount 시 실행해서 state 원상복귀
        )
    }, []) // 빈배열 넣어줘서 mount시에만 실행

    // ✅ find 활용해서 id값 비교하는 코드
    let findOne = props.data.find( x => x['id'] == idx )
    if(idx >= props.data.length || isNaN(idx)){
        return (<div>wrong url</div>)
    }else {
        return(
            <div className={`container start ${fade2}`}>
                <Box></Box>
                {
                    tf ? <div className="event">2초 이내에 구매시 할인</div> : null
                }
                <YellowBtn bg="blue" txt="white">hellohello~~</YellowBtn>
                <div className="row">
                    <div className="col-md-6">
                    <img src="/img/iphone.png" width="100%" />
                    </div>
                    <div className="col-md-6">
                    <h4 className="pt-5">{findOne?.title}</h4>
                    <p>{findOne?.content}</p>
                    <p>{findOne?.price}</p>
                    <button className="btn btn-danger">주문하기</button> 
                    </div>
                </div>
                {/* <button onClick={()=>{setCount(count+1)}}>+1</button><span>{count}</span> */}
                <Tab/>
            </div> 
        )
    }



    // ✅ forEach 반복문으로 id값을 검사하는 코드
    // let title;
    // let content;
    // let price;
    
    // props.data.forEach((e)=>{
    //     if(e['id'] == idx){
    //         title=e.title;
    //         content = e.content;
    //         price = e.price;
    //     }
    // })

    // if(idx >= props.data.length || isNaN(idx)){
    //     return (<div>wrong url</div>)
    // }else {
    //     return(
    //         <div className="container">
    //             <div className="row">
    //                 <div className="col-md-6">
    //                 <img src="/img/iphone.png" width="100%" />
    //                 </div>
    //                 <div className="col-md-6">
    //                 <h4 className="pt-5">{title}</h4>
    //                 <p>{content}</p>
    //                 <p>{price}</p>
    //                 <button className="btn btn-danger">주문하기</button> 
    //                 </div>
    //             </div>
    //         </div> 
    //     )
    // }


    
    // ✅ props로 접근하는 기본코드
    // if(idx >= props.data.length){
    //     return (<div>wrong url</div>)
    // }else {
    //     return(
    //         <div className="container">
    //             <div className="row">
    //                 <div className="col-md-6">
    //                 <img src="/img/iphone.png" width="100%" />
    //                 </div>
    //                 <div className="col-md-6">
    //                 <h4 className="pt-5">{props.data[idx].title}</h4>
    //                 <p>{props.data[idx].content}</p>
    //                 <p>{props.data[idx].price}</p>
    //                 <button className="btn btn-danger">주문하기</button> 
    //                 </div>
    //             </div>
    //         </div> 
    //     )
    // }
    
}

export default Detail;