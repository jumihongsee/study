// import { Navigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import 이미지 from './../img/bg.png'
import { useState } from 'react';

function Main(props){

   let shoes = props.shoes ;
   let [sortShoes, setSortShoes] = useState(shoes)

    return(
      <div>
        <div className='main-bg' style={{backgroundImage : `url(${이미지})`}}></div> 
        <Button   
          style={{marginTop : '20px'}}

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
            setSortShoes(sortArry)
          }}
        >정렬</Button>
        <div className="container" >
          <div className="row">
          {
          sortShoes.map((a,i)=>{
                return(
                  <Card 
                    key = {i}
                    sortShoes={sortShoes[i]}
                    i = {i}
                    navigate ={props.navigate}
                  ></Card>
                )
            })
          }
  
          </div>
        </div> 
      </div>
    )
  }


  export default Main 

  function Card(props){

    return(
      <div className="col-md-4">
        <img
        
          onClick={()=>{props.navigate(`/detail/${props.sortShoes.id}`)}}

        src={`https://codingapple1.github.io/shop/shoes${props.sortShoes.id + 1}.jpg`} width="80%" />
        <h4>{props.sortShoes.title}</h4>
        <p>{props.sortShoes.price}</p>
      </div>
    )
  
  }
  