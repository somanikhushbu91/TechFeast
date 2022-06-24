var express=require('express');
var router=express.Router();
var menu=require('../models/menu_table_model');

router.post('/',function(req,res,next){
    menu.getProductRange(req.body,function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports = router;