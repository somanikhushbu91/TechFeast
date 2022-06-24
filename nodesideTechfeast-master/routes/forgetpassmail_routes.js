var express = require('express');
var router = express.Router();
var forgetpassword = require('../models/forgetpassmail_model')

router.post('/',function(req,res,next){
    console.log(req.body)
    forgetpassword.sendMail(req.body,function(err,message){

        if(err)
        {
            console.log(err);
            res.json(err); 
        }
        else
        {
            return res.json({success: true, msg: 'sent'});//or return count for 1 or 0
        }
    });
});

module.exports=router; 