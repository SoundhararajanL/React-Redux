import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskInList } from '../slices/taskSlice';
const UpdateTaskModal = (props) => {
    const [title, SetTitle] = useState("");
    const [description, setDescription] = useState('');
    const [id, setId] = useState(0)
    const dispatch =useDispatch()
    const { selectedTask } = useSelector((state) => state.tasks)
    const updateTask = () => {
        props.onHide()
        dispatch(updateTaskInList({id,title,description}))
    }

    useEffect(() => {
        if (Object.keys(selectedTask.length !== 0)) {
            SetTitle(selectedTask.title)
            setDescription(selectedTask.description)
            setId(selectedTask.id)

        }

    }, [selectedTask])
    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Update Task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Task Title</label>
                        <input type="text" className="form-control" placeholder='Enter Task' value={title} required
                            onChange={(e) => SetTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Task Description</label>
                        <input type="text" className="form-control" placeholder='Enter Task Describtions' value={description} required
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>


                </form>
            </Modal.Body>
            <Modal.Footer>

                <div className='text-end'>
                    <button type="submit" className="btn btn-primary " onClick={() => updateTask()}>Update Task</button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateTaskModal
