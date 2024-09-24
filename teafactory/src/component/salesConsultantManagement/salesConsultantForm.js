import { color } from "framer-motion";
import './SalesConsultantForm.css';
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

const SalesConsultantForm=({addOrder,submitted,data,isEdit,updateOrder})=>{

    const [customerId,setCustomerId]=useState(0);
    const [customerName,setCustomerName]=useState();
    const [quantity,setQuantity]=useState();
    const [teaType,setTeaType]=useState();
    const [contactNumber,setContactNumber]=useState();
    const [orderDate,setOrderDate]=useState();
    const [price, setPrice] = useState();
    const [address, setAddress] = useState('');
    const [priceError, setPriceError] = useState('');
    const [nameError, setCustomerNameError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [contactNumberError, setContactNumberError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [orderDateError, setOrderDateError] = useState('');
    const [teaTypeError, setTeaTypeError] = useState('');

    useEffect(()=>{
        if(!submitted){
            const newId = Math.floor(Math.random() * 10000); 
            setCustomerId(newId);
            setQuantity('');
            setContactNumber('');
            setOrderDate('');
            setPrice('');
        }
    },[submitted])

    useEffect(()=>{
        if(data?.customerId && data.customerId !==0){
            setCustomerId(data.customerId);
            setCustomerName(data.customerName);
            setQuantity(data.quantity);
            setContactNumber(data.contactNumber);
            setOrderDate(data.orderDate);
            setPrice(data.price);
            setAddress(data.address);
        }
    },[data])

    const handleNameKeyPress = (e) => {
        if (!isValidTextChar(e.key)) {
            e.preventDefault();
            setCustomerNameError('You can only use characters and spaces.');
        }
    };

    const handleContactNumberKeyPress = (e) => {
        if (!isSecondvalide(e.key)) {
            e.preventDefault();
            setContactNumberError('The only thing that is allowed are numbers and spaces.');
        }
    };


    const validatePrice = () => {
        if (!isValidPrice(price)) {
            setPriceError('The price must be more than zero.');
            return false;
        }
        setPriceError('');
        return true;
    };

    const handleSubmit = () => {

            // Reset error messages
            setCustomerNameError('');
            setQuantityError('');
            setContactNumberError('');
            setOrderDateError('');

            if (!customerName) {
                setCustomerNameError("Supplier Name is required.");
            }
            if (!quantity) {
                setQuantityError("Quantity is required.");
            }
            if (!contactNumber) {
                setContactNumberError("Tea Type is required.");
            }
            if (!orderDate) {
                setOrderDateError("Order Date is required.");
            }
            if(!address) {
                setAddressError("Address is required.");
            }
            if(!teaType) {
                setTeaTypeError("Tea Type is required.");
            }
            if(!price) {
                setPriceError("Price is required.");
            }
    

        if (customerName && quantity && contactNumber && orderDate && validatePrice()) {
           
            isEdit ? updateOrder({ customerId, customerName, quantity, contactNumber, orderDate, price,teaType,address }) : addOrder({ customerId, customerName, quantity, contactNumber, orderDate, price,address,teaType });
        }
    };
   

    return(

    <Container>
        <Grid
         spacing={1}
         sx={{
            backgroundImage: "url('./image/supplier.png')",  
            backgroundColor:"#e6eae6bf",
            backgroundPosition:"center",
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
                Order Details 
            </Typography>
        </Grid>
              
        </Grid>

        <Grid 
        spacing={1} 
        sx={{
            backgroundImage: "url('./image/supplier.png')",   
            backgroundColor: "#e6eae6bf",
            backgroundPosition:"center",
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
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}} >Customer Name</Typography>
                <div className="input"><input type="text" placeholder="Enter Customer Name"   value={customerName} onChange={e=>setCustomerName(e.target.value)} required onKeyPress={handleNameKeyPress}></input></div>
                {nameError && <Typography sx={{ color: "red" }}>{nameError}</Typography>}
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Contact Number</Typography>
                <div className="input"><input type="number" placeholder="Enter Contact Number"  value={contactNumber} onChange={e=>setContactNumber(e.target.value)} required onKeyUp={handleContactNumberKeyPress}></input></div>
                {quantityError && <Typography sx={{ color: "red" }}>{contactNumberError}</Typography>}
               
        </Grid>

        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}} >Address</Typography>
                <div className="input"><input type="text" placeholder="Enter Address"   value={address} onChange={e=>setAddress(e.target.value)} required></input></div>
                {addressError && <Typography sx={{ color: "red" }}>{addressError}</Typography>}
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Quantity</Typography>
                <div className="input"><input type="number" placeholder="Enter Quantity"  value={quantity} onChange={e=>setQuantity(e.target.value)} required></input></div>
                {quantityError && <Typography sx={{ color: "red" }}>{quantityError}</Typography>}
               
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
                {teaTypeError && <Typography sx={{ color: "red" }}>{teaTypeError}</Typography>}
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Order date</Typography>
                <div className="input"><input type="date" placeholder="Enter Order date" value={orderDate} min={getCurrentDate()} onChange={e=>setOrderDate(e.target.value)} required></input></div>
                {orderDateError && <Typography sx={{ color: "red" }}>{orderDateError}</Typography>}
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Price</Typography>
                <div className="input"><input type="text" placeholder="Enter Price" value={price}  onChange={e=>setPrice(e.target.value)} required></input></div>
                {priceError && <Typography sx={{ color: "red" }}>{priceError}</Typography>}
        </Grid>

        <Grid>
           <Typography sx={{marginLeft:"42%"}} className="supplierBtn">
                <button onClick={handleSubmit}>
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
export default SalesConsultantForm