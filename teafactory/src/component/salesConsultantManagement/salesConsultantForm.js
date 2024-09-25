import { Container, Grid, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import './SalesConsultantForm.css';

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

const SalesConsultantForm = ({ addOrder, submitted, data, isEdit, updateOrder }) => {
    const [customerId, setCustomerId] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [teaType, setTeaType] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!submitted) {
            const newId = Math.floor(Math.random() * 10000);
            setCustomerId(newId);
            resetForm();
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.customerId && data.customerId !== 0) {
            setCustomerId(data.customerId);
            setCustomerName(data.customerName);
            setQuantity(data.quantity);
            setContactNumber(data.contactNumber);
            setOrderDate(data.orderDate);
            setPrice(data.price);
            setAddress(data.address);
        }
    }, [data]);

    const resetForm = () => {
        setCustomerName('');
        setQuantity('');
        setContactNumber('');
        setOrderDate('');
        setPrice('');
        setAddress('');
        setTeaType('');
    };

    const validateFields = () => {
        const newErrors = {};
        if (!customerName) newErrors.customerName = "Customer Name is required.";
        if (!quantity) newErrors.quantity = "Quantity is required.";
        if (!teaType) newErrors.teaType = "Tea Type is required.";
        if (!contactNumber) newErrors.contactNumber = "Contact Number is required.";
        if (!orderDate) newErrors.orderDate = "Order Date is required.";
        if (!address) newErrors.address = "Address is required.";
        if (!price || isNaN(price) || price <= 0) newErrors.price = "Price must be a valid number and greater than 0.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            const orderData = { customerId, customerName, quantity, teaType, contactNumber, orderDate, price, address };
            isEdit ? updateOrder(orderData) : addOrder(orderData);
        }
    };

    return (
        <Container sx={{ padding: "20px", maxWidth: "800px", background: "linear-gradient(145deg, #f3f3f3, #e2e2e2)", borderRadius: "10px", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", marginTop: "30px" }}>
            <Typography variant="h4" sx={{ textAlign: "center", color: "#333", marginBottom: "20px", fontWeight: 700 }}>
                Order Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        label="Customer Name" 
                        variant="outlined" 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)} 
                        error={!!errors.customerName}
                        helperText={errors.customerName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        label="Contact Number" 
                        type="number" 
                        variant="outlined" 
                        value={contactNumber} 
                        onChange={(e) => setContactNumber(e.target.value)} 
                        error={!!errors.contactNumber}
                        helperText={errors.contactNumber}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        label="Address" 
                        variant="outlined" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        label="Quantity (Kg)" 
                        type="number" 
                        variant="outlined" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.teaType}>
                        <InputLabel>Tea Type</InputLabel>
                        <Select
                            value={teaType}
                            onChange={(e) => setTeaType(e.target.value)}
                            label="Tea Type"
                        >
                            <MenuItem value="Black Tea">Black Tea</MenuItem>
                            <MenuItem value="Green Tea">Green Tea</MenuItem>
                            <MenuItem value="Oolong Tea">Oolong Tea</MenuItem>
                            <MenuItem value="Herbal Infusion">Herbal Infusion</MenuItem>
                        </Select>
                        {errors.teaType && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.teaType}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        label="Order Date" 
                        type="date" 
                        variant="outlined" 
                        value={orderDate} 
                        onChange={(e) => setOrderDate(e.target.value)} 
                        InputLabelProps={{ shrink: true }} 
                        error={!!errors.orderDate}
                        helperText={errors.orderDate}
                        inputProps={{ min: getCurrentDate() }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        label="Price (LKR)" 
                        type="number" 
                        variant="outlined" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ marginTop: "30px" }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    style={{ backgroundColor: '#168145', color: '#fff' }}
                    onClick={handleSubmit}
                    sx={{ backgroundColor: "#4caf50", ":hover": { backgroundColor: "#45a049" }, width: "200px" }}
                >
                    {isEdit ? 'Update Order' : 'Submit Order'}
                </Button>
            </Grid>
        </Container>
    );
};

export default SalesConsultantForm;
