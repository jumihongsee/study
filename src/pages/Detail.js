import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from 'styled-components'



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


  
  let {urlId} = useParams()
  let item = props.shoes.find(function(a){
    return a.id == urlId
  })
  let [alert, setAlert] = useState(true)
  let [count, setCount] = useState(0)
  let [inputValue, setInputValue] = useState('')

  useEffect(()=>{
    // 랜더링이 된 후에 동작한다 
    // 어려운 연산이나, 서버에서 데이터를 가져올때 , 타이머를 장착하는 작업 등을 할때 사용
    // 1. 재렌더링마다 코드를 실행하고 싶엉
    let alertTimer =  setTimeout(()=>{
        setAlert(false)
        console.log(2)
    }, 2000)

      return ()=>{
        //useEffect가 동작전에 실행 return()=>{} // 기존코드 치울때
        //unmount(제거)시 1회 코드를 실행하고 싶어 or useEffect 실행전에 실행하고 싶을때 
        console.log(1)
        clearTimeout(alertTimer)  
      }
   
   }, [count, inputValue]) 
   // 디펜던시 [] : 컴포넌트가 장착될 시 1회만 실행하고 싶으면 ㄱㄱ
   // 2. [] : mount (장착) 시 1회 코드 실행하고 싶으면 ㄱㄱ
   // 3. [state명] : 특정 state 변경시에만 실행하고싶으면 [state명]

   //input에 숫자말고 다른거 입력하면 그러지말라고 안내메세지 띄우기 
 



    return(
      
        <div className="container">
          {count}
          <button onClick={()=>{ setCount(count + 1) }}>카운트 업</button>
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
              <button className="btn btn-danger">주문하기</button> 
              <YellowBtn bg = "true"
                onClick={()=>{
                  
                }}
              
              >버튼</YellowBtn>
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
        </div> 

    )




  
  }



  export default Detail