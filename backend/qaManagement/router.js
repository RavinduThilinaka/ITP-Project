const express=require('express');
const router=express.Router();
const controller=require('./controller');
const {routes}=require('./app');

router.get("/qulity",controller.getQulity);
router.post("/addQulity",controller.addQulity);
router.post("/updateQulity",controller.updateQulity);
router.post("/deleteQulity",controller.deleteQulity);

module.exports=router