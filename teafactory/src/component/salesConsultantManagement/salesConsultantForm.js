import { Container, Grid, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import './SalesConsultantForm.css';

// * date
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
    const [nameError, setNameError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [errors, setErrors] = useState({});
    const [priceError, setPriceError] = useState('');
    const isValidPrice = (price) => !isNaN(price) && parseFloat(price) > 0;
    const isSecondvalide=(double) => /^\d*\.?\d*$/.test(double);

    const handlePirceKeyPress = (e) => {
        if (!isSecondvalide(e.key)) {
            e.preventDefault();
            setPriceError('The only thing that is allowed are numbers.');
        }
    };


    const validatePrice = () => {
        if (!isValidPrice(price)) {
            setPriceError('The price must be more than zero.');
            return false;
        }
        setPriceError('');
        return true;
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (parseFloat(value) < 0) {
            setQuantityError('Quantity cannot be negative.');
        } else {
            setQuantityError('');
            setQuantity(value);
        }
    };

    const isValidTextChar = (char) => /^[A-Za-z\s]$/.test(char);
    const handleNameKeyPress = (e) => {
        if (!isValidTextChar(e.key)) {
            e.preventDefault();
            setNameError('You can only use characters and spaces.');
        } else {
            setNameError(''); // Clear the error when valid input is given
        }
    };

    useEffect(() => {
        if (!submitted) {
            const newId = Math.floor(Math.random() * 10000);
            setCustomerId(newId);
            resetForm();
        }
    }, [submitted]);

    //BE T FE
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
        setNameError('');
    };

    //*
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

        // Function to format price with two decimal places
        const formatPrice = (price) => {
            const parsedPrice = parseFloat(price);
            return isNaN(parsedPrice) ? '' : parsedPrice.toFixed(2); // 2 decimal places
        };

        const handleSubmit = () => {
            if (validateFields() && validatePrice()) {
                const formattedPrice = formatPrice(price); // Format the price before submitting
                const orderData = { 
                    customerId, 
                    customerName, 
                    quantity, 
                    teaType, 
                    contactNumber, 
                    orderDate, 
                    price: formattedPrice, // Use the formatted price here
                    address 
                };
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
                        onKeyPress={handleNameKeyPress}
                    />
                    {errors.sName && <Typography sx={{ color: "red" }}>{errors.sName}</Typography>}
                    {nameError && <Typography sx={{ color: "red" }}>{nameError}</Typography>} {/* Display name error */}
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        label="Contact Number" 
                        type="tel" 
                        variant="outlined" 
                        value={contactNumber} 
                        onChange={(e) => {
                            const value = e.target.value;
                            // Allow only digits and ensure the length does not exceed 10 digits
                            if (/^\d{0,10}$/.test(value)) {
                                setContactNumber(value);
                            }
                        }}
                        error={!!errors.contactNumber || (contactNumber && contactNumber.length !== 10)}
                        helperText={
                            errors.contactNumber 
                            ? errors.contactNumber 
                            : (contactNumber && contactNumber.length !== 10 ? 'Contact number must be exactly 10 digits.' : '')
                        }
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
                        onChange={handleQuantityChange} 
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                    />
                     {quantityError && <Typography sx={{ color: "red" }}>{quantityError}</Typography>}
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
                        onFocus={(e) => e.target.showPicker()} // This will open the date picker on focus
                    />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField 
                    fullWidth 
                    label="Price (LKR)" 
                    type="text" 
                    variant="outlined" 
                    value={price} 
                    onChange={(e) => {
                        const value = e.target.value;
                        // Regular expression to match numbers with up to two decimal places
                        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) { // Change Decimal places
                            setPrice(value);
                        }
                    }}
                    onBlur={() => {
                        // Format and round the price to two decimal points when the input loses focus
                        setPrice(formatPrice(price));
                    }}
                    error={!!errors.price || (price && parseFloat(price) <= 0 && price !== '')}
                    helperText={
                        errors.price 
                        ? errors.price 
                        : (price && parseFloat(price) <= 0 && price !== '' ? 'Price must be greater than 0.' : '')
                    }
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