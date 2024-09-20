
import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBell, faHome, faWallet, faPeopleGroup, faChartBar, faGear, faCircleQuestion, faSignOut,faComment,faDollarSign } from '@fortawesome/free-solid-svg-icons';
import QulityForm from './qulityForm';
import './Qulity.css'
import QuantityTable from './qulityTable';
import  Axios  from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart,Line, PieChart, Pie } from 'recharts';


const Quantity=()=>{

  const [qulity,setQulity]=useState([]);
  const [submitted,setSubmitted]=useState(false);
  const [selectedQulity,setSelectedQulity]=useState({});
  const [isEdit,setIsEdit]=useState(false);

  useEffect(()=>{
      getQulity();
  },[]);

///////////////////////////////////////////////////////////////
const getQulity=()=>{
  Axios.get('http://localhost:3001/api/qulity')
      .then(response=>{
          setQulity(response.data?.response||[])
      })

      .catch(error=>{
          console.error("Axios error",error);
      });
}
//////////////////////////////////////////////////////////

const addQulity=(data)=>{
  setSubmitted(true);
  const payload={
      qId:data.qId,
      sName:data.sName,
      moisturisingLevel:data.moisturisingLevel,
      wight:data.wight,
      checkDate:data.checkDate,
      leafType:data.leafType,
     
  }

  Axios.post("http://localhost:3001/api/addQulity",payload)

      .then(()=>{
          getQulity();
          setSubmitted(false);
          isEdit(false);
      })

      .catch(error=>{
          console.error("Axois error",error);
      });
}

///////////////////////////////////////////////////////

const updateQulity=(data)=>{
  setSubmitted(true);

  const payload={
    qId:data.qId,
    sName:data.sName,
    moisturisingLevel:data.moisturisingLevel,
    wight:data.wight,
    checkDate:data.checkDate,
    leafType:data.leafType,
  }


Axios.post("http://localhost:3001/api/updateQulity",payload)

  .then(()=>{
      getQulity();
      setSubmitted(false);
      isEdit(false);
  })

  .catch(error=>{
      console.error("Axios error",error);
  });
}

//////////////////////////////////////////////////////////////

const deleteQulity=(data)=>{
  Axios.post("http://localhost:3001/api/deleteQulity",data)

      .then(()=>{
          getQulity();
      })

      .catch(error=>{
          console.error("Axios error",error);
      })
}
return(

  <div className="QAContainer">
  <div className="QATopbar">
    <div className="QAlogo">
      <h2>Royal Hotel</h2>
    </div>
   
    <FontAwesomeIcon icon={faBell} />
    <div className="QAuser">
      <img src='/image/TeaFactoryLogo.png' width={50} height={50}/>
    </div>
  </div>

  <div className="QASidebar">
    <ul>
      <li>
        <a href="#">
        <FontAwesomeIcon icon={faHome} />
          <div className="QAsidemenu">Dashboard</div>
        </a>
      </li>
      <li>
        <a href="#">
        <FontAwesomeIcon icon={faUser} />
          <div className="QAsidemenu2">Profile</div>
        </a>
      </li>
      <li>
        <a href="#">
        <FontAwesomeIcon icon={faWallet} />
          <div className="QAsidemenu3">Earnings</div>
        </a>
      </li>
      <li>
        <a href="#">
        <FontAwesomeIcon icon={faPeopleGroup} />
          <div className="QAsidemenu4">Employee</div>
        </a>
      </li>
      <li>
        <a href="#">
        <FontAwesomeIcon icon={faChartBar} />
          <div className="QAsidemenu5">Analytics</div>
        </a>
      </li>
      <li>
        <a href="#">
        <FontAwesomeIcon icon={faGear} />
          <div className="QAsidemenu6">Setting</div>
        </a>
      </li>
      <li>
        <a href="#">
        <FontAwesomeIcon icon={faSignOut} />
          <div className="QAsidemenu7">Log Out</div>
        </a>
      </li>
     
    </ul>
  </div>

  <div className="QAMain">

    
  <div className="QAcharts">

      <div className="QAchartBox"> 
        <div className="QAchart">
          <ResponsiveContainer width="60%" height={300}>
            <BarChart data={qulity} margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="moisturisingLevel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="moisturisingLevel" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>



        </div>
      </div>

      <div className="QAchartBox"> 
        <div className="QAchart">
        <ResponsiveContainer width="60%" height={300}>
          <PieChart data={qulity} margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
            <Tooltip />
            <Legend />
            <Pie 
              data={qulity} 
              dataKey="wight" 
              nameKey="wight" 
              fill="#8884d8" 
              label
            />
          </PieChart >
        </ResponsiveContainer>

  
        </div>
      </div>

  </div>
        
    <QulityForm
      addQulity={addQulity}
      updateQulity={updateQulity}
      deleteQulity={deleteQulity}
      submitted={submitted}
      data={selectedQulity}
      isEdit={isEdit}/><br/>
    <QuantityTable
       rows={qulity}
       selectedQulity={data=>{
           setSelectedQulity(data);
           setIsEdit(true);
       }}

       deleteQulity={data => window.confirm('Are you sure?') && deleteQulity(data)}
    
    />
  </div>
</div>
)
}

export default Quantity;