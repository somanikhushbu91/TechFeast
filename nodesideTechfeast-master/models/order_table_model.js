var db=require('../dbconnection');
var order={
    getAllData:function(callback)
    {
        return db.query('select o.*,e.* from order_table o,employee_table e where o.fk_email_id=e.email_id',callback);
    },
    getAllDataForKitchen:function(callback)
    {
        date1=new Date();
        return db.query('select o.*,e.* from order_table o,employee_table e where o.fk_email_id=e.email_id and (o.status="order" or o.status="processing") and DAY(o.date)=DAY(?) and MONTH(o.date)=MONTH(?)',[date1,date1],callback);
    },
    getMultipleOrderId:function(order_id,callback){
        return db.query('select m.name,m.pic,m.price,m.ingredients,m.is_jain,o.*,od.* from order_table o,order_details_table od,menu_table m where o.order_id=od.fk_order_id and m.menu_id=od.fk_menu_id and o.order_id=?',[order_id],callback);
    },
    getOrderById: function (order_id, callback) {
        return db.query('select * from `order_tbl` where order_id=?', [order_id], callback);
    },
    deletedata:function(order_id,callback){
        return db.query('delete from order_table where order_id=?',[order_id],callback);
    },
    deleteAll:function(item,callback){
        return db.query("delete from order_table where order_id in (?)",[item],callback);
    }, 
    addOrderItem:function(item,callback){
       console.log(item);
        return db.query('insert into order_table  (`order_amt`, `payment_type`, `is_paid`, `discount`, `table_no`, `status`, `date`, `fk_email_id`) values (?,?,?,?,?,?,?,?)',[item.order_amt,item.payment_type,item.is_paid,item.discount,item.table_no,item.status,item.date,item.fk_email_id],callback)
    },
    updateData: function (order_id, item, callback) {
        console.log(item);
        return db.query('update order_table set order_amt=?,payment_type=?,is_paid=?,discount=?,table_no=?,status=?,date=?,fk_email_id=? where order_id=?', [item.order_amt,item.payment_type,item.is_paid,item.discount,item.table_no,item.status,item.date,item.fk_email_id,order_id], callback);
    },
    getMonthlyPayment:function(callback){
        date1=new Date();
        console.log(date1);
        return db.query("SELECT SUM(order_amt) as 'total',payment_type FROM order_table WHERE MONTH(date)=MONTH(?) group by payment_type",[date1],callback);
    },
    getOrderByStatus:function(status,callback){
        console.log(status);
        return db.query("select m.name,m.pic,m.price,m.ingredients,m.is_jain,o.*,od.* from order_table o,order_details_table od,menu_table m where o.order_id=od.fk_order_id and m.menu_id=od.fk_menu_id and o.status=?",[status],callback);
    },
    getDailyOrders:function(callback){
        date1=new Date();
        console.log(date1);
        return db.query("SELECT COUNT(*) as 'total' FROM order_table where DAY(date)=Day(?) and MONTH(date)=Month(?)",[date1,date1],callback)
    },
    getInvoiceByMode:function(mode,callback)
    { 
        console.log("hello");
        date1=new Date();
        console.log(date1);
        return db.query("SELECT SUM(order_amt) as 'total',DAY(?) as 'date' FROM order_table WHERE payment_type=? and DAY(date)=DAY(?) and MONTH(date)=MONTH(?)",[date1,mode,date1,date1],callback);
    },
    getAllMenuidForStock:function(order_id,callback){
        return db.query('select od.fk_menu_id,od.qty from order_table o ,order_details_table od where o.order_id=od.fk_order_id and order_id=?',[order_id],callback);
    },
    getDataForStockDecreseQuantity:function(menu_id,callback){
        return db.query('select s.*,sm.*,m.* from menu_table m,stock_table s,stockmenu_table sm where m.menu_id=sm.fk_menu_id and s.stock_id=sm.fk_stock_id and menu_id=?',[menu_id],callback);
    },
    updatePaymentStatus:function(order_id,callback){
        return db.query('update order_table set is_paid="Yes" where order_id=?',[order_id],callback);
    }
}
module.exports=order; 