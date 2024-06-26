import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeName, ageUp } from "./../store/userSlice.js"
import { countUp, deleteItem } from "../store.js"
import { useState, memo, useMemo } from "react"



let Child = memo( function(){
    // 상위 컴포넌트가 재렌더링 될때 자식 컴포넌트도 전부 재렌더링이 된다. 이것을 막기 위해서 꼭 필요할 때만 재렌더링 하게 만들 수 있음.
    // 따라서 memo를 사용 

    console.log('재랜더링')
    return <div>자식임</div>
    
    //memo 의 원리 : props가 변할 때만 재렌더링해줌 + 보통 무거운 컴포넌트에만 붙여논다 


}

)


function 함수(){
    return //반복문10억번 돌린결과
}

function Cart(){

    let result = 함수;
    useMemo(()=>{ // 컴포넌트 렌더링시 1회만 실행해줌 
        return 함수()
    }, [])

    let state = useSelector((state)=>{return state})

    let user = useSelector((state)=> state.user.name)
    let stock = useSelector((state)=> state.stock)
    let item = useSelector((state)=> state.item)

    // state 변경하는 법 (3) store.js로 요청하는 함수인 dispatch 사용
    let dispatch = useDispatch()

    return(
       <div>
            <Child></Child>

            {state.user.name}의 장바구니 {state.user.age} <br/>
             <button
                onClick={()=>{
                    dispatch(ageUp(3))
                }}
             >버튼</button>
            <Table>
                <thead>
                    <tr>
                    <th>#코드</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>기타</th>
                    <th>삭제</th>
                    </tr>
                </thead>
                {
                    item.map((a,i)=>{

                        return(
                            <tbody key={i}>
                                <tr>
                                <td>{item[i].id}</td>
                                <td>{item[i].name}</td>
                                <td>{item[i].count}</td>
                                <td><button onClick={()=>{
                                    // id 값을 전송해 주고 item store에서 id값과 대조해야 한다.             
                                    dispatch(countUp(item[i].id))                  
                                    }} >+</button>
                                </td>
                                <td><button
                                    onClick={()=>{
                                        dispatch(deleteItem(item[i].id))    
                                       
                                    }}
                                > - </button></td>
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