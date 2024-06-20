import { useContext, useEffect, useState } from "react"
import { Route, useParams } from "react-router-dom"
import styled from 'styled-components'
import {  Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../store.js"

//import { Context1 } from './../App.js'

let YellowBtn =  styled.button `

  background : ${props => props.bg == 'true'? 'blue' : 'red'};
  color: ${props => props.bg == 'true' ? 'white' : 'black'};
  padding : 8px;
  border: none;
  margin: 0 10px;

`
let Input = styled.input `
  margin-top:20px;
  border-radius: 20px;
  border : 4px solid #000;
  padding : 5px;
`


function Detail(props){


  //let {재고} = useContext(Context1) // 보관함 해체해주는 함수
  
  let state = useSelector((state)=>{ return state })
  let dispatch = useDispatch()
  console.log(state)


  
  let {urlId} = useParams()
  let item = props.shoes.find(function(a){
    return a.id == urlId
  })
  let [alert, setAlert] = useState(true)
  let [count, setCount] = useState(0)
  let [inputValue, setInputValue] = useState('')
  let [tab, setTab] = useState(0)
  let [fade2, setFade2] = useState('')



  useEffect(()=>{

    console.log(item.id)
    let watched = localStorage.getItem('watched')
    watched =  JSON.parse(watched)
    watched.unshift(item.id)
    watched = new Set(watched);
    watched = Array.from(watched);

    localStorage.setItem('watched', JSON.stringify(watched))

  },[])


  useEffect(()=>{

    // 랜더링이 된 후에 동작한다 
    // 어려운 연산이나, 서버에서 데이터를 가져올때 , 타이머를 장착하는 작업 등을 할때 사용
    // 1. 재렌더링마다 코드를 실행하고 싶엉
    let alertTimer =  setTimeout(()=>{
        setAlert(false)
        console.log(2)
    }, 2000)

    let fadeTimer = setTimeout(()=>{setFade2('end2')},100)

      return ()=>{
        //useEffect가 동작전에 실행 return()=>{} // 기존코드 치울때
        //unmount(제거)시 1회 코드를 실행하고 싶어 or useEffect 실행전에 실행하고 싶을때 
        console.log(1)
        clearTimeout(alertTimer, fadeTimer )  
      }
   
   }, [count, inputValue]) 
   
   // 디펜던시 [] : 컴포넌트가 장착될 시 1회만 실행하고 싶으면 ㄱㄱ
   // 2. [] : mount (장착) 시 1회 코드 실행하고 싶으면 ㄱㄱ
   // 3. [state명] : 특정 state 변경시에만 실행하고싶으면 [state명]

   //input에 숫자말고 다른거 입력하면 그러지말라고 안내메세지 띄우기 
 



    return(
      
        <div className={`container start2 ${fade2}`}>
          {/* {count} <button onClick={()=>{ setCount(count + 1) }}>카운트 업</button> */}

          
          {
            
            alert != true ? null : 

            <div class="alert alert-warning">
              <p>2초이내 구매시 할인</p>
            </div>
            
          }

          <div className="row">
            <div className="col-md-6">
              <img src={`https://codingapple1.github.io/shop/shoes${item.id + 1}.jpg`}width="100%"/>
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{item.title}</h4>
              <p>{item.content}</p>
              <p>{item.price}</p>
              <button className="btn btn-danger"
                onClick={()=>{
                  dispatch(addItem({id: item.id , name: item.title, count: 1}))
                }}
              
              >주문하기</button> 

              <Input type='text' onChange={(e)=>{
                setInputValue(e.target.value)
                console.log(inputValue)

              }} ></Input>
              <p>내용을 입력해주세요</p>
              {
                 isNaN(inputValue) ?  <p style={{color: 'red'}}>* 숫자만 입력해</p> : null 
              }
         
       
            </div>
          </div>
          <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
          </Nav>

        {/*  html 내부에는 if 조건문을 사용할 수 없기 때문에, if 조건문을 담은 컴포넌트를 가져온다.  */}
        <TabContent tab = {tab}  ></TabContent>

        </div> 

    )

  }

  function TabContent({tab}){ //props 축약문 { } 중괄호 넣어주고 안에 props이름을 적어준다.

    let [fade, setFade] = useState('')
    // let {재고} = useContext(Context1);

    useEffect(()=>{

      // automatic batching 때문에 미세한 시간차를 주어 end값을 나중에 부여할 수 있도록 조작한다. 

      let timer =   setTimeout(()=>{setFade('end')},100)

      return(()=>{
        setFade('')
        clearTimeout(timer)  
      })


    },[tab]) // tab이라는 스테이트가 변동이 있을때 작동을 한다. 

    return(
      <div className={ `start ${fade}` }>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
      </div>
    ) 

   
  }


  export default Detail