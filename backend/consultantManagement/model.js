const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const orderSchema=new Schema({
    customerId:Number,
    customerName:String,
    quantity:Number,
    teaType:String,
    orderDate:String,
    price:Number,
    address:String,
    contactNumber:Number
});

const Order=mongoose.model('Order',orderSchema);
module.exports=Order;