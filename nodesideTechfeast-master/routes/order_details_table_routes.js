var express=require('express');
var router=express.Router();
var order_details=require('../models/order_details_table_model');

router.get('/',function(req,res,next){
    order_details.getAllData(function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}); 


router.get('/:order_id',function(req,res,next){
    order_details.getAllData(req.params.order_id,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete('/:order_details_id',function(req,res,next){
    
    order_details.DeleteData(req.params.order_details_id,function(err,rows){
        
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.post('/',function(req,res,next){
    order_details.addOrderDetail(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;