import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Navbar, Container, Nav } from 'react-bootstrap'

import { useState } from 'react';
import  data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Main from './pages/Main.js';
import Detail from './pages/Detail.js';


function App() {


  

  let [shoes] = useState(data)

  let navigate = useNavigate();


  return (
    <div className="App">



     <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img src={process.env.PUBLIC_URL + '/logo192.png'} className='logo' /></Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link><Link to="/">HOME</Link></Nav.Link>
            <Nav.Link><Link to='/cart'>CART</Link></Nav.Link>
            <Nav.Link><Link to='/about'>ABOUT</Link></Nav.Link> */}
            <Nav.Link onClick={()=>{ navigate('/') }}>HOME</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>CART</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about') }}>ABOUT</Nav.Link> 
            
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={ <Main shoes={shoes}/>} />
        <Route path='/detail' element={<div> <Detail /> </div>} />
        <Route path='/about' element={<About/>}>
            <Route path='member' element={<div>맴버임</div>}></Route>
            <Route path='location' element={<>로케이션임</>}></Route>
        </Route>





        <Route path='*' element={<div style={{fontSize : "50vw"}}>404</div>} />
      </Routes>



    </div>
  );
}





export default App;


function About(){

  return(
    <>
      <h2>회사정보임</h2>
      <Outlet></Outlet>
    </>
  )

}
