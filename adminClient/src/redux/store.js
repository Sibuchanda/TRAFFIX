import { configureStore } from "@reduxjs/toolkit";
import backendReducer from './backendSlice.js'


const store = configureStore({
    reducer:{
        backends: backendReducer
    }
});

export default store;