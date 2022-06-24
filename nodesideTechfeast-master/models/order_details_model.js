var db=require('../dbconnection');
var order_details={
    getAllData:function(callback)
    {
        return db.query('select od.*,m.*,o.* from order_details_table od,menu_table m,order_table o where od.fk_menu_id=m.menu_id and od.fk_order_id=o.order_id',callback);
    }
};
module.exports=order_details;