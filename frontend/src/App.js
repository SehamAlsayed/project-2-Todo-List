import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Routes, Route, Link } from "react-router-dom";
import Todo from './components/Todo';
import Add from './components/Add';
import Register from './components/Register';
import Login from './components/Login';



export default function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getData()
  },[]);

  const getData=() => {
    axios
    .get('http://localhost:5000/tasks')
    .then((response) => {
      console.log('RESPONSE: ', response);
      console.log('DATA: ', response.data);
      setTasks(response.data)
    })
.catch((err) => {
  console.log('ERR: ', err);
});
  }

  const postNewTodo =(body) => {
   // console.log("App func postNewTodo from App");
    axios
    .post(`http://localhost:5000/tasks`,body)
    .then((response) => {
     // console.log('RESPONSE: ', response);
      console.log('DATA: ', response.data);
     // setTasks(response.data) 
     getData()
     //change state using spread operator >>> search about this
    })
.catch((err) => {
  console.log('ERR: ', err); 
});
  }

  const deleteTodo =(id) => {
     axios
     .delete(`http://localhost:5000/tasks/${id}`)
     .then((response) => {
      // console.log('RESPONSE: ', response);
       console.log('DATA: ', response.data);
      // setTasks(response.data) 
      getData()
      //change state using spread operator >>> search about this
     })
 .catch((err) => {
   console.log('ERR: ', err); 
 });
   }
 
const toggleTodo = (id, newStatus) => {
    axios
    .put(`http://localhost:5000/tasks/${id}/${newStatus}`)
    .then((response) => {
     // console.log('RESPONSE: ', response);
      console.log('DATA: ', response.data);
     // setTasks(response.data) 
     getData()
     //change state using spread operator >>> search about this
    })
.catch((err) => {
  console.log('ERR: ', err); 
});
  }

  const deleteTasks =() => {
    axios
    .delete(`http://localhost:5000/tasks`)
    .then((response) => {
     // console.log('RESPONSE: ', response);
      console.log('DATA: ', response.data);
     // setTasks(response.data) 
     getData()
     //change state using spread operator >>> search about this
    })
.catch((err) => {
  console.log('ERR: ', err); 
});
  }

  const FilterData=(status) => {
    axios
    .get(`http://localhost:5000/filter?isCompleted=${status}`)
    .then((response) => {
      console.log('RESPONSE: ', response);
      console.log('DATA: ', response.data);
      setTasks(response.data)
    })
.catch((err) => {
  console.log('ERR: ', err);
});
  }

  const mapOverTasks=tasks.map((taskObj,i) => ( 
  <Todo
   key={taskObj._id} 
   task={taskObj} 
   deleteTodo={deleteTodo} 
   toggleTodo={toggleTodo}/>
  ));

  return (
    
    <div className='App'>
      <p>To Do List</p>

<nav>
  <Link to='/home'>Home</Link> {' | '}
  <Link to='/login'>Login</Link> {' | '}
  <Link to='/register'>Register</Link> {' | '}
</nav>


      <Routes>
        <Route path="/home" element={  <div className="Home">
     <form>
      <br/>
  <Add createFunc={postNewTodo}/>
 
 
  {mapOverTasks}
  <br/>
  <br/>
  <button onClick={getData}>GET TASKS</button>
      <button onClick={deleteTasks}>DELETE COMPLETED TASKS</button>
      <button
       onClick={()=>{
        FilterData(true)
        }}
        >GET DONE</button>
        
      <button
       onClick={()=>{
        FilterData(false)
        }}
        >GET PENDING
        </button>

       
        </form>
        </div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>
  )  
}


