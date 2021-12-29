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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
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

  const logoutFunc = () => {
    setIsLoggedIn(false);
    setUsername("");
  };
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
      <p>Name:{username}</p>

<nav>
  <Link to='/home' className="btn btn-outline-light">Home</Link> {' | '}
  <Link to='/login' className="btn btn-outline-light">Login</Link> {' | '}
  <Link to='/register' className="btn btn-outline-light">Register</Link> {' | '}
</nav>
<nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist" >
  <Link to='/home' className="btn btn-outline-light">Home</Link>
  <Link to='/login' className="btn btn-outline-light">Login</Link> 
  <Link to='/register' className="btn btn-outline-light">Register</Link> 
    
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
</div>



<br />
<button onClick={logoutFunc} className="btn btn-outline-warning">Logout</button>
<br />
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
        <Route path="/login" element={
        <Login setIsLoggedIn={setIsLoggedIn} 
        setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>
  )  
}


