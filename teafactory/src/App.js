
import './styles/home.css';
import { initializeSlider } from './js/home.js';
import {faHome,faInfoCircle,faUser, faConciergeBell,faEnvelope ,faCogs, faPhone, faUsers,faUserPlus,faSignInAlt,faStar, faStarHalfAlt, faStarOfDavid, faStairs} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/footer.css';
import React, { useEffect,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


function App() {

  const [userName, setUserName] = useState('');
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false); 
  const [progress, setProgress] = useState(0); 
 

  const handleSeeMoreClick = () => {
    navigate('/vedio'); // Replace with the path you want to navigate to
  };


  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    initializeSlider();
}, []);

const handleLogout = () => {
  setLoading(true); // Set loading to true
  setProgress(0); // Reset progress to 0
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);
        localStorage.removeItem('userName'); // Remove userName from local storage
        navigate('/login'); // Redirect to login page
        setLoading(false); // Set loading to false
        return 100; // Ensure progress is set to 100
      }
      return prev + 20; // Increment progress
    });
  }, 400); // Update every 400 ms
};

    return (
      <div>
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
              <Link to="/sales-consultant" className="nav-link"><FontAwesomeIcon icon={faEnvelope} /> Sales Consultant</Link>
              {userName ? (
            <>
              <span className="span-nav-link" onClick={handleLogout}><FontAwesomeIcon icon={faSignInAlt} /> Logout</span>
            </>
          ) : (
            <Link to="/login" className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
          )}
              
          </nav>
          <div className="logo">
            <img src="./image/user.png" width="25px" height="25px" alt="User Logo"/>
          </div>

        </header>

           {/* Show loading spinner or message */}
           {loading && (
        <div className="loading">
          <div className='p'>Logging out...</div>
          <progress value={progress} max="100" className="progress-bar"></progress>
        </div>
      )}
  
        <div className="slider">
          
          <div className="list">
            
            <div className="item">
              
              <img src="./image/TeaLeaf4.jpg" alt=""/>

              <div className='profileName'>
                <h4>Welcome, {userName}!</h4>
              </div>
              
              <div className="content">
                <div className="title">Golden Harvest</div>
                <div className="type">BLACK TEA</div>
                <div className="description">
                Relish the rich and smooth flavors of this premium black tea, harvested at peak freshness from the finest tea gardens. Each sip offers a deep, malty essence that warms the soul.
                </div>
                <div className="btn">
                  <button  onClick={handleSeeMoreClick}>Watch Video</button>
                </div>
              </div>
            </div>
  
            <div className="item">
              <img src="./image/TeaLeaf.jpg" alt=""/>
              <div className="content">
                <div className="title">Emerald Bliss</div>
                <div className="type">GREEN TEA</div>
               
                <div className="btn">
                  <button style={{color:'black',fontWeight:'600'}}>SEE MORE</button>
                </div>
              </div>
            </div>
  
            <div className="item">
              <img src="./image/TeaLeaf2.jpg" alt=""/>
              <div className="content">
                <div className="title">Sunrise Oolong </div>
                <div className="type" >OOLONG TEA</div>
               
                <div className="btn">
                  <button style={{color:'#fff',fontWeight:'600', borderColor:'#fff'}}>SEE MORE</button>
                </div>
              </div>
            </div>
  
            <div className="item">
              <img src="./image/TeaLeaf3.jpg" alt=""/>
              <div className="content">
                <div className="title">Citrus Bloom</div>
                <div className="type">HERBAL TEA</div>
               
                <div className="btn">
                  <button style={{color:'black',fontWeight:'600', borderColor:'#0b6408'}}>SEE MORE</button>
                </div>
              </div>
            </div>
          </div>
  
          <div className="thumbnail">
         
            <div className="item">
              <div className="smallTitle">GREEN TEA</div>
              
              <img src="./image/TeaLeaf.jpg" alt=""/>
             
            </div>

            <div className="item">
              <div className="smallTitle">OOLONG TEA</div>
              
              <img src="./image/TeaLeaf2.jpg" alt=""/>
              
            </div>
            <div className="item">
              <div className="smallTitle"> HERBAL TEA</div>
             
              <img src="./image/TeaLeaf3.jpg" alt=""/>
            
            </div>

            <div className="item">
             <div className="smallTitle"> BLACK TEA</div>
              <img src="./image/TeaLeaf4.jpg" alt=""/>
                
            </div>
          </div>
  
          <div className="nextPrevArrows">
          <button className="prev">&lt;</button>
          <button className="next">&gt;</button>
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
};

export default App;
