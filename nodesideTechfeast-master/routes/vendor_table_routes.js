var express=require('express');
var router=express.Router();
var vendor=require('../models/vendor_table_model');
var multer=require('multer');
var path=require('path');

var storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,'public/images/vendor_images');
    },
    filename:(req,file,cd)=>{
        cd(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
var upload=multer({storage:storage});

router.get('/',function(req,res,next){
    vendor.getAllData(function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get("/:vendor_id",function(req,res,next){
    vendor.getDataById(req.params.vendor_id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.post('/',function(req,res,next){
    vendor.addData(req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.put("/:vendor_id",function(req,res,next){
    vendor.updateData(req.params.vendor_id,req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete("/:vendor_id",function(req,res,next){
    vendor.deleteData(req.params.vendor_id,function(err,rows){
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
