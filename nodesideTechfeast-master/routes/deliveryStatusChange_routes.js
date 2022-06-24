var express=require('express');
var router=express.Router();
var orderToVendor=require('../models/orderToVendor_table_model');

router.get("/:ven_order_id",function(req,res,next){
    orderToVendor.updateStatusOfDelivery(req.params.ven_order_id,function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;
