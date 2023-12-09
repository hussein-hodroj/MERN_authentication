import { createSlice } from '@reduxjs/toolkit'

const  initialState = {
    //check local storage for user info if it is there we gonna use it and parse and if it is not there it gave me null
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

//create our slice

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers:{
        //we gonna have two function one for setCredentials which gonna set our user info to local storage
        //and the other is Logout which gonna take our user info out from local storage
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.userInfo = null,
            localStorage.removeItem('userInfo')
        }
    }
})


export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
    
//so actions is when you call this that's an action and when it changes your state that's the reducer 
//to use slice we should import and save it in the store