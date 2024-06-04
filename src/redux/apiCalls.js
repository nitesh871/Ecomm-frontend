import { publicRequest, userRequest } from "../requestMethods";
import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await userRequest.post("/login",user);
        const { user: userData, accessToken } = res.data;

        dispatch(loginSuccess({ user: userData, accessToken }))
    }catch(err){
        dispatch(loginFailure())

    }
}

export const logOut = createAsyncThunk(
    'user/logOut',
    async (id, { rejectWithValue }) => {
        console.log('id:',id)
      try {
        await userRequest.delete(`/users/`+id);
        return null; // Returning null as the payload to reset currentUser
      } catch (err) {
        console.error("Error deleting user:", err);
        return rejectWithValue(err.response.data);
      }
    }
  );