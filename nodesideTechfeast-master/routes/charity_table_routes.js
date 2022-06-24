var express=require('express');
var router=express.Router();
var charity=require('../models/charity_table_model');

router.get('/',function(req,res,next){
    charity.getAllData(function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get("/:charity_id",function(req,res,next){
    charity.getDataById(req.params.charity_id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.post('/',function(req,res,next){
    charity.addData(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.put("/:charity_id",function(req,res,next){
    charity.updateData(req.params.charity_id,req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete("/:charity_id",function(req,res,next){
    charity.deleteData(req.params.charity_id,function(err,rows){
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