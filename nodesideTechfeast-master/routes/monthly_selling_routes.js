var item = require("../models/menu_table_model");
var express = require("express");
var router = express.Router();

router.get('/',function(req,res,next){
    item.CategoryWiseItemSelling(function(err,rows){
        if(err){
            res.json(err);
        } 
        else{
            res.json(rows);
        }
    });
});


module.exports=router;