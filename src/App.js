import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Navbar, Container, Nav } from 'react-bootstrap'
import { createContext, useEffect, useState } from 'react';
import  data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import 이미지 from './img/bg.png'
import Detail from './pages/Detail.js';
import axios from 'axios';
import Cart from './pages/Cart.js';

//export let Context1 = createContext() // state 보관함



function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  },[])
  
  
  let obj = {name : 'kim'}
  localStorage.setItem('data', JSON.stringify(obj)) // JSON.stringify() 객체나 배열 을 JSON 형태로 변환
  console.log(obj)
  let 꺼낸거 = localStorage.getItem('data')
  console.log(꺼낸거) //JSON 형태로 되어 있음을 확인할 수 있음 

  console.log(JSON.parse(꺼낸거).name) // JSON.parse() JSON 파일을 객체나 배열형식으로 변환해줌 

  // 숙제 : 유저가 상세페이지에서 봤던 상품의 번호들을 localstorage에 저장하기
  // watched : [] <- id 값 push + 중복번호는 막아주기 (set 자료형)




  // 아주 고귀하신 데이터 
  let [shoes, setShoes] = useState(data)

  let [재고] = useState([10,11,12])
  
  let [buttonCount, setButtonCount] = useState(0)
  let [popup, setPopup] = useState(false)
  let [loading, setLoading] = useState(false)


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
   
                    
                    
                    {
                      loading === true ? 
                      
                      <div className='loading_message'>LOADING ........</div> : null
                    }

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
                    >정렬
                    </Button>
                    <Button className='main-btn'
                      onClick={()=>{
                        setButtonCount(buttonCount + 1)

                        console.log('버튼카운트'+ buttonCount)
                          if(buttonCount === 0){
                            // 3. 버튼 누르면 로딩중입니다 글자 띄우기
                            // 로딩중UI 띄우기
                            setLoading(true)

                            axios.get('https://codingapple1.github.io/shop/data2.json')
                            .then((결과)=>{ // ajax 요청 성공 
                          
                              let resultData = 결과.data
                              let copy = [...shoes]
                              let combineArry = copy.concat(resultData);
                              setShoes(combineArry);
                              // 로딩중UI 숨기기                     
                              setLoading(false)
                            
                              
      
                            })
                            .catch(()=>{ // ajax 요청 실패할 경우
                              console.log('실패함')
                              // 로딩중UI 숨기기
                              setLoading(false)
      
                            })
                          }else if(buttonCount === 1){
                            // 1.응용 문제 버튼 2회 누를떈 7,8,9 상품을 가져오려면? 

                            setLoading(true)
                            axios.get('https://codingapple1.github.io/shop/data3.json').then((결과)=>{

                              let result2 = 결과.data;
                              let copy = [...shoes] 
                              let combineArry = copy.concat(result2);
                              setShoes(combineArry);
                              setLoading(false)

                            })
                            .catch(()=>{
                              console.log('실패함')
                            })
                            
                        

                            
                          }else if(buttonCount >= 2){
                          // 2. 버튼을 세번 누를때는 상품 더 없다고 알려주기 
                            setPopup(true)
                          

                          }
                        

                        ///////////////////////////// 서버로 데이터 전송하는 POST 요청
                        ///////////////////////////// axios.post('/서버 url', {name : 'kim'})

                        ///////////////////////////// 동시에 ajax요청 여러개 하려면
                        ///////////////////////////// Promise.all([ axios.get('/ur1'), axios.get('/url2') ]).then(()=>{}).catch(()=>{})

                        ///////////////////////////// 원래는 서버와 문자만 주고받을 수 있음 - 문자 JSON파일을 axios가 다시 array로 자동으로 바꿔 사용해 주는 것
                        ///////////////////////////// get요청말고 fetch도 가능하나 JSON을 arry로 변환하는 과정이 필요해진다.

                        



                        
                      
                      }}
                    >더보기
                    </Button>


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
                    {
                      popup === false ? null : 
                        <div className='no_goods_pop'>
                          <div onClick={()=>{
                            setPopup(false)
                          }}>X</div>
                          <p>더 이상 상품이 없습니다만 ....</p>
                        </div>
                    }
                    

                  </div>

                </div> 
              </div>






              </>          
          } />


        <Route path='/detail/:urlId' element={ // :id url 파라미터 (페이지 여러게 만들고 싶으면) 
          <div>   
            {/* <Context1.Provider value={{재고, shoes}}> */}
              <Detail  shoes={shoes}  /> 
            {/* </Context1.Provider> */}
     
          </div>
          
          } />

       

        <Route path='/cart' element={ <Cart></Cart>  }> </Route>
        
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
      
        onClick={()=>{

          console.log('props.navigate:', props.navigate);
          console.log('props.shoes.id:', props.shoes.id);

          props.navigate(`/detail/${props.shoes.id}`)
        }}

      src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )

}