import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser, faEnvelope, faVenusMars, faLock,faKey } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import  { useEffect } from 'react';

import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setupValidation } from './validation.js'; // 

function Register(){

  
  const navigate=useNavigate();
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [gender,setGender]=useState();
  const [password,setPassowrd]=useState();
  const [userType,setUserType]=useState();
  const [secretKey,setSecretKey]=useState();
  const isValidTextChar = (char) => /^[A-Za-z\s]$/.test(char);
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit=(e)=>{
    

    if(userType=="Admin" && secretKey!="admin"){
      alert("Invalid Admin")
    }else{

      e.preventDefault()
   
      axios.post('http://localhost:3001/api/registerUser',{name,email,gender,password,userType})
        .then(result=>{
          console.log(result)
            navigate('/login')
        })
        .catch(error=>console.log(error))

    }
   
  }
  const handleNameKeyPress = (e) => {
    if (!isValidTextChar(e.key)) {
        e.preventDefault();
    }
};

useEffect(() => {
  setupValidation();
}, []);

    return(
      
      <div className='body'>
        <div className="registerContainer">
          <span className="SignupBorder"></span>
            <form id="form" onSubmit={handleSubmit}>

              <i><h2><FontAwesomeIcon icon={faUserPlus} />Sign Up</h2></i>

          <div className='secretkey'>
            
              <input 
                type="radio" 
                placeholder="Enter your name" 
                name="userType"
                value="user"
                onChange={(e)=>setUserType(e.target.value)} 
                id="secretKey" 
                required />
            User

              <input 
                type="radio" 
                placeholder="Enter your name" 
                name="userType" 
                value="Admin"
                onChange={(e)=>setUserType(e.target.value)}
                id="secretKey" 
                required />
              Admin
          </div>

            {userType=="Admin"?(
              <div className="input-field" >
              <i> <FontAwesomeIcon icon={faKey} /></i>
                <input 
                  type="text" 
                  placeholder="Enter secret key" 
                  name="secretKey" 
                  onChange={(e)=>setSecretKey(e.target.value)}  
                  required />
              </div>): null}


          <div className="input-field" >
              <i> <FontAwesomeIcon icon={faUser} /></i>
              <input 
                type="text" 
                placeholder="Enter your name" 
                name="name" 
                onChange={(e)=>setName(e.target.value)} 
                onKeyPress={handleNameKeyPress} 
                required />
          </div>

          <div className="input-field">
              <i><FontAwesomeIcon icon={faEnvelope}/></i>
              <input 
                type="email" 
                placeholder="Enter your email" 
                id="email" 
                name="email"
                onChange={(e)=>setEmail(e.target.value)} 
                required />
          </div>

          <div className="input-field">
          <i><FontAwesomeIcon icon={faVenusMars} ></FontAwesomeIcon></i>
            <select  name="gender"  onChange={(e)=>setGender(e.target.value)} >
            <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="input-field">
            <i><FontAwesomeIcon icon={faLock} /></i>
              <input 
                  type="password" 
                  placeholder="Enter your password" 
                  id="pwd1" 
                  name="password" 
                  onChange={(e)=>setPassowrd(e.target.value)} 
                  required />
                <span style={{ color: 'red' }} id="pwdErr1"></span>
          </div>

          <div className="input-field">
            <i><FontAwesomeIcon icon={faLock} /></i>
              <input 
                  type="password" 
                  placeholder="Confirm your password" 
                  id="pwd2" 
                  name="password2" 
                  required />
                <span style={{ color: 'red' }} id="pwdErr2"></span>
          </div><br />

            <p id="sms"></p>

          <div className="button">
            <button className="button" type="submit" name="submit">Create Account</button>
          </div>

          <div className="text">
            <h4>Already have an account?</h4>
            <Link to="/login">SignIn</Link>
          </div>

            <div className="social-media">
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} />
              </Link>
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
            </div>
        </form>
      </div>
  </div>
    );
};
export default Register;