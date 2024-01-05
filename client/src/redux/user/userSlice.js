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
        },
        deleteUserStart : (state) => {
            state.loading = true ; 
        }, 
        deleteUserSuccess : (state)=>{
            state.currentUser = {} ;
            state.error = null 
            state.loading = false  
        }, 
        deleteUserFailure : (state,action)=>{
            state.error = action.payload 
            state.loading = false 
        },
        signOutStart : (state) => {
            state.loading = true ; 
        }, 
        signOutSuccess : (state)=>{
            state.currentUser = {} ;
            state.error = null 
            state.loading = false  
        }, 
        signOutFailure : (state,action)=>{
            state.error = action.payload 
            state.loading = false 
        }
    }
})

export const {signInStart,signInFailure,signInSuccess, updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutStart,signOutFailure,signOutSuccess} = userSlice.actions

export default userSlice.reducer

