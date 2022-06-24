var express=require('express');
var router=express.Router();
var stockmenu=require('../models/stockmenu_table_model');

router.get("/:menu_id",function(req,res,next){
    console.log(req.params.menu_id);
    stockmenu.getDataBYMenuId(req.params.menu_id,function(err,rows){
        console.log(rows);
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

router.post('/',function(req,res,next){
    stockmenu.addData(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.put("/:sm_id",function(req,res,next){
    console.log(req.params.sm_id);
    console.log(req.body);
    stockmenu.updateData(req.params.sm_id,req.body,function(err,rows){
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
