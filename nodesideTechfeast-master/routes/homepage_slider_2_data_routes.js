var express = require('express');
var router = express.Router();
var menu = require('../models/menu_table_model');

router.get('/', function (req, res, next) {
    menu.getDataForSlider2(function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;