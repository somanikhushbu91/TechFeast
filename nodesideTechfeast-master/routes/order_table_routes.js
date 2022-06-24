var express=require('express');
var router=express.Router();
var order=require('../models/order_table_model');

router.get('/',function(req,res,next){
    order.getAllData(function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get('/:order_id',function(req,res,next){
    order.getMultipleOrderId(req.params.order_id,function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete("/:order_id",function(req,res,next){
    order.deletedata(req.params.order_id,function(err,rows){
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
    order.addOrderItem(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.put("/:order_id",function(req,res,next){
    order.updateData(req.params.order_id,req.body,function(err,rows){
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
