const {response}=require("./app");
const Supplier = require("./model");

const getSupplier=(req,res,next)=>{
    Supplier.find()
        .then(response=>{
            res.json({response})
        })
        .catch(error=>{
            res.json({error})
        })
};

//////////////////////////////////////////////////
const addSupplier=(req,res,next)=>{
    const supplier=new Supplier({
        
        sId:req.body.sId,
        sName:req.body.sName,
        quantity:req.body.quantity,
        teaType:req.body.teaType,
        orderDate:req.body.orderDate,
        price:req.body.price
    });

    supplier.save()

    .then(response=>{
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    })
}

////////////////////////////////////////////////////

const updateSupplier=(req,res,next)=>{
    const{sId,sName,quantity,teaType,orderDate,price}=req.body;
    Supplier.updateOne({sId:sId},{$set:{sName:sName,quantity:quantity,teaType:teaType,orderDate:orderDate,price:price}})

    .then(response=>{
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    })
}

//////////////////////////////////////////////////////
const deleteSupplier=(req,res,next)=>{

    const sId=req.body.sId;
    Supplier.deleteOne({sId:sId})

    .then(response=>{
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    })
}

exports.getSupplier=getSupplier;
exports.addSupplier=addSupplier;
exports.updateSupplier=updateSupplier;
exports.deleteSupplier=deleteSupplier;
