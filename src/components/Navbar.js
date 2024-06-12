import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {taskList,error} =useSelector((state)=>state.tasks)
  return (
    <div>
      <h1 className='text-center my-3 text-primary'>Project Progress</h1>
      <p className='text-center lead'>{`total task : ${taskList.length}`}</p>
      {
        (error !== '') ? <p className='text-center text-danger'>{error}</p> : null
      }
    </div>
  )
}

export default Navbar
