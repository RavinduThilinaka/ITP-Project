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

app.get('/qulity',(req,res)=>{
    var resObj=[];
    controller.getQulity((req,res,next)=>{
        res.send();
    });
});

app.post('/addQulity',(req,res)=>{
    controller.addQulity(req.body,(callback)=>{
        res.send();
    });
});

app.post('/updateQulity',(req,res)=>{
    controller.updateQulity(req.body,(callback)=>{
        res.send(callback)
    });
});

app.post('/deleteQulity',(req,res)=>{
    controller.deleteQulity(req.body,(callback)=>{
        res.send(callback)
    });
});