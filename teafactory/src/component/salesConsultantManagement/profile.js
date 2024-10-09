import React, { useEffect, useState } from 'react';
import { Link  } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  const [dateTime, setDateTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [filesVisible, setFilesVisible] = useState(false);
 

  // Date and Time Display Functionality

  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const userType = localStorage.getItem('userType');
  const userGender = localStorage.getItem('userGender');
 

  useEffect(() => {
    const displayDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setDateTime(`Today is ${formattedDateTime}`);
    };

    displayDateTime();
    const intervalId = setInterval(displayDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Calendar Initialization Function
  const renderCalendar = (month, year) => {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let date = 1;
    const calendarRows = [];

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          row.push(<td key={`${i}-${j}`}></td>);
        } else if (date > daysInMonth) {
          break;
        } else {
          row.push(
            <td key={`${i}-${j}`} className={date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'today' : ''}>
              {date}
            </td>
          );
          date++;
        }
      }
      calendarRows.push(<tr key={i}>{row}</tr>);
    }
    return calendarRows;
  };

  return (
    <div className="bodyContainer">
      <div className="profile-container">
        
        <div className="card">
        <Link to="/sales-consultant" className="close-icon-link">
              <span className="close-icon">✖</span>
            </Link>
          {/* Date and Time Display */}
          <div className="date-time">{dateTime}
           
          </div>
              
          <div className="profile-header">
            <div className="profile-image">
              <img src="/image/Propic.jpeg" alt="Profile" />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{userName}</h2>
              <p className="profile-bio">Sales Consultant | Passionate about building strong client relationships and delivering tailored solutions to meet customer needs.</p>
              <div className="profile-links">
                <button className="updateButton">Update</button>
                <button className="deleteButton">Delete</button>
              </div>
            </div>
          </div>

          <div className="profile-body">
            <div className="profile">
              <div className='h3'>About Me</div>
              <label>Name: {userName}</label>
              <br />
              <label>Email: {userEmail}</label>
              <br />
              <label>Gender: {userGender}</label>
              <br />
              <label>Role: {userType}</label>
              <br />
            </div>

            <div className='h3'>Skills</div>
            <ul className="skills-list">
              <li id="calendarItem" onClick={() => setCalendarVisible(!calendarVisible)}>
                📅 Calendar
              </li>
              <li id="filesItem" onClick={() => setFilesVisible(!filesVisible)}>
                📁 Files
              </li>
              <li>📜 History</li>
              <li>⚙️ Settings</li>
            </ul>

            {/* Calendar Section */}
            {calendarVisible && (
              <div className="calendar-section">
                <div className="calendar-container">
                  <div className="calendar-header">
                    <button onClick={() => setCurrentMonth(currentMonth - 1)}>&lt;</button>
                    <h3>{`${new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long' })} ${currentYear}`}</h3>
                    <button onClick={() => setCurrentMonth(currentMonth + 1)}>&gt;</button>
                  </div>
                  <table className="calendar">
                    <thead>
                      <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                      </tr>
                    </thead>
                    <tbody>{renderCalendar(currentMonth, currentYear)}</tbody>
                  </table>
                </div>
                <button onClick={() => setCalendarVisible(false)} className="close-button">
                  Close Calendar
                </button>
              </div>
            )}

            {/* Files Section */}
            {filesVisible && (
              <div className="file-section">
                <button onClick={() => setFilesVisible(false)} className="close-button">
                  Close Files
                </button>
                <ul className="file-list">
                  <li>Document1.pdf</li>
                  <li>Document2.docx</li>
                  <li>Image1.png</li>
                  <li>Image2.jpg</li>
                  <li>Presentation.pptx</li>
                </ul>
                
              </div>
            )}
          </div>

        </div>
              
      </div>
    </div>
  );
};

export default Profile;
