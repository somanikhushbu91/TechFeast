var express=require('express');
var router=express.Router();
var feedback=require('../models/feedback_table_model');

router.get('/',function(req,res,next){
    feedback.getAllFeedBack(function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.post('/',function(req,res,next){
    feedback.addFeedback(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete("/:feedback_id",function(req,res,next){
    feedback.deleteData(req.params.feedback_id,function(err,rows){
        if (err)
        {
            console.log('hello hiiii');
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;