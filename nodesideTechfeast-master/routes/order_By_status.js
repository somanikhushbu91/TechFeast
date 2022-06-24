var order1 = require("../models/order_table_model");
var express = require("express");
var router = express.Router();

router.get('/:status',function(req,res,next){
    console.log("how are you");
    order1.getOrderByStatus(req.params.status,function(err,rows){
        console.log(req.params.status);
        if(err){
            res.json(err);
        }
        else{ 
            res.json(rows);
        }
    });
});

module.exports=router;