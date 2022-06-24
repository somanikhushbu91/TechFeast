var express=require('express');
var router=express.Router();
var menu=require('../models/menu_table_model');
var multer=require('multer');
var path=require('path');

var storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,'public/images/menu_images');
    },
    filename:(req,file,cd)=>{
        cd(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
var upload=multer({storage:storage});

router.put('/:menu_id',upload.single('pic'),function(req,res,next){
    menu.updateImage(req.params.menu_id,req.file !=null ? req.file.filename : null,req.body,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;