import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : {}, 
    loading : false, 
    error : null, 
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state)=>{
            state.loading =  true ; 
        },
        signInSuccess : (state,action)=>{
            state.currentUser = action.payload ;  
            state.loading = false ; 
            state.error = null ;  
        }, 
        signInFailure : (state,action)=>{
            state.error = action.payload ; 
            state.loading = false ; 
        }, 
        updateStart : (state) => {
            state.loading = true ; 
        }, 
        updateSuccess : (state,action)=>{
            state.currentUser = action.payload ;
            state.error = null 
            state.loading = false  
        }, 
        updateFailure : (state,action)=>{
            state.error = action.payload 
            state.loading = false 
        }
    }
})

export const {signInStart,signInFailure,signInSuccess, updateStart, updateSuccess, updateFailure} = userSlice.actions

export default userSlice.reducer

