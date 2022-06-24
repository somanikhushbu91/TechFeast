var express=require('express');
var router=express.Router();
var charity=require('../models/charity_table_model');

router.post('/',function(req,res,next){
    charity.deleteAll(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;