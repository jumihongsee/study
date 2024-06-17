import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    name : 'user',
    initialState :  {name : 'kim', age : 20} ,
    // state가 object나 arry면 return 없이 직접 수정이 가능하다.
    // 문자 하나만 필요해도 일부러 {} 안에 담기도 함 

    
    reducers : { // state 변경하는 법 (1) 수정함수를 만든다
        changeName(state){
           state.name = 'park'
        },
        ageUp(state, a){
            state.age += a.payload
        }
    }

})


// state 변경하는 법 (2) 만든함수 export
export let { changeName, ageUp} =  user.actions
// Destructuring 오른쪽에 잇는 자료를 변수로 빼는 문법 


export default user 
