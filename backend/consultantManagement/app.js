const express=require('express');
const app=express();
const cors=require('cors')
const controller=require('./controller');

app.use(cors());

app.use(
    express.urlencoded({
        extended:true
    })
);

app.use(express.json());

app.get('/order',(req,res)=>{
    var resObj=[];
    controller.getOrder((req,res,next)=>{
        res.send();
    });
});

app.post('/order',(req,res)=>{
    controller.addOrder(req.body,(callback)=>{
        res.send();
    });
});

app.patch('/order',(req,res)=>{
    controller.updateOrder(req.body,(callback)=>{
        res.send(callback)
    });
});

app.delete('/order',(req,res)=>{
    controller.deleteOrder(req.body,(callback)=>{
        res.send(callback)
    });
});