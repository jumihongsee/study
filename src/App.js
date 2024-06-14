import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Navbar, Container, Nav } from 'react-bootstrap'
import { useState } from 'react';
import  data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import 이미지 from './img/bg.png'
import Detail from './pages/Detail.js';
import axois from 'axios'
import axios from 'axios';



function App() {


  // 아주 고귀하신 데이터 
  let [shoes, setShoes] = useState(data)
  let [buttonCount, setButtonCount] = useState(0)

  let navigate = useNavigate();


  return (
    <div className="App">



     <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img src={process.env.PUBLIC_URL + '/logo192.png'} className='logo' /></Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link><Link to="/">HOME</Link></Nav.Link>
            <Nav.Link><Link to='/cart'>CART</Link></Nav.Link>
            <Nav.Link><Link to='/about'>ABOUT</Link></Nav.Link> */}
            <Nav.Link onClick={()=>{ navigate('/') }}>HOME</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>CART</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about') }}>ABOUT</Nav.Link> 
            <Nav.Link onClick={()=>{ navigate('/event') }}>EVENT</Nav.Link> 
            
          </Nav>
        </Container>
      </Navbar>

      <Routes>



        <Route path='/' element={ 
              <>
                <div className='main-bg' style={{backgroundImage : `url(${이미지})`}}></div> 
                <div>
   
                <Button className='main-btn' 
                  onClick={()=>{
                    let copy = [...shoes];
                    let sortArry = copy.sort((a,b)=>{
                      
                        if(a.title < b.title){
                          return -1
                        }else if(a.title > b.title){
                          return 1
                        }
                        return 0 
                    });
                    setShoes(sortArry)
                  }}
                >정렬</Button>
                <Button className='main-btn'
                  onClick={()=>{
                    setButtonCount(buttonCount + 1)
                      if(buttonCount === 0){
                        console.log('한번')
                        axois.get('https://codingapple1.github.io/shop/data2.json')
                        .then((결과)=>{ // ajax 요청 성공 
                      
                          let resultData = 결과.data
  
                          let copy = [...shoes]
                          let combineArry = copy.concat(resultData);
                          console.log(combineArry)
                          setShoes(combineArry);
                          // 로딩중UI 숨기기
  
  
                          // 1.응용 문제 버튼 2회 누를떈 7,8,9 상품을 가져오려면? 
                          // 버튼 누른 횟수를 기록
                          // 2. 버튼을 세번 누를때는 상품 더 없다고 알려주기 
                          // 3. 버튼 누르면 로딩중입니다 글자 띄우기
                          
  
                        })
                        .catch(()=>{ // ajax 요청 실패할 경우
                          console.log('실패함')
                          // 로딩중UI 숨기기
  
  
                        })
                      }else if(buttonCount === 1){
                        Promise.all([axios.get('https://codingapple1.github.io/shop/data2.json'), axios.get('https://codingapple1.github.io/shop/data3.json')]).then((결과2)=>{
                          
                          console.log(결과2)
                          let copyResult = [...결과2];
                          console.log(copyResult);

                        })

                        
                      }else if(buttonCount === 3){

                      }
                    
                      //로딩중 UI띄우기


 
            

          


                    ///////////////////////////// 서버로 데이터 전송하는 POST 요청
                    ///////////////////////////// axios.post('/서버 url', {name : 'kim'})

                    ///////////////////////////// 동시에 ajax요청 여러개 하려면
                    ///////////////////////////// Promise.all([ axios.get('/ur1'), axios.get('/url2') ]).then(()=>{})

                    /////////////////////////////


                    
                  
                  }}
                >더보기</Button>
                <div className="container" >
                  <div className="row">
                  {
                  shoes.map((a,i)=>{
                        return(
                          <Card 
                            key = {i}
                            shoes={shoes[i]}
                            i = {i}
                            navigate ={navigate}
                          ></Card>
                        )
                    })
                  }
                  </div>

                </div> 
              </div>






              </>          
          } />


        <Route path='/detail/:urlId' element={ // :id url 파라미터 (페이지 여러게 만들고 싶으면) 
          <div>   
            <Detail  shoes={shoes}  /> 
          </div>
          
          } />
        <Route path='/cart' element={<>카트임</>}> </Route>
        
        <Route path='/about' element={<About/>}>
            <Route path='member' element={<div>맴버임</div>}></Route>
            <Route path='location' element={<>로케이션임</>}></Route>
        </Route>
        <Route path='/event' element={<Event />}>
              <Route path='one' element={<h2>첫 주문시 양배추즙 서비스</h2>}></Route>
              <Route path='two' element={<h2>생일기념 쿠폰받기</h2>}></Route>
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

function Event(){
  return(
    <>
      <h2>오늘의 이벤트</h2>
      <Outlet></Outlet>
    </>
  )
}



 function Card(props){

  return(
    <div className="col-md-4">
      <img
      
        onClick={()=>{props.navigate(`/detail/${props.shoes.id}`)}}

      src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )

}