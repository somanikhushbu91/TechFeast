var invoice1=require("../models/order_table_model");
var express = require("express");
var router = express.Router();

router.get("/:mode",function(req,res,next){
  invoice1.getInvoiceByMode(req.params.mode,function(err,rows){
      if(err){
        res.json(err);
      } 
      else{
        res.json(rows);
      }
  });
});
  module.exports=router;