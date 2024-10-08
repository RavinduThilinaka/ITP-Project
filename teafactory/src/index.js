import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './component/login';


import Register from './component/userManagement/register';
import RegisterTable from './component/userManagement/registerTable';
import SupplierTable from './component/supplierManagement/supplierTable';
import SupplierForm from './component/supplierManagement/supplierForm';
import Supplier from './component/supplierManagement/supplier';
import Quantity from './component/qaManagement/quality';
import QulityForm from './component/qaManagement/qulityForm';
import QuantityTable from './component/qaManagement/qulityTable';
import ServicePage from './service';
import ContactUs from './component/contactManagement/contact';
import SalesConsultant from './component/salesConsultantManagement/salesConsultant';
import Profile from './component/userManagement/profile';
import Profile2 from './component/salesConsultantManagement/profile';
import AdminDashboard from './component/adminManagement/adminDashoboard';
import Video from './vedio';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/sales-consultant' element={<SalesConsultant/>}/>
      <Route path='/registerTable' element={<RegisterTable/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/supplierTable' element={<SupplierTable/>}/>
      <Route path='/supplierform' element={<SupplierForm/>}/>
      <Route path='/supplier' element={<Supplier/>}/>
      <Route path='/quality' element={<Quantity/>}/>
      <Route path='/qualityform' element={<QulityForm/>}/>
      <Route path='/qualityTable' element={<QuantityTable/>}/>
      <Route path='/service' element={<ServicePage/>}/>
      <Route path='/contactus' element={<ContactUs/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/sales-consultant-profile' element={<Profile2/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/vedio' element={<Video/>}/>
    </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
