import { color } from "framer-motion";
import './SupplierForm.css';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const { Container, Grid, Typography, Button } = require("@mui/material");

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

const isValidTextChar = (char) => /^[A-Za-z\s]$/.test(char);
const isValidPrice = (price) => !isNaN(price) && parseFloat(price) > 0;
const isSecondvalide=(double) => /^\d*\.?\d*$/.test(double);



const SupplierForm=({addSupplier,submitted,data,isEdit,updateSupplier})=>{

    const [sId,setId]=useState(0);
    const [sName,setName]=useState();
    const [quantity,setQuantity]=useState();
    const [teaType,setTeaType]=useState();
    const [orderDate,setOrderDate]=useState();
    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState('');
    const [nameError, setNameError] = useState('');
   

    useEffect(()=>{
        if(!submitted){
            const newId = Math.floor(Math.random() * 10000); 
            setId(newId);
            setQuantity('');
            setTeaType('');
            setOrderDate('');
            setPrice('');
        }
    },[submitted])

    useEffect(()=>{
        if(data?.sId && data.sId !==0){
            setId(data.sId);
            setName(data.sName);
            setQuantity(data.quantity);
            setTeaType(data.teaType);
            setOrderDate(data.orderDate);
            setPrice(data.price);
            
        }
    },[data])

    const handleNameKeyPress = (e) => {
        if (!isValidTextChar(e.key)) {
            e.preventDefault();
            setNameError('Only letters and spaces are allowed.');
        }
    };

    const handlePirceKeyPress = (e) => {
        if (!isSecondvalide(e.key)) {
            e.preventDefault();
            setPriceError('Only Number and spaces are allowed.');
        }
    };


    const validatePrice = () => {
        if (!isValidPrice(price)) {
            setPriceError('Price must be a positive number.');
            return false;
        }
        setPriceError('');
        return true;
    };

    const handleSubmit = () => {
        if (validatePrice()) {
           
            isEdit ? updateSupplier({ sId, sName, quantity, teaType, orderDate, price }) : addSupplier({ sId, sName, quantity, teaType, orderDate, price });
        }
    };
   

    return(

    <Container>
        <Grid
         spacing={1}
         sx={{
            backgroundImage: "url('./image/LineGraph.png')",  
            backgroundColor:"#e6eae6bf",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
            marginTop:"12px",
            width:"90%",
            borderBottom:"3px solid #131313",
            marginLeft:"50px"
          

         }}>
        <Grid>
            <Typography sx={{fontSize:"30px",marginLeft:"40%",color:"#000000",fontWeight:"1000",fontFamily:""}}>
                Supplier Order
            </Typography>
        </Grid>
              
        </Grid>

        <Grid 
        spacing={1} 
        sx={{
            backgroundImage: "url('./image/LineGraph.png')",   
            backgroundColor: "#e6eae6bf",
            backgroundSize:"cover",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
            marginTop:"12px",
            width:"90%",
            color:"#222",
            borderBottom:"3px solid #131313",
            marginLeft:"50px",
            marginTop:"30px"
        }}>
        
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}} >Supplier Name</Typography>
                <div className="input"><input type="text" placeholder="Enter Supplier Name"  onKeyPress={handleNameKeyPress} value={sName} onChange={e=>setName(e.target.value)} required></input></div>
                {nameError && <Typography sx={{ color: "red" }}>{nameError}</Typography>}
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Quantity</Typography>
                <div className="input"><input type="number" placeholder="Enter Quantity"  value={quantity} onChange={e=>setQuantity(e.target.value)} required></input></div>
               
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Tea type</Typography>
                <div className="input"><select  value={teaType} onChange={e=>setTeaType(e.target.value)} style={{ fontWeight: "normal" }}>
                    <option>-----Select Tea Type----</option>
                    <option value="Black Tea">Black Tea</option>
                    <option value="Green Tea">Green Tea</option>
                    <option value="Oolong Tea">Oolong Tea</option>
                    <option value="Herbal infusion">Herbal infusion</option>
                </select></div>
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Order date</Typography>
                <div className="input"><input type="date" placeholder="Enter Order date" value={orderDate} min={getCurrentDate()} onChange={e=>setOrderDate(e.target.value)} require></input></div>
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Price</Typography>
                <div className="input"><input type="text" placeholder="Enter Price" value={price} onKeyPress={handlePirceKeyPress}  onChange={e=>setPrice(e.target.value)} required></input></div>
                {priceError && <Typography sx={{ color: "red" }}>{priceError}</Typography>}
        </Grid>

        <Grid>
           <Typography sx={{marginLeft:"42%"}} className="supplierBtn">
                <button onClick={handleSubmit}
                >
                    {
                    isEdit? 'Update' : 'Submit'
                    }
            </button>
           </Typography>
        </Grid>
            
        </Grid>
    </Container>
    );

}
export default SupplierForm