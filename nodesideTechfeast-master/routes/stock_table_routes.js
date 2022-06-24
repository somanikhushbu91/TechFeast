var express=require('express');
var router=express.Router();
var stock=require('../models/stock_table_model');

router.get('/',function(req,res,next){
    stock.getAllData(function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get("/:title",function(req,res,next){
    stock.getStockByName(req.params.title,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete("/:stock_id",function(req,res,next){
    stock.deleteData(req.params.stock_id,function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.post('/',function(req,res,next){
    stock.addData(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});
 
router.put("/:stock_id/:qty",function(req,res,next){
    console.log(req.params.qty);
    stock.updateStock(req.params.stock_id,req.params.qty,function(err,rows){        
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