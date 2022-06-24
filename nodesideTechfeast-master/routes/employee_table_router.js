var express=require('express');
var router=express.Router();
var user=require('../models/employee_table_model');

router.get('/',function(req,res,next){
    user.getAllData(function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get("/:email_id",function(req,res,next){
    user.getDataById(req.params.email_id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

    router.post('/',function(req,res,next){
        user.addData(req.body,function(err,rows){
            if (err){
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    });

router.put("/:email_id",function(req,res,next){
    user.updateData(req.params.email_id,req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete("/:email_id",function(req,res,next){
    user.deleteData(req.params.email_id,function(err,rows){
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