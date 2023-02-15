import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import type { RootState, AppDispatch } from '../store'

import {setName, setAge, agePlus} from '../store/userSlice';
import {cntPlus, deleteItem} from '../store';

function Cart(){

    // Redux store에 있던 모든 state가 들어옴
    let states = useSelector((state)=>{ return state })
    // console.log(states)
    // console.log(states.user)
    // console.log(states.stock)

    let cart = useSelector((state) => state.cart);
    let dispatch = useDispatch();



    return(
        <>
            {states.user.name}({states.user.age}세)의 장바구니<br/>
            <Button variant="warning" onClick={()=>{
                dispatch(setAge());
            }}>Age++</Button><br/>
            <Button variant="warning" onClick={()=>{
                dispatch(agePlus(100));
            }}>Age+100</Button>
            <div className="container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>변경</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((a, idx)=>{
                                return(
                                    <tr key={idx}>
                                        <td>{a.id}</td>
                                        <td width={'40%'}>{a.name}</td>
                                        <td>{a.count}</td>
                                        <td><Button variant="warning" onClick={()=>{
                                            dispatch(cntPlus(a.id));
                                        }}>+</Button></td>
                                        <td><Button variant="danger" onClick={()=>{
                                            dispatch(deleteItem(a.id));
                                        }}>Delete</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            
        </>
    )
}

export default Cart;