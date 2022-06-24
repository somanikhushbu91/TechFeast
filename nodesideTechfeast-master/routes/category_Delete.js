var express=require('express');
var router=express.Router();
var category=require('../models/category_table_model');

router.post('/',function(req,res,next){
    category.deleteAll(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});


module.exports=router;