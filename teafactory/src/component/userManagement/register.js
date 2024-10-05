import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser, faEnvelope, faVenusMars, faLock,faKey } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import  { useEffect } from 'react';

import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


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
  const [nameError, setNameError] = useState('');

  const [errors, setErrors] = useState({});

  // Validation rules
  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
  

  const handleNameKeyPress = (e) => {
    if (!isValidTextChar(e.key)) {
        e.preventDefault();
        setNameError('You can only use characters and spaces.');
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    let formErrors = {};
    if (!validateName(name)) {
      formErrors.name = 'Name must contain only letters and spaces';
    }
    if (!validateEmail(email)) {
      formErrors.email = 'Invalid email address';
    }
    if (!validatePassword(password)) {
      formErrors.password = 'Password must be at least 6 characters long, include uppercase, lowercase, and a number';
    }
    if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    if ((userType === 'Admin' || userType === 'Supplier' || userType === 'QaManager' || userType === 'SalesConsultant'|| userType === 'Manager') && secretKey !== 'teafactory') {
      formErrors.secretKey = 'Incorrect secret key for this role';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      axios
        .post('http://localhost:3001/api/registerUser', { name, email, gender, password, userType })
        .then((result) => {
          console.log(result);
          navigate('/login');
        })
        .catch((error) => console.log(error));
    }
  };


    return(
      
      <div className='body'>
        <div className="registerContainer">
          <span className="SignupBorder"></span>
            <form id="form" onSubmit={handleSubmit}>

              <i><h2><FontAwesomeIcon icon={faUserPlus} />Sign Up</h2></i>

              <div className="userType">
                 
                  <select name="userType" onChange={(e) => setUserType(e.target.value)}id="userType" required>

                        <option value="">Select user type</option>
                        <option value="user">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Supplier">Supplier</option>
                        <option value="QaManager">Qa Manager</option>
                        <option value="SalesConsaltent">Salase Consaltent</option>
                        <option value="Manager">Manager</option>
                  </select>
              </div>
            
            {userType=="Admin"|| userType === "Supplier"|| userType === "QaManager"|| userType === "SalesConsaltent"|| userType === "Manager"?(
              <div className="input-field" >
              <i> <FontAwesomeIcon icon={faKey} /></i>
                <input 
                  type="password" 
                  placeholder="Enter secret key" 
                  name="secretKey" 
                  onChange={(e)=>setSecretKey(e.target.value)}  
                  required />
                  {errors.secretKey && <span style={{ color: 'red' }}>{errors.secretKey}</span>}
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
                 {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
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
                 {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
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
                 {errors.password && <span style={{ color: 'red',marginLeft:"15%",marginTop:"45px"  }}>{errors.password}</span>}
          </div>

          <div className="input-field">
            <i><FontAwesomeIcon icon={faLock} /></i>
              <input 
                  type="password" 
                  placeholder="Confirm your password" 
                  id="pwd2" 
                  name="password2" 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required />
                {errors.confirmPassword && <span style={{ color: 'red',marginLeft:"15%",marginTop:"45px" }}>{errors.confirmPassword}</span>}
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