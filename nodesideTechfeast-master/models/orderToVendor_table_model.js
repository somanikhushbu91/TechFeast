var db=require('../dbconnection');
var orderToVendor={
    getAllData:function(callback)
    {
        return db.query('select o.*,v.* from order_to_vendor o,vendor_table v where v.vendor_id=o.fk_vendor_id',callback);
    },
    deleteData:function(ven_order_id,callback)
    {
        return db.query('delete from order_to_vendor where ven_order_id= ?',[ven_order_id],callback);
    },
    getDataBynotdelivered:function(callback){
        return db.query('select o.*,v.* from order_to_vendor o,vendor_table v where v.vendor_id=o.fk_vendor_id and is_delivered="Not Delivered"',callback);
    },
    getDataBydelivered:function(callback){
        return db.query('select o.*,v.* from order_to_vendor o,vendor_table v where v.vendor_id=o.fk_vendor_id and is_delivered="Delivered"',callback)
    },
    addData:function(item,callback)
    {
        return db.query('insert into order_to_vendor (order_name,qty,date,special_instruction,fk_vendor_id,amount,price,is_delivered)values(?,?,?,?,?,?,?,?)',[item.order_name,item.qty,item.date,item.special_instruction,item.fk_vendor_id,item.amount,item.price,item.is_delivered],callback);
    },
    deleteAll:function(item,callback){
        return db.query('delete from order_to_vendor where ven_order_id in (?)',[item],callback);
    },
    getDataBynotdeliveredandvendoremail:function(vendor_email,callback){
        return db.query('select o.*,v.* from order_to_vendor o,vendor_table v where v.vendor_id=o.fk_vendor_id and is_delivered="Not Delivered" and v.vendor_email=?',[vendor_email],callback);
    },
    updatePriceAndAmount:function(ven_order_id,item,callback){
        console.log(item);
        return db.query('update order_to_vendor set price=?,amount=? where ven_order_id=?',[item.price,item.amount,ven_order_id,],callback);
    },
    updateStatusOfDelivery:function(ven_order_id,callback){
        return db.query('update order_to_vendor set is_delivered="Delivered" where ven_order_id=?',[ven_order_id],callback);
    }
}
module.exports=orderToVendor;