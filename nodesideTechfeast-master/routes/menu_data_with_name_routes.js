var express = require('express');
var router = express.Router();
var menu = require('../models/menu_table_model');

router.get("/:name",function(req,res,next){
    console.log(req.params.name);
    menu.menuNameWiseSearch(req.params.name,function(err,rows){
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