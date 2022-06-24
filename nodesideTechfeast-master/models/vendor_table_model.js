var db = require('../dbconnection');
var vendor = {
    getAllData: function (callback) {
        return db.query('select * from vendor_table', callback);
    },
    getDataById: function (vendor_id, callback) {
        return db.query('select * from vendor_table where vendor_id=?', [vendor_id], callback);
    },
    deleteData: function (vendor_id, callback) {
        return db.query('delete from vendor_table where vendor_id= ?', [vendor_id], callback);
    },
    addData: function (item, callback) {
        //console.log(filename);
        return db.query('insert into vendor_table (vendor_name,vendor_email,mobile_no,password) values(?,?,?,?)', [item.vendor_name, item.vendor_email, item.mobile_no, item.password], callback);
    },
    updateData: function (vendor_id, item, callback) {
        return db.query('update vendor_table set vendor_name=?,vendor_email=?,mobile_no=?,password=? where vendor_id=?', [item.vendor_name, item.vendor_email, item.mobile_no, item.password, vendor_id], callback);
    },
    deleteAll: function (item, callback) {
        return db.query("delete from vendor_table where vendor_id in (?)", [item], callback);
    },
    loginData: function (item, callback) {
        return db.query('select * from vendor_table where vendor_email=? and password=?', [item.vendor_email, item.password], callback)
    },
    getDataByVendorEmail(vendor_email,callback){
        return db.query('select * from vendor_table where vendor_email=?', [vendor_email], callback);
    } 
};
module.exports = vendor;