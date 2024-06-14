import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskList: [], 
    selectedTask: {},
    isLoading : false,
    error :''
}

const BASE_URL ="http://localhost:8000/tasks" ;

// GET 
export const getTaskFromServer = createAsyncThunk(
    "tasks/getTaskFromServer",  
    async (_,{rejectWithValue})=>{
        const response = await fetch(BASE_URL)
       try{
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:"task not found"})
        }
       }catch(error){
        return rejectWithValue({error:error.message});
       }
    }
)

// POST 
export const postTaskFromServer = createAsyncThunk(
    "tasks/postTaskFromServer",  
    async (task,{rejectWithValue})=>{
        const options= {
            method :"POST",
            body : JSON.stringify(task),
            headers  :{
                "content-type":"application/json; charset=UTF-8"
            }
        }
       try{
        const response = await fetch(BASE_URL,options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:"task post error"})
        }
       }
       catch(error){
         return rejectWithValue({error:error.message})
       }
    }
)


// PATCH 
export const updateTaskInServer = createAsyncThunk(
    "tasks/updateTaskInServer",  
    async (task,{rejectWithValue})=>{
        const options= {
            method :"PATCH",
            body : JSON.stringify(task),
            headers  :{
                "content-type":"application/json; charset=UTF-8"
            }
        }
       try{
        const response = await fetch(BASE_URL +"/"+task.id,options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:"task update error"})
        }
       }
       catch(error){
         return rejectWithValue({error:error.message})
       }
    }
)


// DELETE 
export const deleteTaskInServer = createAsyncThunk(
    "tasks/deleteTaskInServer",  
    async (task,{rejectWithValue})=>{
        const options= {
            method :"DELETE",
            body : JSON.stringify(task),
            headers  :{
                "content-type":"application/json; charset=UTF-8"
            }
        }
       try{
        const response = await fetch(BASE_URL +"/"+task.id,options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:"task delete error"})
        }
       }
       catch(error){
         return rejectWithValue({error:error.message})
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
            // POST
            .addCase(postTaskFromServer.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(postTaskFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error =''
                state.taskList.push(action.payload)
            })
            .addCase(postTaskFromServer.rejected,(state,action)=>{
                state.error =action.payload.error
                state.isLoading =false
             
            })
            // PATCH
            .addCase(updateTaskInServer.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(updateTaskInServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error =''
                state.taskList =state.taskList.map((task)=>task.id === action.payload.id ? action.payload : task)

            })
            .addCase(updateTaskInServer.rejected,(state,action)=>{
                state.error =action.payload.error
                state.isLoading =false
             
            })
             // DELETE
             .addCase(deleteTaskInServer.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(deleteTaskInServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error =''
                state.taskList = state.taskList.filter((task) => task.id !== action.payload.id)

            })
            .addCase(deleteTaskInServer.rejected,(state,action)=>{
                state.error =action.payload.error
                state.isLoading =false
             
            })

    }

})


export const {addTaskToList ,removeTaskFromList ,updateTaskInList,setSelectedTask} = taskSlice.actions

export default taskSlice.reducer