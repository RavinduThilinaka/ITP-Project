import './Supplier.css'
import { IonIcon } from '@ionic/react';
import { useReactToPrint } from "react-to-print";
import React, { useEffect ,useRef, useState } from 'react';
import { Button } from '@mui/material';
import { searchOutline } from 'ionicons/icons';


const SupplierTable=({rows=[],selectedSupplier,deleteSupplier})=>{

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
                                    <th>Supplier Name</th>
                                    <th>Quantity (Kg)</th>
                                    <th>Tea type</th>
                                    <th>Order date</th>
                                    <th>Price (LKR)</th>
                                    <th className="noPrint">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                filteredRows && filteredRows.length > 0 ? filteredRows.map(row=>(
                                    <tr key={row.sId}>
                                        <td>{row.sName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.teaType}</td>
                                        <td>{row.orderDate}</td>
                                        <td>{row.price}</td>
                                        <td className="noPrint">
                                            <button className='updateBtn' onClick={()=>selectedSupplier({sId: row.sId,sName: row.sName ,quantity: row.quantity, teaType: row.teaType, orderDate: row.orderDate, price: row.price})}>Update</button>
                                            <button className='deleteBtn' onClick={()=>deleteSupplier({sId:row.sId})}>Delete</button>
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

export default SupplierTable;