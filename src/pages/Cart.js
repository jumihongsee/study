import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeName, ageUp } from "./../store/userSlice.js"
import { countUp } from "../store.js"

function Cart(){

    let state = useSelector((state)=>{return state})

    let user = useSelector((state)=> state.user.name)
    let stock = useSelector((state)=> state.stock)
    let item = useSelector((state)=> state.item)

    // state 변경하는 법 (3) store.js로 요청하는 함수인 dispatch 사용
    let dispatch = useDispatch()

    return(
       <div>
            {state.user.name}의 장바구니 {state.user.age} <br/>
             <button
                onClick={()=>{
                    dispatch(ageUp(3))
                }}
             >버튼</button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>기타</th>
                    </tr>
                </thead>
                {
                    item.map((a,i)=>{

                        return(
                            <tbody key={i}>
                                <tr>
                                <td>{i + 1}</td>
                                <td>{item[i].name}</td>
                                <td>{item[i].count}</td>
                                <td><button onClick={()=>{
                                    // console.log('아이디값'+ item[i].id)
                                   let findItem =  item.find(a => item[i].id === i)
                                    ?  dispatch(countUp(i)) : null                                   
                                }} >+</button></td>
                                </tr>
                            </tbody>
                        )

                    })
                }

            </Table> 
       </div>
    )

}

export default Cart