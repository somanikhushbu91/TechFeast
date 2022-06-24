var express=require('express');
var router=express.Router();
var cart=require('../models/cart_table_model');

router.post('/',function(req,res,next){
    cart.deleteAll(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});


module.exports=router;