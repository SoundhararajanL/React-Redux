
import './App.css';
import AddTask from './components/AddTask';
import Navbar from './components/Navbar';
import TaskTable from './components/TaskTable';

function App() {
  return (
    <>
      <Navbar />
      <div className="container ">
        <div className="row justify-content-md-center">
          <div className="col-md-5">
            <AddTask />
          </div>
        </div>
        <TaskTable/>
      </div>
    </>
  );
}

export default App;
