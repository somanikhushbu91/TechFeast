var express=require('express');
var router=express.Router();
var order_details=require('../models/order_details_model');

router.get('/',function(req,res,next){
    order_details.getAllData(function(err,rows){
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
