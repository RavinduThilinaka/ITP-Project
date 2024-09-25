
import React from 'react';
import './styles/service.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {faHome,faInfoCircle,faUser, faConciergeBell,faEnvelope ,faCogs, faPhone, faUsers,faUserPlus,faSignInAlt,faStar, faStarHalfAlt, faStarOfDavid, faStairs} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function ServicePage(){

    return(
        
        <div className="serviceContainer">
            <header>
                    <div className="logo">
                        <img src="./image/TeaFactoryLogo.png" width="50px" height="50px" alt="User Logo"/>
                    </div>
                    <nav>
                        <Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome} /> Home</Link>
                        <Link to="/" className="nav-link"><FontAwesomeIcon icon={faUser} /> Profile</Link>
                        <Link to="/service" className="nav-link"><FontAwesomeIcon icon={faConciergeBell} /> Services</Link>
                        <Link to="/contactus" className="nav-link"><FontAwesomeIcon icon={faEnvelope} /> Contact</Link>
                        <Link to="/register" className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> SignUp</Link>
                        
                    </nav>
                    <div className="logo">
                        <img src="./image/user.png" width="25px" height="25px" alt="User Logo"/>
                    </div>
             </header>

      <div className="serviceWrapper">
        <div className="service">
         <h1>Our Service<span></span></h1>
          <div className="serviceCards">

            <div className="serviceCard">
              <i className="fa-solid fa-leaf"></i>
              <h2>Tea Leaf Sourcing</h2>
              <p>We work with local farmers to source the finest quality tea leaves, ensuring sustainable practices and fair trade. Our partnerships guarantee a continuous supply of fresh leaves to maintain optimal production.</p>
            </div>

            <div className="serviceCard">
              <i className="fa-solid fa-industry"></i>
              <h2>Factory Processing</h2>
              <p>Our state-of-the-art factory is equipped with advanced machinery to process tea leaves into premium tea products, from drying and fermentation to packaging, adhering to the highest industry standards.</p>
            </div>

            <div className="serviceCard">
              <i className="fa-solid fa-truck"></i>
              <h2>Supply Chain Management</h2>
              <p>Our integrated supply chain ensures smooth operations, from procurement of raw materials to distribution of finished goods. We provide real-time tracking and inventory management to optimize production.</p>
            </div>

            <div className="serviceCard">
              <i className="fa-solid fa-chart-line"></i>
              <h2>Quality Assurance</h2>
              <p>We prioritize quality at every step of the production process. Our in-house QA team conducts rigorous testing to guarantee that our tea products meet the highest standards of flavor and safety.</p>
            </div>

            <div className="serviceCard">
              <i className="fa-solid fa-users"></i>
              <h2>Supplier Management</h2>
              <p>Our supplier management system allows suppliers to track orders, view historical data, and update their inventory in real-time, fostering better communication and collaboration for efficient operations.</p>
            </div>

            <div className="serviceCard">
              <i className="fa-solid fa-seedling"></i>
              <h2>Sustainable Farming Initiatives</h2>
              <p>We invest in sustainable farming practices, supporting environmental initiatives that reduce carbon footprints and promote biodiversity in tea-growing regions.</p>
            </div>

          </div>
        </div>
      </div>

      <footer id="footer">
          <div className="M-container">
            <div className="f-container">
              <h2>Welcome to our Visit Inn website</h2>
              <br/>
              <hr/>
              <img className="footerimage" src="./image/TeaFactoryLogo.png" alt="Footer Logo"/>
              <div className="social-icons">
                <a href="https://www.facebook.com"><img className="social" width="30px" height="30px" src="./image/facebook.png" alt="Facebook"/></a>
                <a href="https://www.twitter.com"><img className="social" width="30px" height="30px" src="./image/twitter.png" alt="Twitter"/></a>
                <a href="https://www.instagram.com"><img className="social" width="30px" height="30px" src="./image/instagram.png" alt="Instagram"/></a>
                <a href="https://www.youtube.com"><img className="social" width="30px" height="30px" src="./image/youtube.png" alt="Google Plus"/></a>
              </div>
            </div>
  
            <div className="f-container">
              <h2>Web Map</h2>
              <hr/>
              <br/>
                <Link to="/privacy"><FontAwesomeIcon icon={faCogs}/> Privacy policy</Link>
                <Link to="/service"><FontAwesomeIcon icon={faConciergeBell}/> Service</Link>
                <Link to="/contact"><FontAwesomeIcon icon={faPhone}/> Contact</Link>
                <Link to="/about"><FontAwesomeIcon icon={faInfoCircle}/> About</Link>
                <Link to="/team"><FontAwesomeIcon icon={faUsers}/> Our Team</Link>
            </div>
  
            <div className="f-container">
              <h2>Our Newsletter</h2>
              <hr/>
              <br/>
              <p>Subscribe for latest updates</p>
              <input type="text" placeholder="Enter Your Email"/><br/>
            </div>
          </div>
        </footer>
  
        <div className="footer-bottom">
          <p>2024 Visit Inn. All rights reserved.</p>
        </div>
    </div>
    );
}

export default ServicePage

