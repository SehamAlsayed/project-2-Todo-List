//import { PromiseProvider } from "mongoose";
import React ,{useState} from "react";

export default function Add(Props) {
const [newTitle, setNewTitle] = useState('')


    const createNewTodo=()=>{
console.log('createNewTodo from ADD');
//{"title":"task 5", "isCompleted": false}
Props.createFunc({title: newTitle, isCompleted:false});
    };

    return (
        <div className="Add">
            <br/>
<input type="text" placeholder="Write new title here...."  
onChange={(e)=>{
    setNewTitle(e.target.value)
}} />
<br/>
<button onClick={createNewTodo}>Create New Todo</button>
<br/>


        </div>
    )
}