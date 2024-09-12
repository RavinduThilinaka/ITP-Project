const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const qulitySchema=new Schema({

    qId:Number,
    sName:String,
    moisturisingLevel:Number,
    wight:Number,
    checkDate:String,
    leafType:String,
  
});

const Qulity=mongoose.model('Qulity',qulitySchema);
module.exports=Qulity;