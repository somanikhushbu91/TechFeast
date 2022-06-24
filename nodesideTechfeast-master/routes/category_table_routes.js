var express=require('express');
var router=express.Router();
var category=require('../models/category_table_model');
var multer=require('multer');
var path=require('path');

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/category_images');
    },
    filename:(req,file,cb)=>{ 
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

var upload=multer({storage:storage});


router.get('/',function(req,res,next){
    category.getAllData(function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get("/:cat_id",function(req,res,next){
    category.getDataById(req.params.cat_id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});
 
router.post('/',upload.single('Image'),function(req,res,next){
    category.addData(req.body,req.file.filename,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.put("/:cat_id",upload.single('Image'),function(req,res,next){
    category.updateData(req.params.cat_id,req.body,req.file != null ? req.file.filename : null,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete("/:cat_id",function(req,res,next){
    category.deleteData(req.params.cat_id,function(err,rows){
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