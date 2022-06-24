var express=require('express');
var router=express.Router();
var stock=require('../models/stock_table_model');

router.put("/:stock_id",function(req,res,next){
    console.log(req.body);
    stock.updateStock_By_Vendor(req.params.stock_id,req.body,function(err,rows){        
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

module.exports=router;