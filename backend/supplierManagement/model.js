const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const supplierSchema=new Schema({

    sId:String,
    sName:String,
    quantity:Number,
    teaType:String,
    orderDate:String,
    price:Number,
});

const Supplier=mongoose.model('Supplier',supplierSchema);
module.exports=Supplier;