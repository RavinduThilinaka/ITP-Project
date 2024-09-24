const {response}=require("./app");
const Order = require("./model");

const getOrder=(req,res,next)=>{
    Order.find()
        .then(response=>{
            res.json({response})
        })
        .catch(error=>{
            res.json({error})
        })
};

//////////////////////////////////////////////////
const addOrder = (req, res, next) => {
    // Change the variable name here to avoid conflict with the Order model
    const newOrder = new Order({
        customerId: req.body.customerId, // changed from req.params.customerId to req.body.customerId
        customerName: req.body.customerName,
        quantity: req.body.quantity,
        teaType: req.body.teaType,
        orderDate: req.body.orderDate,
        price: req.body.price,
        address: req.body.address,
        contactNumber: req.body.contactNumber
    });

    newOrder.save()
        .then(result => { // Use the result returned from save()
            console.log('Order created:', result);
            res.json({ result }); // Return the result after the order is saved
        })
        .catch(error => {
            console.log('Error:', error);
            res.json({ error });
        });
};


////////////////////////////////////////////////////

const updateOrder=(req,res,next)=>{
    const{customerId,customerName,quantity,teaType,orderDate,price,address,contactNumber}=req.body;
    Order.updateOne({customerId:customerId},{$set:{customerName:customerName,quantity:quantity,teaType:teaType,orderDate:orderDate,price:price,address:address,contactNumber:contactNumber,contactNumber:contactNumber}})

    .then(response=>{
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    })
}

//////////////////////////////////////////////////////
const deleteOrder=(req,res,next)=>{
    const customerId=req.body.customerId;
    Order.deleteOne({customerId:customerId})

    .then(response=>{
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    })
}

exports.getOrder=getOrder;
exports.addOrder=addOrder;
exports.updateOrder=updateOrder;
exports.deleteOrder=deleteOrder;
