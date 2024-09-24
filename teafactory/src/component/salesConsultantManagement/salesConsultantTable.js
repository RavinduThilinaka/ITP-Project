import './SalesConsultant.css';
import { IonIcon } from '@ionic/react';
import { useReactToPrint } from "react-to-print";
import React, { useEffect ,useRef, useState } from 'react';
import { Button } from '@mui/material';
import { searchOutline } from 'ionicons/icons';


const SalesConsultantTable=({rows=[],selectedOrder,deleteOrder})=>{

    const ComponentsRef=useRef();
    const handlePrint=useReactToPrint({
        content:()=>ComponentsRef.current,
        DocumentTitle:"Supplier Report",
        onAfterPrint:()=>("Supplier Report Successfully Downloade !"),
        
    });

    const[searchQuery, setSearchQuery]=useState("");
   
    const filteredRows = rows.filter(row =>
        Object.values(row).some(
            field => field != null && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
           
        )
    );
    
    return(

        
        <div className="SupplierDashboard">


                <div class="table_container">
                 <div class="table_container_2">
                        <div class="TableHeader">
                            <h2>Recent Order</h2>

                        <div class="search_box">
                            <label>
                                <input type="text" placeholder="Search here" onChange={(e)=>setSearchQuery(e.target.value)} name='search'/>
                                <ion-icon icon={searchOutline}></ion-icon>        
                             </label>
                        </div>

                            <a href="#" class="btn">View All</a>
                        </div>
                        <table ref={ComponentsRef}>
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Quantity (Kg)</th>
                                    <th>Tea type</th>
                                    <th>Order date</th>
                                    <th>Price (LKR)</th>
                                    <th>Contact Number (LKR)</th>
                                    <th>Address</th>
                                    <th className="noPrint">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                filteredRows && filteredRows.length > 0 ? filteredRows.map(row=>(
                                    <tr key={row.customerId}>
                                        <td>{row.customerName}</td>
                                        <td>{row.quantity} Kg</td>
                                        <td>{row.teaType}</td>
                                        <td>{row.orderDate}</td>
                                        <td>Rs.{row.price}</td>
                                        <td>{row.contactNumber}</td>
                                        <td>{row.address}</td>
                                        <td className="noPrint">
                                            <button className='updateBtn' onClick={()=>selectedOrder({customerId: row.customerId,customerName: row.customerName ,quantity: row.quantity, teaType: row.teaType, orderDate: row.orderDate, price: row.price,address:row.address,contactNumber:row.contactNumber})}>Update</button>
                                            <button className='deleteBtn' onClick={()=>deleteOrder({customerId:row.customerId})}>Delete</button>
                                        </td>
                                    </tr>
                                )):(
                                    
                                   
                                    <td component='th' scope="row">No data</td>
                                   
                                )
                              }

                            </tbody>
                        </table>
                        <Button onClick={handlePrint} className="btn">Downlode Report</Button>
                    </div>
                </div>

                
        </div>
    );
}

export default SalesConsultantTable;