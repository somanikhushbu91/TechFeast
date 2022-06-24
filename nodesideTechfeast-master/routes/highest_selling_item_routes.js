var invoicedetail=require("../models/order_details_table_model");
var express = require("express");
var router = express.Router();

router.get("/",function(req,res,next){
    invoicedetail.getTopSellingItems(function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows); 
        }
    });
});
module.exports=router;