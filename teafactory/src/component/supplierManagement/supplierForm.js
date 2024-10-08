import { color } from "framer-motion";
import './SupplierForm.css';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const { Container, Grid, Typography, Button, Snackbar,Alert, IconButton } = require("@mui/material");

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

const isValidTextChar = (char) => /^[A-Za-z\s]$/.test(char);
const isValidPrice = (price) => !isNaN(price) && parseFloat(price.replace(/,/g, '')) > 0;
const isSecondvalide=(double) => /^\d*\.?\d*$/.test(double);

const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);  // This will format the price with commas
};

const SupplierForm=({addSupplier,submitted,data,isEdit,updateSupplier})=>{

    const [sId,setId]=useState(0);
    const [sName,setName]=useState();
    const [quantity,setQuantity]=useState();
    const [teaType,setTeaType]=useState();
    const [orderDate,setOrderDate]=useState();
    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState('');
    const [nameError, setNameError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [teaTypeError, setTeaTypeError] = useState('');
    const [orderDateError, setOrderDateError] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for progress indicator
    const [successMessage, setSuccessMessage] = useState('');


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
            setPrice(formatPrice(data.price));
            
        }
    },[data])

    const handleNameKeyPress = (e) => {
        if (!isValidTextChar(e.key)) {
            e.preventDefault();
            setNameError('You can only use characters and spaces.');
        }
    };

    const handlePirceKeyPress = (e) => {
        if (!isSecondvalide(e.key)) {
            e.preventDefault();
            setPriceError('The only thing that is allowed are numbers and spaces.');
        }
    };


    const validatePrice = () => {
        const numericPrice = price.replace(/,/g, '');  // Remove commas before validation
        if (!isValidPrice(numericPrice)) {
            setPriceError('The price must be more than zero.');
            return false;
        }
        setPriceError('');
        return true;
    };

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/,/g, '');  // Remove existing commas
        if (isSecondvalide(value)) {
            setPrice(formatPrice(value));  // Format and update price with commas
            setPriceError('');
        } else {
            setPriceError('Invalid price format.');
        }
    };

    const handleQuantityKeyPress = (e) => {
        if (!isSecondvalide(e.key)) {
            e.preventDefault();
            setQuantityError('The only thing that is allowed are numbers.');
        }
    };

    
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value.length > 10) {
            setQuantityError('Quantity cannot exceed 10 characters.');
        } else {
            setQuantityError('');
            if (parseFloat(value) < 0) {
                setQuantityError('Quantity cannot be negative.');
            } else {
                setQuantity(value);
            }
        }
    };


    const handleSubmit = () => {

            // Reset error messages
            setNameError('');
            setQuantityError('');
            setTeaTypeError('');
            setOrderDateError('');

            if (!sName) {
                setNameError("Supplier Name is required.");
            }
            if (!quantity) {
                setQuantityError("Quantity is required.");
            }
            if (!teaType) {
                setTeaTypeError("Tea Type is required.");
            }
            if (!orderDate) {
                setOrderDateError("Order Date is required.");
            }
    

            if (sName && quantity && teaType && orderDate && validatePrice()) {
                const numericPrice = price.replace(/,/g, '');
                if (isEdit) {
                    updateSupplier({ sId, sName, quantity, teaType, orderDate, price: numericPrice });
                    setSuccessMessage("Supplier updated successfully!");
                } else {
                    addSupplier({ sId, sName, quantity, teaType, orderDate, price: numericPrice });
                    setSuccessMessage("Supplier added successfully!");
                }
                setOpenSnackbar(true); // Show Snackbar on successful submission
            }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
                Supplier Order
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
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}} >Supplier Name</Typography>
                <div className="input"><input type="text" placeholder="Enter Supplier Name"  onKeyPress={handleNameKeyPress} value={sName} onChange={e=>setName(e.target.value)} required></input></div>
                {nameError && <Typography sx={{ color: "red" }}>{nameError}</Typography>}
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Quantity</Typography>
                <div className="input"><input type="number" placeholder="Enter Quantity"  value={quantity} onChange={handleQuantityChange} required></input></div>
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
                <div className="input"><input type="date" placeholder="Enter Order date" value={orderDate} min={getCurrentDate()} onChange={e=>setOrderDate(e.target.value)} onFocus={(e) => e.target.showPicker()}require></input></div>
                {orderDateError && <Typography sx={{ color: "red" }}>{orderDateError}</Typography>}
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px",fontWeight: "bold"}}>Price</Typography>
                <div className="input"><input type="text" placeholder="Enter Price" value={price} onKeyPress={handlePirceKeyPress}  onChange={handlePriceChange} required></input></div>
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

        <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                       
                        </IconButton>
                    }
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', backgroundColor: '#06402b', color: '#fff' }}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            
        </Grid>

    </Container>
    );

}
export default SupplierForm