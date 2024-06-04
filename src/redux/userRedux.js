import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./apiCalls";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        accessToken: null, // Add accessToken to store the token
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false
            state.currentUser=action.payload.user
            state.currentUser.accessToken = action.payload.accessToken; // Save accessToken
            state.error=false

        },
        loginFailure:(state,action)=>{
            state.isFetching=false
            state.error=true

        },
    },
    
});

export const {loginStart,loginSuccess,loginFailure} = userSlice.actions;
export default userSlice.reducer;