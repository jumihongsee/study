import 이미지 from './../img/bg.png'

function Main(props){
    return(
      <div>
        <div className='main-bg' style={{backgroundImage : `url(${이미지})`}}></div> 
        <div className="container">
          <div className="row">
          {
          props.shoes.map((a,i)=>{
                return(
                  <Card
                    key = {i}
                    shoes={props.shoes[i]}
                    i = {i}
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
        <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.price}</p>
      </div>
    )
  
  }
  