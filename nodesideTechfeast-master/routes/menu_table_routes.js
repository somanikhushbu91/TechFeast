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

router.get('/',function(req,res,next){
    menu.getAllData(function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.post('/',upload.single('pic'),function(req,res,next){
    menu.addData(req.body,req.file.filename,function(err,rows){
        if (err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.delete("/:menu_id",function(req,res,next){
    menu.deleteData(req.params.menu_id,function(err,rows){
        if (err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get("/:menu_id",function(req,res,next){
    menu.getDataById(req.params.menu_id,function(err,rows){
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

router.put("/:menu_id",function(req,res,next){
    console.log(req.params.menu_id);
    console.log(req.body);
    menu.updateData(req.params.menu_id,req.body,function(err,rows){
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

// router.put("/:menu_id",upload.single('pic'),function(res,req,next){
//     menu.updateImage(req.params.menu_id,req.file != null ? req.file.filename :null ,function(err,rows){
//         if(err){
//             res.json(err);
//         }
//         else{
//             res.json(rows);
//         }
//     });
// });


module.exports=router;