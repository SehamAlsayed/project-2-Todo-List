import axios from 'axios';
import React, { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const registerFunc = (e) => {
e.preventDefault();
console.log('reg');
const newUser={
    //ES6
email,
//"email": "email value in the state"
password,
username,
};
axios
.post(`http://localhost:5000/users/register`,newUser)
.then((response) => {
    console.log('DATA: ', response.data);
})
.catch((err) => {
    console.log('ERR: ', err);
});
    };
  return (
    <div className='Register'>
        <form action=''>
            <label htmlFor='email'>Email:</label>
        <input type="email" placeholder='Write email here  ...' 
        onChange={(e) => {
            setEmail(e.target.value);
        }}
        value={email}/>
        <br/>
        <label htmlFor='password'>password:</label>
        <input type="password" placeholder='Write password here  ...' 
           onChange={(e) => {
            setPassword(e.target.value);
        }}
        value={password}/>
        <br/>
        <label htmlFor='username'>username:</label>
        <input type="text"  placeholder='Write username here  ...'
        nChange={(e) => {
            setUsername(e.target.value);
        }}
        value={username}/>
        <br/>
        <input type="submit" value="Register" onClick={registerFunc}/>
        </form>
    </div>
  )
}
