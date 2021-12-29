import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('m.jouza3@gmail.com');
    const [password, setPassword] = useState('1234');

    const loginFunc = (e) => {
e.preventDefault();
//console.log('log');
const userInfo = {
email,
password,
};
axios
.post(`http://localhost:5000/users/login`,userInfo)
.then((response) => {
    console.log('DATA: ', response.data);
})
.catch((err) => {
    console.log('ERR: ', err);
});
    };
  return (
    <div className='Login'>
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
        <input type="submit" value="Login" onClick={loginFunc}/>
        </form>
    </div>
  )
}
