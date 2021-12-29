import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login(props) {
    const [email, setEmail] = useState('soma.alsaied@yahoo.com');
    const [password, setPassword] = useState('12345');

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
    props.setIsLoggedIn(true);
    props.setUsername(response.data.username);
})
.catch((err) => {
    console.log('ERR: ', err);
});
    };
  return (
    <div className='Login'>
        <form action=''>
            <label htmlFor='email'>Email:</label>
        <input type="email" 
        onChange={(e) => {
            setEmail(e.target.value);
        }}
        value={email}/>
        <br/>
        <label htmlFor='password'>Password:</label>
        <input type="password" 
           onChange={(e) => {
            setPassword(e.target.value);
        }}
        value={password}/>
        <br/>
        <input type="submit" value="Login" onClick={loginFunc}/>
        </form>
        <Link to='/Register'>Don't Have An Acount?</Link>
    </div>

  )
}
