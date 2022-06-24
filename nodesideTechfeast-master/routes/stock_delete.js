var express=require('express');
var router=express.Router();
var stock=require('../models/stock_table_model');

router.post('/',function(req,res,next){
    stock.deleteAll(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;