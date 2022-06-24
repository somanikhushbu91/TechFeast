var db=require('../dbconnection');

var order_details={
    getAllData:function(order_id,callback)
    {
        return db.query('select od.*,m.*,o.* from order_details_table od,menu_table m,order_table o where m.menu_id=od.fk_menu_id and o.order_id=od.fk_order_id and o.order_id',[order_id],callback);
    },
    DeleteData:function(order_details_id,callback)
    {
        console.log(order_details_id);
        return db.query('delete from order_details_table where order_details_id=?',[order_details_id],callback);
    }, 
    deleteAll:function(item,callback){
        return db.query("delete from order_details_table where order_details_id in (?)",[item],callback);
     },
    addOrderDetail:function(item,callback){
         const arr1= [];
         for(let j =0;  j< item.cart.length;j++) {
            var menuid = item.cart[j].menuItem.menu_id;
            var  qty = item.cart[j].Quantity;
            var instruction = item.special_instruction;
            var  orderId= item.fk_order_id;
            arr1.push([menuid, qty, instruction, orderId]);
         }
        console.log(arr1);
        return db.query("insert into order_details_table (fk_menu_id,qty,special_instruction,fk_order_id) values ?",[arr1],callback); 
    },
    getAllData:function(callback)
    {
        return db.query('select od.*,m.*,o.* from order_details_table od,menu_table m,order_table o where od.fk_menu_id=m.menu_id and od.fk_order_id=o.order_id',callback);
    },
    getTopSellingItems:function(callback){
        return db.query("select SUM(od.qty) AS 'total',name from order_details_table od,menu_table m where od.fk_menu_id=m.menu_id GROUP BY name ORDER BY (total) DESC LIMIT 10",callback);
    }
}
module.exports=order_details;