import React, { useState } from 'react';
import UpdateTaskModal from './UpdateTask.js'
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskTable = () => {
  const [modalShow, setModalShow] = useState(false);

  const updateTask = () => {
    console.log("updated");
    setModalShow(true);
  };

  const deleteTask = () => {
    console.log('Deleted');
  };

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
          <tr className='text-center'>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <button type="button" className="btn btn-primary mx-3" onClick={updateTask}>
                <i className="bi bi-pencil-square"></i>
              </button>
              <button type="button" className="btn btn-danger" onClick={deleteTask}>
                <i className="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
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
