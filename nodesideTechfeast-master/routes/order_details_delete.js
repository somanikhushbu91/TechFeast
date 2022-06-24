var express=require('express');
var router=express.Router();
var order_details=require('../models/order_details_table_model');

router.post('/',function(req,res,next){
    order_details.deleteAll(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;