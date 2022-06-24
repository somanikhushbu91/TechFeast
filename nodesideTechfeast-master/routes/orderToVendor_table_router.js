var express=require('express');
var router=express.Router();
var orderToVendor=require('../models/orderToVendor_table_model');

router.get('/',function(req,res,next){
    orderToVendor.getAllData(function(err,rows){
        if(err)
        {
            res.json(err);
        } 
        else{
            res.json(rows);
        }
    });
});

router.delete("/:ven_order_id",function(req,res,next){
    orderToVendor.deleteData(req.params.ven_order_id,function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.post('/',function(req,res,next){
    orderToVendor.addData(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.put("/:ven_order_id",function(req,res,next){
    console.log(req.params.ven_order_id);
    console.log(req.body);
    orderToVendor.updatePriceAndAmount(req.params.ven_order_id,req.body,function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});


module.exports=router;