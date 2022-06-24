var express=require('express');
var router=express.Router();
var order=require('../models/order_table_model');

router.get('/:menu_id',function(req,res,next){
    order.getDataForStockDecreseQuantity(req.params.menu_id,function(err,rows){
        console.log(rows);
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