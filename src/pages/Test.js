import { useState, useTransition, useDeferredValue } from "react";

let a = new Array(5000).fill(0)


function Test(){

    let [name , setName] = useState('')
    let [isPending, startTransition] = useTransition()
    // startTransition 으로 해당 문제되는 state 변경을 감싸면 혁명적으로 속도가 개선이 된다. 좀 늦게 처리해주기 때문
    // isPending 은 startTransition이 처리 중 일때 true 로 변한다.
 
    let state = useDeferredValue(name) 
    // useDeferredValue에 스테이트에 넣으면 늦게 처리해줌 

    return(
        <div className="Test">
            <input onChange={(e)=>{ 
                startTransition(()=>{

                    setName(e.target.value) // 코드시작을 뒤로 늦춰줌 
                
                })
                
            }} />
            {
                isPending ? '로딩중' :
                a.map(()=>{
                    return  <h2>{name}</h2>
                })
            }
           

        </div>
    )

}

export default Test