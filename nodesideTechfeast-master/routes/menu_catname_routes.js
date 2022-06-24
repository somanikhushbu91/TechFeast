var express=require('express');
var router=express.Router();
var menu=require('../models/menu_table_model');

router.get("/:fk_cat_id",function(req,res,next){
    menu.getDataByName(req.params.fk_cat_id,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;