const express=require('express');
const app=express();
const cors=require('cors')
const controller=require('./controller');

app.use(cors());

app.use(
    express.urlencoded({
        extended:true,
    })
);

app.use(express.json());

app.get('/supplier',(req,res)=>{
    var resObj=[];
    controller.getSupplier((req,res,next)=>{
        res.send();
    });
});

app.post('/addSupplier',(req,res)=>{
    controller.addSupplier(req.body,(callback)=>{
        res.send();
    });
});

app.post('/updateSupplier',(req,res)=>{
    controller.updateSupplier(req.body,(callback)=>{
        res.send(callback)
    });
});

app.post('/deleteSupplier',(req,res)=>{
    controller.deleteSupplier(req.body,(callback)=>{
        res.send(callback)
    });
});