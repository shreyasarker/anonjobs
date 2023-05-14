import {createSlice} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';
import { fetchAuthUser, login, logout, register } from './auth.actions';

const initialState = {
    status: 'idle',
    isAuthenticated: false,
    user: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: {
        [register.pending]: (state) => {
            state.status = 'pending';
        },
        [register.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        [register.rejected]: (state) => {
            state.status = 'rejected';
            state.isAuthenticated = false;
            state.user = {};
        },
        [login.pending]: (state) => {
            state.status = 'pending';
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.status = 'rejected';
            state.isAuthenticated = false;
            state.user = {};
        },
        [logout.pending]: (state) => {
            state.status = 'pending';
        },
        [logout.fulfilled]: (state) => {
            state.status = 'resolved';
            state.isAuthenticated = false;
            state.user = {};
        },
        [logout.rejected]: (state) => {
            state.status = 'rejected';
            state.isAuthenticated = false;
            state.user = {};
        },
        [fetchAuthUser.pending]: (state) => {
            state.status = 'fulfilling';
        },
        [fetchAuthUser.fulfilled]: (state, action) => {
            state.status = 'resolved';
            if(action.payload.user){
                state.isAuthenticated = true;
                state.user = action.payload.user;
            }else{
                state.isAuthenticated = false;
                state.user = {role: ''};
            }
        },
        [fetchAuthUser.rejected]: (state) => {
            state.status = 'rejected';
            state.isAuthenticated = false;
            state.user = {};
        },
    }
});

export default authSlice.reducer;