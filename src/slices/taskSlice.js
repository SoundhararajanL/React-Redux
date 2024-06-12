import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    taskList: [],
    selectedTask: {},
    isLoading : false,
    error :''
}
// GET 
export const getTaskFromServer = createAsyncThunk(
    "tasks/getTaskFromServer",  
    async (_,{rejectWithValue})=>{
        const response = await fetch("http://localhost:8000/tasks")
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:"not task found"})
        }
    }
)







const taskSlice = createSlice({
    name: "taskSlice",
    initialState,
    reducers: {
        addTaskToList: (state, action) => {
            const id = Math.random() * 100
            let task = { ...action.payload, id }
            state.taskList.push(task)
        },
        removeTaskFromList: (state, action) => {
            state.taskList = state.taskList.filter((task) => task.id !== action.payload.id)
        },
        updateTaskInList :(state,action)=>{
            state.taskList =state.taskList.map((task)=>task.id === action.payload.id ? action.payload : task)
        },
        setSelectedTask :(state,action)=>{
            state.selectedTask =action.payload
        }

    },
    extraReducers :(builder)=>{
        builder
            .addCase(getTaskFromServer.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getTaskFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error =''
                state.taskList = action.payload
            })
            .addCase(getTaskFromServer.rejected,(state,action)=>{
                state.error =action.payload.error
                state.isLoading =false
                state.taskList =[]
            })

    }

})


export const {addTaskToList ,removeTaskFromList ,updateTaskInList,setSelectedTask} = taskSlice.actions

export default taskSlice.reducer