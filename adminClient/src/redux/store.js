import { configureStore } from "@reduxjs/toolkit";
import backendReducer from './backendSlice.js'
import authReducer from './authSlice.js'


const store = configureStore({
    reducer:{
        backends: backendReducer,
        auth: authReducer
    }
});

export default store;