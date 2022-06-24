var db=require('../dbconnection');
var stockmenu={
    getDataBYMenuId:function(menu_id,callback){
        return db.query('select s.*,sm.* from menu_table m,stock_table s,stockmenu_table sm where m.menu_id=sm.fk_menu_id and s.stock_id=sm.fk_stock_id and menu_id=?',[menu_id],callback)
    },
    addData:function(item,callback)
    {
        return db.query('insert into stockmenu_table (fk_menu_id,fk_stock_id,itemqty)values(?,?,?)',[item.fk_menu_id,item.fk_stock_id,item.itemqty],callback);
    },
    updateData:function(sm_id,item,filename,callback)
    {
        return db.query('update stockmenu_table set fk_menu_id=?,fk_stock_id=?,itemqty=? where sm_id=?',[item.fk_menu_id,item.fk_stock_id,item.itemqty,sm_id],callback)
    },
    deleteAll: function (item, callback) {
        return db.query("delete from stockmenu_table where sm_id in (?)", [item], callback);
    },
}
module.exports=stockmenu;