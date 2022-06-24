var express=require('express');
var router=express.Router();
var feedback=require('../models/feedback_table_model');

router.get('/',function(req,res,next){
    feedback.getAllFeedbackCount(function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;