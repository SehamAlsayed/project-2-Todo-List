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
    <div className='Login, m-3' >
        <form action=''>
        <br/>
            <label htmlFor='email'>Email: </label>
        <input type="email" 
        onChange={(e) => {
            setEmail(e.target.value);
        }}
        value={email}/>
        <br/>
        <br/>
        <label htmlFor='password'>Password:</label>
        <input type="password" 
           onChange={(e) => {
            setPassword(e.target.value);
        }}
        value={password}/>
        <br/>
        <br/>
        <input type="submit" value="Login" onClick={loginFunc} className="btn btn-outline-warning"/>
        </form>
        <br/>
        <br/>
        <br/>
        <Link to='/Register'>Don't Have An Acount?</Link>
    </div>

  )
}
