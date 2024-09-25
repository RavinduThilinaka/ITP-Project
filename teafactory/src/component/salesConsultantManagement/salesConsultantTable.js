import './SalesConsultant.css';
import { IonIcon } from '@ionic/react';
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { searchOutline } from 'ionicons/icons';

const SalesConsultantTable = ({ rows = [], selectedOrder, deleteOrder }) => {
    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        DocumentTitle: "Supplier Report",
        onAfterPrint: () => ("Supplier Report Successfully Downloaded!"),
    });

    const [searchQuery, setSearchQuery] = useState("");

    const filteredRows = rows.filter(row =>
        Object.values(row).some(
            field => field != null && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="SupplierDashboard">
            <div className="table_container">
                <div className="table_container_2">
                    <div className="TableHeader">
                        <h2>Order History</h2>
                        <div className="search_box">
                            <TextField 
                                fullWidth 
                                label="Search here" 
                                variant="outlined" 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                            />
                            <IonIcon icon={searchOutline} />
                        </div>
                        <Button className="btn">View All</Button>
                    </div>
                    
                    <div ref={ComponentsRef}>
                    <img src="/image/TeaFactoryLogo.png" alt="Company Logo" className="companyLogo" width={50} height={50} />
                            
                            <div className='LeafLink'>
                                <h2>LeafLink</h2>
                            </div>

                    <table >
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Quantity (Kg)</th>
                                <th>Tea Type</th>
                                <th>Order Date</th>
                                <th>Price (LKR)</th>
                                <th>Contact Number</th>
                                <th>Address</th>
                                <th className="noPrint">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredRows && filteredRows.length > 0 ? filteredRows.map(row => (
                                    <tr key={row.customerId}>
                                        <td>{row.customerName}</td>
                                        <td>{row.quantity} Kg</td>
                                        <td>{row.teaType}</td>
                                        <td>{row.orderDate}</td>
                                        <td>Rs.{row.price}</td>
                                        <td>{row.contactNumber}</td>
                                        <td>{row.address}</td>
                                        <td className="noPrint">
                                            <Button 
                                                variant="outlined" 
                                                onClick={() => selectedOrder({
                                                    customerId: row.customerId,
                                                    customerName: row.customerName,
                                                    quantity: row.quantity,
                                                    teaType: row.teaType,
                                                    orderDate: row.orderDate,
                                                    price: row.price,
                                                    address: row.address,
                                                    contactNumber: row.contactNumber
                                                })}
                                            >
                                                Update
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                style={{ backgroundColor: '#168145', color: '#fff' }} 
                                                onClick={() => deleteOrder({ customerId: row.customerId })}
                                            >
                                                Delete
                                            </Button>

                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center' }}>No data</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    
                    </div>

                    <Button onClick={handlePrint} className="btn" variant="contained" color="primary">
                        Download Report
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SalesConsultantTable;