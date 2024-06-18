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
        {id : 50, name : 'Grey Yordan', count : 1},

    ],
    
    reducers : {

        countUp(state, action){

            let num = state.findIndex((a)=>{ return a.id == action.payload })
            // findIndex :  일치하면 몇번째에 있는지 남겨줌
            //action.payload
            state[num].count += 1
           
        },
        addItem(state, action){


            let findItem = state.find(a => a.id === action.payload.id);
  

            if(findItem){
                console.log('이미배열에 있음')
                //만약 스테이트 안에 같은 id번호가 있다면 count 만 추가하고 
                findItem.count ++
            }else{
                console.log('배열에 없음')
                // 스테이트 안에 같은 id 번호가 없다면 배열에 추가해라.
                state.push(action.payload)

            }

            




        }, 
        deleteItem(state, action){
            let num = state.findIndex((a)=>{ return a.id == action.payload })
            state.splice(num, 1)
        }
    }
     
})


export let { countUp, addItem, deleteItem } = item.actions

export default configureStore({ // 등록하는 곳


    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        item : item.reducer
    }


}) 


