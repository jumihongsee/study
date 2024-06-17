// 컴포넌트간에 공유가 많이 되는 것만 여기에서 쓰셈
import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
import { changeName, ageUp } from './store/userSlice.js'






let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let item = createSlice({
    name : 'item',
    initialState : 
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    
    reducers : {
        countUp(state, action){
            state[action.payload].count += 1
           
        },
        addItem(state, action){

           state.push(action.payload)
           console.log(state)
       
        }
    }
     
})


export let { countUp, addItem } = item.actions

export default configureStore({ // 등록하는 곳


    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        item : item.reducer
    }


}) 


