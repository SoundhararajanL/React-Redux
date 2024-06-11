import { configureStore } from "@reduxjs/toolkit";
import taskReducers from "./slices/taskSlice"

export const store = configureStore({
    reducer: {
        tasks: taskReducers
    }
})