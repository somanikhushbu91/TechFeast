var express=require('express');
var router=express.Router();
var cart=require('../models/cart_table_model');

router.get('/',function(req,res,next){
    cart.getAllData(function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete('/:cart_id',function(req,res,next){
    cart.DeleteData(req.params.cart_id,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});
module.exports=router;