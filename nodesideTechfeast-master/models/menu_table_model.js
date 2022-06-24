var db = require('../dbconnection');
var menu = {

    getAllData: function (callback) {
        return db.query('select m.*,c.* from menu_table m,category_table c where c.cat_id=m.fk_cat_id', callback);
    },
    getAllDataForUserSide:function(callback){
        return db.query('select m.*,c.* from menu_table m,category_table c where c.cat_id=m.fk_cat_id GROUP BY m.fk_cat_id', callback);
    },
    getDataById: function (menu_id, callback) {
        return db.query('select * from menu_table where menu_id=?', [menu_id], callback);
    },
    deleteData: function (menu_id, callback) {
        return db.query('delete from menu_table where menu_id= ?', [menu_id], callback);
    },
    addData: function (item, filename, callback) {
        console.log(filename);
        return db.query('insert into menu_table values(?,?,?,?,?,?,?,?,?)', [item.menu_id, item.name, item.discription, item.price, item.fk_cat_id, item.is_jain, item.is_available, item.ingredients, filename], callback);
    },
    updateData: function (menu_id, item, callback) {
        console.log(item);
        return db.query('update menu_table set name=?,discription=?,price=?,fk_cat_id=?,is_jain=?,is_available=?,ingredients=? where menu_id=?', [item.name, item.discription, item.price, item.fk_cat_id, item.is_jain, item.is_available, item.ingredients, menu_id], callback);
    },
    deleteAll: function (item, callback) {
        return db.query("delete from menu_table where menu_id in (?)", [item], callback);
    },
    updateImage: function (menu_id, filename, item, callback) {
        return db.query('update menu_table set pic=? where menu_id=?', [filename != null ? filename : item.pic, menu_id], callback);
    },
    getDataByName: function (fk_cat_id, callback) {
        return db.query('select * from menu_table where fk_cat_id=?', [fk_cat_id], callback);
    },
    getProductRange: function (item, callback) {
        console.log(item);
        return db.query('select * from menu_table where price BETWEEN ? AND ?', [item.startprice, item.endprice], callback);
    },
    getInAscOrder: function (callback) {
        return db.query('SELECT * FROM menu_table ORDER BY name', callback);
    },
    getInDescOrder: function (callback) {
        return db.query('select * from menu_table ORDER BY name DESC', callback)
    },
    getByMinToMaxPrice: function (callback) {
        return db.query('select * from menu_table ORDER BY price', callback);
    },
    getByMaxToMinPrice: function (callback) {
        return db.query('select * from menu_table ORDER BY price DESC', callback);
    },
    getDataForSlider:function(callback){
        return db.query('select * from menu_table GROUP BY fk_cat_id',callback);
    },
    getDataForSlider2:function(callback){
        //return db.query('SELECT * FROM menu_table LIMIT 10',callback);
        //return db.query('select * from menu_table where menu_id BETWEEN 21 AND 30',callback)
        return db.query("select SUM(od.qty) AS 'total',m.* from order_details_table od,menu_table m where od.fk_menu_id=m.menu_id GROUP BY name ORDER BY (total) DESC LIMIT 10",callback);
    },
    CategoryWiseItemSelling(callback)
    {
        date1=new Date();
        return db.query("SELECT SUM(qty) AS 'count' , c.cat_name from order_details_table od,menu_table m,order_table o,category_table c where od.fk_menu_id=m.menu_id and m.fk_cat_id=c.cat_id and o.order_id=od.fk_order_id and MONTH(o.date)=MONTH(?) GROUP BY (c.cat_id)",[date1],callback);
    },
    menuNameWiseSearch:function(name,callback){
        console.log(name);
        return db.query('select * from menu_table where name like ?', ['%'+name+'%'], callback);
    }
};
module.exports = menu;