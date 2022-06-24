var express=require('express');
var router=express.Router();
var vendor=require('../models/vendor_table_model');

router.post('/',function(req,res,next){
    vendor.loginData(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;