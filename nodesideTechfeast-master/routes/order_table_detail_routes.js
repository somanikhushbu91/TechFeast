var express = require('express');
var router = express.Router();
var order_detail = require('../models/order_table_model')

router.get('/', function (req, res, next) {
    order_detail.getOrderById1(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });

});



module.exports = router;