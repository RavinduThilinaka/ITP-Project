import './Supplier.css'
import { IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logoApple, homeOutline, peopleOutline, chatbubbleOutline, helpOutline, settingsOutline, lockClosedOutline, logOutOutline, eyeOutline, cartOutline, cashOutline, menuOutline, searchOutline, navigate } from 'ionicons/icons';
import SupplierTable from './supplierTable.js';
import SupplierForm from './supplierForm.js';
import  Axios  from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, BarController, LineElement, LineController,PointElement  } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, BarController, LineElement, LineController,PointElement );



const toggleSidebar = () => {
    const list = document.querySelectorAll(".sidebar li");

    function activeLink() {
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink));

    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".sidebar");
    const main = document.querySelector(".main");

    if (toggle && navigation && main) {
        toggle.onclick = function () {
            navigation.classList.toggle("active");
            main.classList.toggle("active");
        };
    }
};

const Supplier=()=>{
    
    const [supplier,setSupplier]=useState([]);
    const [submitted,setSubmitted]=useState(false);
    const [selectedSupplier,setSelectedSupplier]=useState({});
    const [isEdit,setIsEdit]=useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        getSupplier();
    },[]);

/////////////////////////////////////////////////////////////////////

const getSupplier=()=>{
    Axios.get('http://localhost:3001/api/supplier')
        .then(response=>{
            setSupplier(response.data?.response||[])
        })

        .catch(error=>{
            console.error("Axios error",error);
        });
}

///////////////////////////////////////////////////////////////////

const addSupplier=(data)=>{
    setSubmitted(true);
    const payload={
        sId:data.sId,
        sName:data.sName,
        quantity:data.quantity,
        teaType:data.teaType,
        orderDate:data.orderDate,
        price:data.price,
    }

    Axios.post("http://localhost:3001/api/addSupplier",payload)

        .then(()=>{
            getSupplier();
            setSubmitted(false);
            isEdit(false);
        })

        .catch(error=>{
            console.error("Axois error",error);
        });
}

///////////////////////////////////////////////////////////
const updateSupplier=(data)=>{
    setSubmitted(true);

    const payload={
        sId:data.sId,
        sName:data.sName,
        quantity:data.quantity,
        teaType:data.teaType,
        orderDate:data.orderDate,
        price:data.price,
    }


Axios.post("http://localhost:3001/api/updateSupplier",payload)

    .then(()=>{
        getSupplier();
        setSubmitted(false);
        isEdit(false);
    })

    .catch(error=>{
        console.error("Axios error",error);
    });
}

///////////////////////////////////////////////////////////////

const deleteSupplier=(data)=>{
    Axios.post("http://localhost:3001/api/deleteSupplier",data)

        .then(()=>{
            getSupplier();
        })

        .catch(error=>{
            console.error("Axios error",error);
        })
}

////////////////////////////////////////////////////////////////
const teaTypeData = supplier.reduce((acc, curr) => {
    acc[curr.teaType] = (acc[curr.teaType] || 0) + 1;
    return acc;
}, {});

const chartData = {
    labels: Object.keys(teaTypeData),
    datasets: [{
        label: 'Tea Type Distribution',
        data: Object.values(teaTypeData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }]
};

//////////////////////////////////////////////////////////////////
const quantity = supplier.reduce((acc, curr) => {
    acc[curr.quantity] = (acc[curr.quantity] || 0) + 1;
    return acc;
}, {});

const chartData2 = {
    labels: Object.keys(quantity),
    datasets: [{
        label: 'Tea Type Distribution',
        data: Object.values(quantity),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }]
};

/////////////////////////////////////////////////////////////////

const price = supplier.reduce((acc, curr) => {
    acc[curr.price] = (acc[curr.price] || 0) + 1;
    return acc;
}, {});

const chartData3 = {
    labels: Object.keys(price),
    datasets: [{
        label: 'Tea Type Distribution',
        data: Object.values(price),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }]
};
    useEffect(() => {
        toggleSidebar();
    }, []);

/////////////////////////////////////////////////////////////////////////////////
const Logout = () => {
    
    localStorage.removeItem('userName');
    setUserName('');
    navigate('/login'); 
  };

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  /////////////////////////////////////////////////////////////

    return(
        <div className="SupplierDashboard">
            <div className="sidebar">
            <ul>

                <li>
                    <a href="#">
                        <span class="horizontal_box">
                            <img src='/image/TeaFactoryLogo.png' width={50} height={50}/>
                        </span>
                        <span class="title">Tea Factory</span>
                    </a>
                </li>

                <li>
                    <a href="/supplier">
                        <span class="horizontal_box">
                            <ion-icon icon={homeOutline}></ion-icon>
                        </span>
                        <span class="title">Dashboard</span>
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="horizontal_box">
                            <ion-icon icon={peopleOutline}></ion-icon>
                        </span>
                        <span class="title">Customer</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <span class="horizontal_box">
                            <ion-icon icon={peopleOutline}></ion-icon>
                        </span>
                        <span class="title">Sales Consultant</span>
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="horizontal_box">
                            <ion-icon icon={chatbubbleOutline}></ion-icon>
                        </span>
                        <span class="title">Message</span>
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="horizontal_box">
                            <ion-icon icon={helpOutline}></ion-icon>
                        </span>
                        <span class="title">Help</span>
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="horizontal_box">
                            <ion-icon icon={settingsOutline}></ion-icon>
                        </span>
                        <span class="title">Setting</span>
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="horizontal_box">
                            <ion-icon icon={lockClosedOutline}></ion-icon>
                        </span>
                        <span class="title">Password</span>
                    </a>
                </li>

                <li onClick={Logout}>
                    <a href="/login" >
                        <span class="horizontal_box">
                            <ion-icon icon={logOutOutline}></ion-icon>
                        </span>
                        <span class="title">Sign-out</span>
                    </a>
                </li>

                </ul>
            </div>

            <div class="main">
                <div class="topbar">
                    <div class="toggle">
                        <ion-icon icon={menuOutline}></ion-icon>
                    </div>
                    
                            <div className='supplierName'><h4>Welcome, {userName}!</h4></div>
             
                    <div class="userProfile">
                        <img src="./image/profile.jpg"/>
                    </div>
                    
                </div>
                    
                <div class="cardBox">
                    
                <div className="teaTypeChart">
                        <h2>Quantity</h2>
                        <Line data={chartData3} />
                        
                    </div>

                    <div className="teaTypeChart">
                        <h2>Tea Type Distribution</h2>
                        <Pie data={chartData} />
                        
                    </div>

                    
                    <div className="teaTypeChart">
                        <h2>Price</h2>
                        <Bar data={chartData3} />
                       
                    </div>
  
                </div>


                <SupplierForm
                    addSupplier={addSupplier}
                    updateSupplier={updateSupplier}
                    deleteSupplier={deleteSupplier}
                    submitted={submitted}
                    data={selectedSupplier}
                    isEdit={isEdit}
                /><br></br>
                <SupplierTable
                    rows={supplier}
                    selectedSupplier={data=>{
                        setSelectedSupplier(data);
                        setIsEdit(true);
                    }}

                    deleteSupplier={data => window.confirm('Are you sure?') && deleteSupplier(data)}
                   
                />


            </div>

        </div>
    );
}

export default Supplier;