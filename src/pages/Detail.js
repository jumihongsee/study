import { useParams } from "react-router-dom"
import styled from 'styled-components'

let YellowBtn =  styled.button `

  background : ${props => props.bg == 'true'? 'blue' : 'red'};
  color: ${props => props.bg == 'true' ? 'white' : 'black'};
  padding : 8px;
  border: none;
  margin: 0 10px;

`


function Detail(props){
    
  let {urlId} = useParams()
  let item = props.shoes.find(function(a){
    return a.id == urlId
  })
  console.log(item.id)

    return(
      
        <div className="container">
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
       
            </div>
          </div>
        </div> 

    )




  
  }



  export default Detail