const express=require('express');
const router=express.Router();
const controller=require('./controller');
const {routes}=require('./app');

router.get("/order",controller.getOrder);
router.post("/order",controller.addOrder);
router.patch("/order",controller.updateOrder);
router.post("/delete-order",controller.deleteOrder);

module.exports=router