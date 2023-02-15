import React, { useState, useEffect, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';

// images
import titleImg from './img/appleMain.png'
import img1 from './img/iphone.png';
import img2 from './img/ipad.png';
import img3 from './img/airpod.png';

// files
import data from './data';

// component
import Detail from './component/detail';
import About from './component/About';
import Event from './component/Event';
import Cart from './component/Cart';

// context
// let Context1 = createContext();


let imgs = [img1, img2, img3];


function Products(props : {data : {title : string, content : string, price : string}, idx: number, key : number}){
  let navigate = useNavigate();
  return(
    <Col>
      <img src={imgs[props.idx]} alt="" className='main-products' onClick={()=>{navigate(`/detail/${props.idx}`)}} style={{'cursor' : 'pointer'}}/>
      <h4>{props.data.title}</h4>
      <h6>{props.data.content}</h6>
      <p>{props.data.price}</p>
    </Col>
  )
}


function App() {

  let [products, setProducts] = useState(data);
  let [stock, setStock] = useState([11,22,33]);

  // react-router-dom => useNavigate
  let navigate = useNavigate();

  return (
    <div className="App">

      {/* <Routes>
        <Route path='/' element={<span> main </span>}/>
        <Route path='/detail' element={<span> 상세페이지임 </span>}/>
      </Routes> */}



      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Apple</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
            <Nav.Link onClick={()=>{navigate(-1)}}>뒤로가기</Nav.Link>
          </Nav>
        </Container>
      </Navbar> 

      {/* <Link to="/">Home</Link>
      <Link to="/detail">Detail</Link> */}

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg' style={{backgroundImage : `url(${titleImg})`}}></div>
            <div>
            <Container>
              <Row>
                {
                  products.map((a, idx) => {
                    return <Products data={a} idx={idx} key={idx}></Products>
                  })
                }
              </Row>
            </Container>
            </div>
            <button onClick={()=>{
              axios.get(
                'https://codingapple1.github.io/shop/data2.json'
              ).then(
                (moreData)=>{
                  let sixData = [...products, ...moreData.data];
                  setProducts(sixData);
                }
              ).catch(
                ()=>{console.log("fail")}
              )
            }}> 더 보기 </button>
          </>
        }/>
        <Route path='/detail/:id' element={<Detail data={products}></Detail>}/>

        <Route path='*' element={<div>wrong page url</div>}></Route>

        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>

        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>member info</div>} />
          <Route path="location" element={<div>location info</div>} />
        </Route>
        
        <Route path="/cart" element={<Cart />}></Route>



      </Routes>



      {/* <div className='main-bg' style={{backgroundImage : `url(${titleImg})`}}></div>
      <div>
      <Container>
        <Row>
          {
            products.map((a, idx) => {
              return <Products data={a} idx={idx}></Products>
            })
          }
        </Row>
      </Container>
      </div> */}
    </div>
  );
}

export default App;
