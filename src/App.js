import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Navbar, Container, Nav } from 'react-bootstrap'
import { createContext, lazy, useEffect, useState, Suspense } from 'react';
import  data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import 이미지 from './img/bg.png'
import axios from 'axios';
import { useQuery } from 'react-query';


// import Detail from './pages/Detail.js';
// import Cart from './pages/Cart.js';
// 필요할때 import 해주는 lazy 함수
// 사이트 발행시에 별도의 js 파일로 분리돼서 발행이 된다. 
// 단점은 Cart와 Detail 컴포넌트 로딩시간이 발생하는데
// 그 사이에 로딩바나 안내문 같은걸 띄워줄 수 있음 Suspense 로 UI 삽입이 가능하다
const Detail = lazy(() => import('./pages/Detail.js'));
const Cart = lazy(() => import('./pages/Cart.js'));
const Test = lazy(() => import('./pages/Test.js'));





//export let Context1 = createContext() // state 보관함

function App() {






  useEffect(()=>{

    //이미 watched 항목이 있으면 setItem 하지 말아줘요
    let watched = localStorage.getItem('watched');

    if(watched){
    }else{
      localStorage.setItem('watched', JSON.stringify([]))
    }


  },[])
  
  
  let obj = {name : 'kim'}
  localStorage.setItem('data', JSON.stringify(obj)) // JSON.stringify() 객체나 배열 을 JSON 형태로 변환
  // console.log(obj)
  let 꺼낸거 = localStorage.getItem('data')
  //console.log(꺼낸거) //JSON 형태로 되어 있음을 확인할 수 있음 

  // console.log(JSON.parse(꺼낸거).name) // JSON.parse() JSON 파일을 객체나 배열형식으로 변환해줌 

  // 숙제 : 유저가 상세페이지에서 봤던 상품의 번호들을 localstorage에 저장하기
  // watched : [] <- id 값 push + 중복번호는 막아주기 (set 자료형)

  let watched = localStorage.getItem('watched');
  watched = JSON.parse(watched);




  // 아주 고귀하신 데이터 
  let [shoes, setShoes] = useState(data)

  let [재고] = useState([10,11,12])
  let [buttonCount, setButtonCount] = useState(0)
  let [popup, setPopup] = useState(false)
  let [loading, setLoading] = useState(false)
  let [goodsPop, setGoodsPop] = useState(true);


  


  let navigate = useNavigate();

  // useQuery 의 장점
  // 성공/실패/로딩중 쉽게 파악가능  + 틈만 나면 자동으로 refetch 해줌 + ajax로 가져온 결과는 state 공유 필요없음
  // ajax 결과 캐싱가능 
  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ 
      console.log('요청됨')
      return a.data 
      
      }),
      { staleTime : 2000 } // 타이머 기능  2초안에는 리패치가 안됨
  )
  console.log(result)




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
          <Nav style={{color : '#fff'}}>
            {/*  &&로 간결하게 if문 작성  */}
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && `Hello ${result.data.name}`}
          </Nav>

        </Container>
      </Navbar>
      {watched && goodsPop === true && <GoodsPop watched={watched} shoes={shoes} goodsPop={goodsPop} setGoodsPop={setGoodsPop} />}
      <Suspense fallback={<>로딩중 기달</>}>
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

        

          <Route path='/cart' element={ 
      
              <Cart></Cart>

    
            
            }> </Route>
          
          <Route path='/about' element={<About/>}>
              <Route path='member' element={<div>맴버임</div>}></Route>
              <Route path='location' element={<>로케이션임</>}></Route>
          </Route>
          <Route path='/event' element={<Event />}>
                <Route path='one' element={ <Test></Test>}></Route>
                <Route path='two' element={<h2>생일기념 쿠폰받기</h2>}></Route>
            
          </Route>

          <Route path='*' element={<div style={{fontSize : "50vw"}}>404</div>} />
        </Routes>
      </Suspense>

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


function GoodsPop({ watched, shoes, goodsPop, setGoodsPop }){
  console.log(shoes)
  return(
    <>
           <div className='goods-pop'>
            <div className='xbtn'><p onClick={()=>{
              setGoodsPop(false)
            }} >x</p></div>
              {
     
                watched.slice(0, 3).map((a,i)=>{
                    console.log('id값'+a)
                  return(
            
                  
                      <div className='goods-box'>
                        <img src={`https://codingapple1.github.io/shop/shoes${a+1}.jpg`} />
                        {/* <p>{shoes[a].title}</p> */}
                      </div>

                  )

                })

        
              }
          </div>
    </>


  )

}



 function Card(props){
  

 

  return(
    <div className="col-md-4">
      <img
      
        onClick={()=>{


          props.navigate(`/detail/${props.shoes.id}`)



        }}

      src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )

}