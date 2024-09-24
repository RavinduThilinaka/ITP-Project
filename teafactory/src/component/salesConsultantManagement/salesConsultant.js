import './SalesConsultant.css';
import { IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logoApple, homeOutline, peopleOutline, chatbubbleOutline, helpOutline, settingsOutline, lockClosedOutline, logOutOutline, eyeOutline, cartOutline, cashOutline, menuOutline, searchOutline, navigate } from 'ionicons/icons';
import SalesConsultantTable from './salesConsultantTable.js';
import SalesConsultantForm from './salesConsultantForm.js';
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

const SalesConsultant=()=>{
    
    const [order,setOrder]=useState([]);
    const [submitted,setSubmitted]=useState(false);
    const [selectedOrder,setSelectedOrder]=useState({});
    const [isEdit,setIsEdit]=useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        getOrder();
    },[]);

/////////////////////////////////////////////////////////////////////

const getOrder=()=>{
    Axios.get('http://localhost:3001/api/order')
        .then(response=>{
            setOrder(response.data?.response||[])
        })

        .catch(error=>{
            console.error("Axios error",error);
        });
}

///////////////////////////////////////////////////////////////////

const addOrder=(data)=>{
    setSubmitted(true);
    const payload={
        customerId:data.customerId,
        customerName:data.customerName,
        quantity:data.quantity,
        teaType:data.teaType,
        orderDate:data.orderDate,
        price:data.price,
        address:data.address,
    }

    Axios.post("http://localhost:3001/api/order",payload)

        .then(()=>{
            getOrder();
            setSubmitted(false);
            isEdit(false);
        })

        .catch(error=>{
            console.error("Axois error",error);
        });
}

///////////////////////////////////////////////////////////
const updateOrder=(data)=>{
    setSubmitted(true);

    const payload={
        customerId:data.customerId,
        customerName:data.customerName,
        quantity:data.quantity,
        teaType:data.teaType,
        orderDate:data.orderDate,
        price:data.price,
        address:data.address,
    }


Axios.patch("http://localhost:3001/api/order",payload)

    .then(()=>{
        getOrder();
        setSubmitted(false);
        isEdit(false);
    })

    .catch(error=>{
        console.error("Axios error",error);
    });
}

///////////////////////////////////////////////////////////////

const deleteOrder=(data)=>{

    const payload ={
        customerId:data.customerId
    }
    Axios.post("http://localhost:3001/api/delete-order",payload)

        .then(()=>{
            getOrder();
        })

        .catch(error=>{
            console.error("Axios error",error);
        })
}

////////////////////////////////////////////////////////////////
const teaTypeData = order.reduce((acc, curr) => {
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
const quantity = order.reduce((acc, curr) => {
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

const price = order.reduce((acc, curr) => {
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
                    <a href="/sales-consultant">
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
        

                <SalesConsultantForm
                    addOrder={addOrder}
                    updateOrder={updateOrder}
                    deleteOrder={deleteOrder}
                    submitted={submitted}
                    data={selectedOrder}
                    isEdit={isEdit}
                /><br></br>
          
          <SalesConsultantTable
                    rows={order}
                    selectedOrder={data=>{
                        setSelectedOrder(data);
                        setIsEdit(true);
                    }}

                    deleteOrder={data => window.confirm('Are you sure?') && deleteOrder(data)}
                   
                />


            </div>

        </div>
    );
}

export default SalesConsultant;