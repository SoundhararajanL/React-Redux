import React,{useState} from 'react';
import { Modal } from 'react-bootstrap';

const UpdateTaskModal = (props) => {
    const [title,SetTitle]=useState("");
    const [description,setDescription]=useState('');

    const updateTask =()=>{
        props.onHide()
    }
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
                        <input type="text" className="form-control" placeholder='Enter Task' value={title}  required
                        onChange={(e)=> SetTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Task Description</label>
                        <input type="text" className="form-control" placeholder='Enter Task Describtions' value={description} required
                        onChange={(e)=> setDescription(e.target.value)} />
                    </div>

                   
                </form>
        </Modal.Body>
        <Modal.Footer>
           
            <div className='text-end'>
                        <button type="submit" className="btn btn-primary " onClick={(e)=>updateTask(e)}>Update Task</button>
                    </div>
        </Modal.Footer>
        </Modal>
  )
}

export default UpdateTaskModal
