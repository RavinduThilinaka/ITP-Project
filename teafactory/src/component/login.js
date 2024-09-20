import '../styles/Login.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faLock,faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import  { useState } from 'react';



function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
      e.preventDefault();

      if(email==='supplier@gmail.com' && password==='supplier'){
        navigate('/supplier');
      }else{
      
      axios.post('http://localhost:3001/api/login', { email, password })

          .then(result => {
              console.log(result);
              if (result.data.message  === "Success!!!") {
                localStorage.setItem('userName', result.data.name);

                if (result.data.userType === "Admin") {
                  navigate('/service'); 
                } else {
                  navigate('/'); 
                }

              }else{
                alert(result.data.message);
              }
          })
          .catch(error => {
            console.log(error);
            alert('Incorrect password or email');
          });
  }
}
    return(
      <div className='body'>
        <div className="box">
          <span className="borderLine"></span>
            <form onSubmit={handleSubmit}>
             <i><h2><FontAwesomeIcon icon={faSignInAlt} ></FontAwesomeIcon>Login</h2></i><br/>

            <div className="Animation" data-text="LOGIN">LOGIN</div>
            <div className="user">
              <img src="/image/user.png" alt=''/>
            </div>

            <div className="loginInput">
              <i><FontAwesomeIcon icon={faUser} /></i>
              <input type="email" placeholder="Enter your email" name="email" onChange={(e)=>setEmail(e.target.value)} required/>
            </div>

            <div className="loginInput">
              <i><FontAwesomeIcon icon={faLock} /></i>
              <input type="password" placeholder="Enter your password" name="password" onChange={(e)=>setPassword(e.target.value)} required/>
            </div>


            <div className="links">
                <Link to="#">Forgot Password</Link>
                <Link to="/register">SignUp</Link>
            </div>

            <div className='loginBtn'>
                <button type='submit' name='submit'>Login</button>
            </div>
          
            </form>
    </div>
    </div>
    );
};

export default Login;