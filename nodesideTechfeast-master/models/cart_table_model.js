var db=require('../dbconnection');
var cart={
    getAllData:function(callback)
    {
        return db.query('select c.*,m.* from cart_table c,menu_table m where m.menu_id=c.fk_menu_id',callback);
    },
    DeleteData:function(cart_id,callback)
    {
        return db.query('delete from cart_table where cart_id=?',[cart_id],callback);
    },
    deleteAll:function(item,callback){
        return db.query("delete from cart_table where cart_id in (?)",[item],callback);
     }
}
module.exports=cart;