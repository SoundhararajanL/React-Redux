import React, { useState } from 'react'
import { addTaskToList } from '../slices/taskSlice';
import { useDispatch } from 'react-redux';
const AddTask = () => {
    const dispatch =useDispatch();
    const [title,SetTitle]=useState("");
    const [description,setDescription]=useState('');

    const addTask= (e)=>{
        e.preventDefault()

        console.log({title , description})
        dispatch(addTaskToList({title , description}))
        SetTitle('')
        setDescription('')
    }
    return (
        <>
            <section className="container">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Task Title</label>
                        <input type="text" className="form-control" placeholder='Enter Task' value={title}  required
                        onChange={(e)=> SetTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Task Description</label>
                        <input type="text" className="form-control" placeholder='Enter Task Describtions' value={description} required
                        onChange={(e)=> setDescription(e.target.value)} />
                    </div>

                    <div className='text-end'>
                        <button type="submit" className="btn btn-primary " onClick={(e)=>addTask(e)}>Add Task</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddTask
