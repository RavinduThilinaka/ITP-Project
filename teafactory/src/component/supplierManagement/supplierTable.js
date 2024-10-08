import './Supplier.css'
import { IonIcon } from '@ionic/react';
import { useReactToPrint } from "react-to-print";
import React, { useEffect ,useRef, useState } from 'react';
import { Button } from '@mui/material';
import { searchOutline } from 'ionicons/icons';
import { color } from 'framer-motion';


const SupplierTable=({rows=[],selectedSupplier,deleteSupplier})=>{

    const ComponentsRef=useRef();
    const handlePrint=useReactToPrint({
        content:()=>ComponentsRef.current,
        DocumentTitle:"Supplier Report",
        onAfterPrint:()=>("Supplier Report Successfully Downloade !"),
        
    });

    const[searchQuery, setSearchQuery]=useState("");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        // Function to format the date and time
        const updateDateTime = () => {
            const date = new Date();
            const formattedDate = date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setCurrentDate(`${formattedDate} at ${formattedTime}`);
        };

        // Update the date and time every second
        const intervalId = setInterval(updateDateTime, 1000);
        
        // Call updateDateTime initially to set the initial date and time
        updateDateTime();

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

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

                         
                    <div className="logo_container" ref={ComponentsRef}>
                        <div className='linkLeafeAddress'>
                            LinkLeaf Tea Suppliers,<br />
                            No. 123, Tea Street,<br />
                            Colombo 7,<br />
                            Sri Lanka.
                            <div className='curDate'><strong>{currentDate}</strong></div>
                        </div>
                        
                        <div className='LeafLink' style={{ display: 'flex', alignItems: 'center' }}>
                        
                            <h2 style={{ margin: 0,marginLeft:'40%' }} t>LeafLink </h2>
                            <img src="/image/TeaFactoryLogo.png" alt="Company Logo" className="companyLogo" width={50} height={50}  style={{ marginLeft: '10px' }} />
                            
                        </div>

                        <table>
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
                                        <td>{row.quantity} Kg</td>
                                        <td>{row.teaType}</td>
                                        <td>{row.orderDate}</td>
                                        <td>Rs.{parseFloat(row.price).toLocaleString()}</td>
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
                        </table><br></br>
                        <div className="signatureSection" style={{ marginTop: '20px', textAlign: 'center' }}>

                            <div style={{ borderTop: '1px solid #000', width: '250px', margin: '20px auto',marginRight:'0px' }}>
                                <span>Signature</span></div>
                            </div>
                        </div>
                      
                        <Button onClick={handlePrint} className="btn">Downlode Report</Button>
                   
                </div>
                </div>
                
        </div>
    );
}

export default SupplierTable;