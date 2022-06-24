var express=require('express');
var router=express.Router();
var orderToVendor=require('../models/orderToVendor_table_model');

router.get('/:vendor_email',function(req,res,next){
    orderToVendor.getDataBynotdeliveredandvendoremail(req.params.vendor_email,function(err,rows){
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