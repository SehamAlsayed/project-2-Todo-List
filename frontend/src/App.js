import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Todo from './components/Todo';
import Add from './components/Add';



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


  const mapOverTasks=tasks.map((taskObj,i) => ( 
  <Todo key={i} task={taskObj} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
  ));

  return (
    <div className='App'>
     
  <p>app</p>
  <Add createFunc={postNewTodo}/>
  <button onClick={getData}>GET TASKS</button>

  {mapOverTasks}

    </div>
  )  
}


