var express = require('express');
var router = express.Router();
var order_detail=require('../models/order_details_table_model');

router.get('/:order_id', function (req, res, next) {
    
    order_detail.getOrderDetailByOrderID(req.params.order_id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });

});



module.exports = router;