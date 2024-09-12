const express=require('express');
const router=express.Router();
const controller=require('./controller');
const {routes}=require('./app');

router.get("/supplier",controller.getSupplier);
router.post("/addSupplier",controller.addSupplier);
router.post("/updateSupplier",controller.updateSupplier);
router.post("/deleteSupplier",controller.deleteSupplier);

module.exports=router