const {response}=require("./app");
const Qulity = require("./model");

const getQulity=(req,res,next)=>{
    Qulity.find()
        .then(response=>{
            res.json({response})
        })
        .catch(error=>{
            res.json({error})
        })
};

//////////////////////////////////////////////////
const addQulity=(req,res,next)=>{
    const qulity=new Qulity({
        
        qId:req.body.qId,
        sName:req.body.sName,
        moisturisingLevel:req.body.moisturisingLevel,
        wight:req.body.wight,
        checkDate:req.body.checkDate,
        leafType:req.body.leafType,
        
    });

    qulity.save()

    .then(response=>{
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    })
}

////////////////////////////////////////////////////

const updateQulity=(req,res,next)=>{
    const{qId,sName,moisturisingLevel,wight,checkDate,leafType}=req.body;
    Qulity.updateOne({qId:qId},{$set:{sName:sName,moisturisingLevel:moisturisingLevel,wight:wight,checkDate:checkDate,leafType:leafType}})

    .then(response=>{
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    })
}

//////////////////////////////////////////////////////
const deleteQulity=(req,res,next)=>{

    const qId=req.body.qId;
    Qulity.deleteOne({qId:qId})

    .then(response=>{
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    })
}

exports.getQulity=getQulity;
exports.addQulity=addQulity;
exports.updateQulity=updateQulity;
exports.deleteQulity=deleteQulity;
