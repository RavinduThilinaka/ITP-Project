import { searchOutline } from 'ionicons/icons';
import { useReactToPrint } from "react-to-print";
import React, {useRef, useState } from 'react';
import './QulityTable.css'
import { Button } from '@mui/material';

const QuantityTable=({rows=[],selectedQulity,deleteQulity})=>{

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
                <div ref={ComponentsRef}>
               
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
                                        <td>{row.wight} Kg</td>
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
                </table>
                </div>
                <Button onClick={handlePrint} className="btn">Downlode Report</Button>
            </div>
        </div>

        
    </div>
    );
}

export default QuantityTable;