import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {taskList} =useSelector((state)=>state.tasks)
  return (
    <div>
      <h1 className='text-center my-3 text-primary'>Project Progress</h1>
      <p className='text-center lead'>{`total task : ${taskList.length}`}</p>
    </div>
  )
}

export default Navbar
