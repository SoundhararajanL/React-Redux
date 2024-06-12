import React, { useEffect, useState } from 'react';
import UpdateTaskModal from './UpdateTask.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux'
import { getTaskFromServer, setSelectedTask } from '../slices/taskSlice.js';
import { useDispatch } from 'react-redux';
import { removeTaskFromList } from '../slices/taskSlice.js';

const TaskTable = () => {
    const [modalShow, setModalShow] = useState(false);
    const { taskList } = useSelector((state) => state.tasks)
    const dispatch = useDispatch()


    const updateTask = (task) => {
        console.log("updated");
        setModalShow(true);
        dispatch(setSelectedTask(task))
    };

    const deleteTask = (task) => {
        console.log('Deleted');
        dispatch(removeTaskFromList(task))
    };

    useEffect(()=>{
        dispatch(getTaskFromServer())

    },[dispatch])   

    return (
        <>
            <table className="table my-3 table-bordered border-secondary-subtle">
                <thead>
                    <tr className='text-center'>
                        <th scope="col">No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Descriptions</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskList && taskList.map((task, index) => {
                            return (
                                <tr className='text-center' key={task.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary mx-3" onClick={()=> updateTask(task)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={()=> deleteTask(task)}>
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </table>
            <UpdateTaskModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default TaskTable;
