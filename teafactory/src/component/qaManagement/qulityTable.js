import { searchOutline } from 'ionicons/icons';
import { useReactToPrint } from "react-to-print";
import React, {useRef, useState,useEffect } from 'react';
import './QulityTable.css'
import { Button } from '@mui/material';

const QuantityTable=({rows=[],selectedQulity,deleteQulity})=>{


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

    const ComponentsRef=useRef();
    const handlePrint=useReactToPrint({
        content:()=>ComponentsRef.current,
        DocumentTitle:"Qulity Report",
        onAfterPrint:()=>("Qulity Report Successfully Downloade !"),
        
    });

    const[searchQuery, setSearchQuery]=useState("");
   
    const filteredRows = rows.filter(row =>
        Object.values(row).some(
            field => field != null && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
           
        )
    );

    return(
        <div className="qulityDashboard">


        <div class="QAtable_container">
         <div class="QAtable_container_2">
                <div class="QATableHeader">
                    <h2>Recent Order</h2>

                    <div class="QAsearch_box">
                        <label>
                            <input type="text" placeholder="Search here" name='search'  onChange={(e)=>setSearchQuery(e.target.value)}/>
                            
                        </label>
                    </div>

                    <a href="#" class="QAbtn">View All</a>
                    
                </div>
                <div className="underline"></div>
                <div ref={ComponentsRef}>
                <div className='linkLeafeAddress'>
                            LinkLeaf Tea Qulity Teams,<br />
                            No. 345, Tea Street,<br />
                            Colombo 8,<br />
                            Sri Lanka.
                            <div className='curDate'><strong>{currentDate}</strong></div>
                        </div>
               
                    <div className='LeafLink' style={{ display: 'flex', alignItems: 'center' }}>
                        
                        <h2 style={{ margin: 0,marginLeft:'40%' }} t>LeafLink </h2>
                        <img src="/image/TeaFactoryLogo.png" alt="Company Logo" className="companyLogo" width={50} height={50}  style={{ marginLeft: '10px' }} />
                    </div>
                <table className='table' >
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            <th>Moisturising Level (100%)</th>
                            <th>Weight (kg)</th>
                            <th>Date</th>
                            <th>Leaf Type</th>
                            <th className="noPrint">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                filteredRows && filteredRows.length > 0 ? filteredRows.map(row=>(
                                    <tr key={row.qId}>
                                        <td>{row.sName}</td>
                                        <td>{row.moisturisingLevel}%</td>
                                        <td>{new Intl.NumberFormat('en-US', { style: 'decimal', useGrouping: true }).format(row.wight)} Kg</td>
                                        <td>{row.checkDate}</td>
                                        <td>{row.leafType}</td>
                                        
                                        <td className="noPrint">
                                            <button className='updateBtn' onClick={()=>selectedQulity({qId: row.qId,sName: row.sName ,moisturisingLevel: row.moisturisingLevel, wight: row.wight, checkDate: row.checkDate,leafType: row.leafType})}>Update</button>
                                            <button className='deleteBtn' onClick={()=>deleteQulity({qId:row.qId})}>Delete</button>
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

export default QuantityTable;