import {createSlice } from '@reduxjs/toolkit'


let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 27},
    reducers : {
      setName(state){
        state.name = 'Yu';
      },
      setAge(state){
        state.age++;
      },
      agePlus(state, action){
        state.age += action.payload;
      }
    }
  })
  export let {setName, setAge, agePlus} = user.actions;
  
  export default user;