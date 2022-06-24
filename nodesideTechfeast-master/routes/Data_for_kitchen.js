var express=require('express');
var router=express.Router();
var order=require('../models/order_table_model');

router.get('/',function(req,res,next){
    order.getAllDataForKitchen(function(err,rows){
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