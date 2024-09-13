const express=require('express');
const app=express();
const cors=require('cors');
const port=3001;
const host="localhost";
const mongoose=require('mongoose');
const router=require('./userManagement/router');
const router2=require('./supplierManagement/router');
const router3=require('./qaManagement/router');
const cookieParser = require('cookie-parser');


app.use(cors({
    origin: 'http://localhost:3000',
    methods:["GET","POST"],
    credentials: true, 
}));

app.use(cookieParser());


app.use(express.json());

const uri="mongodb+srv://Ravindu:ThilinakaMdb16@cluster0.h6r9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connect=async()=>{
    try{
        await mongoose.connect(uri);
        console.log('Connect to MongoDB');
    }catch(error){
        console.log('MongoDB Errore',error);
    }
};

connect();

const server=app.listen(port,host,()=>{
    console.log(`Node sever is listening to ${server.address().port}`)

});

app.use('/api',router);
app.use('/api',router2);
app.use('/api',router3);
