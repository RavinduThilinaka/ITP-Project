import React from 'react';
import './contactUs.css';
import { IonIcon } from '@ionic/react'; 
import { logoFacebook, logoTwitter, logoLinkedin, logoInstagram, location, mail, call, leaf } from 'ionicons/icons'; 
import {faHome,faInfoCircle,faUser, faConciergeBell,faEnvelope ,faCogs, faPhone, faUsers,faUserPlus,faSignInAlt,faStar, faStarHalfAlt, faStarOfDavid, faStairs} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,useNavigate } from 'react-router-dom';

const ContactUs=()=>{

    return(
     
        <div className="contactusBody">

            <header>
            <div className="logo">
                <img src="./image/TeaFactoryLogo.png" width="50px" height="50px" alt="User Logo"/>
            </div>
            <nav>
                <Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome} /> Home</Link>
                <Link to="/profile" className="nav-link"><FontAwesomeIcon icon={faUser} /> Profile</Link>
                <Link to="/service" className="nav-link"><FontAwesomeIcon icon={faConciergeBell} /> Services</Link>
                <Link to="/contactus" className="nav-link"><FontAwesomeIcon icon={faEnvelope} /> Contact</Link>
                <Link to="/register" className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> SignUp</Link>
            </nav>
            <div className="logo">
                <img src="./image/user.png" width="25px" height="25px" alt="User Logo"/>
            </div>

            </header>

        <div className="contactUs">

          <div className="contactusBox">
            <div className="contact form">
              <h3>Send a Message <IonIcon icon={leaf} /> <IonIcon icon={leaf} /> <IonIcon icon={leaf} /></h3>
              <form>
                <div className="formBox">
                  <div className="row50">
                    <div className="inputBox">
                      <span>First Name</span>
                      <input type="text" placeholder="Enter First Name" />
                    </div>
                    <div className="inputBox">
                      <span>Last Name</span>
                      <input type="text" placeholder="Enter Last Name" />
                    </div>
                  </div>
  
                  <div className="row50">
                    <div className="inputBox">
                      <span>Email</span>
                      <input type="email" placeholder="Enter Your Email" />
                    </div>
                    <div className="inputBox">
                      <span>Mobile</span>
                      <input type="text" placeholder="Enter Your Mobile" />
                    </div>
                  </div>
  
                  <div className="row100">
                    <div className="inputBox">
                      <span>Message</span>
                      <textarea placeholder="Write Your Message"></textarea>
                    </div>
                  </div>
  
                  <div className="row100">
                    <div className="inputBox">
                      <button type="submit">Send</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
  
            <div className="contact info">
              <h3>Contact Info</h3>
              <div className="infoBox">
                <div>
                  <span><IonIcon icon={location} /></span>
                  <a>Cannought Place,Urubokka <br/>Sri Lanka</a>
                </div>
  
                <div>
                  <span><IonIcon icon={mail} /></span>
                  <a href="mailto:luckdays@gamail.com">luckdays@gamail.com</a>
                </div>
  
                <div>
                  <span><IonIcon icon={call} /></span>
                  <a href="tel:+947774256944">+94 777 425 6944</a>
                </div>
  
                <ul className="sci">
                  <li><a href="#"><IonIcon icon={logoFacebook} /></a></li>
                  <li><a href="#"><IonIcon icon={logoTwitter} /></a></li>
                  <li><a href="#"><IonIcon icon={logoLinkedin} /></a></li>
                  <li><a href="#"><IonIcon icon={logoInstagram} /></a></li>
                </ul>
              </div>
            </div>
  
            <div className="contact map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10721.90184155491!2d80.62690993563311!3d6.307873580447071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1581d7e6283bd%3A0x5d03671572f61b1b!2sUrubokka%20Tea%20Factory!5e0!3m2!1sen!2slk!4v1726911474579!5m2!1sen!2slk"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

export default ContactUs