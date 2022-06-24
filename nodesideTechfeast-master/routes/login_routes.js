var express=require('express');
var router=express.Router();
var user=require('../models/employee_table_model');

router.post('/',function(req,res,next){
    user.loginData(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;