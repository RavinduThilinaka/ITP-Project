import React from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ supplierCount }) => {
    const navigate = useNavigate();
    return (
        <div className="Admincontainer">
            {/* Sidebar */}
            <aside className="Adminsidebar">
                <div className="sidebarHeader">
                    <div className='AdminDashboard'>Dashboard</div>
                </div>
                <div className="nav">
                    <ul>
                        <li><a href="#"><i className="fas fa-home"></i> Home</a></li>
                        <li><a href="#"><i className="fas fa-chart-line"></i> Analytics</a></li>
                        <li><a href="#"><i className="fas fa-tasks"></i> Tasks</a></li>
                        <li><a href="#" onClick={() => navigate('/profile')}><i className="fas fa-user"></i> Profile</a></li>
                        <li><a href="#"><i className="fas fa-cog"></i> Settings</a></li>
                        <li><a href="#" onClick={() => navigate('/login')}><i className="fas fa-sign-out-alt"></i> Logout</a></li>

                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div className="Adminmaincontent">
                <div className="header">
                    <div className="header-left">
                        <div className='H1'>Welcome to your dashboard</div>
                    </div>
                    <div className="header-right">
                        <button className="Admindownloadbtn">
                            <i className="fas fa-file-download"></i> Download Reports
                        </button>
                        <i className="fas fa-bell notification-bell"></i>
                    </div>
                </div>

                <section className="Adminstatscards">
                    <div className="Admincard">
                        <i className="fas fa-envelope card-icon"></i>
                        <div className='H3'>Emails Sent</div>
                        <div className='p3'>12,361</div>
                        <div className='span'>+14%</div>
                    </div>
                    <div className="Admincard">
                        <i className="fas fa-dollar-sign card-icon"></i>
                        <div className='H3'>AAAAAAAAAAAA</div>
                        <div className='p3'>{supplierCount}</div>
                        <div className='span'>+22%</div>
                    </div>
                    <div className="Admincard">
                        <i className="fas fa-users card-icon"></i>
                        <div className='H3'>Emails Sent</div>
                        <div className='p3'>32,441</div>
                        <div className='span'>+5%</div>
                    </div>
                    <div className="Admincard">
                        <i className="fas fa-traffic-light card-icon"></i>
                        <div className='H3'>Emails Sent</div>
                        <div className='p3'>1,325,134</div>
                        <div className='span'>+43%</div>
                    </div>
                </section>

                <section className="Admincharts">
                    <div className="Adminchart revenue-chart">
                        <canvas id="revenueChart"></canvas>
                    </div>
                    <div className="Adminchart recent-transactions">
                        <div className='H3'>Recent Transactions</div>
                                 
                    </div>
                    <div className="Adminchart geography-chart">
                    <div className='H3'>Emails Sent</div>
                        <canvas id="trafficChart"></canvas>
                    </div>
                </section>

                <section className="additionalbox">
                    <div className="newbox">
                    <div className='H3'>Emails Sent</div>
                        <div className='p3'>This is some content inside the new box.</div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;

// Include the JavaScript file for functionality
// You can use useEffect to include dash.js functionality if needed
