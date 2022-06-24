var db=require('../dbconnection');
var stock={
    getAllData:function(callback)
    {
       return db.query('select s.*,v.* from stock_table s,vendor_table v where v.vendor_id=s.fk_vendor_id',callback);
    },
    deleteData:function(stock_id,callback)
    {
        return db.query('delete from stock_table where stock_id= ?',[stock_id],callback);
    },
    addData:function(item,callback)
    {
        return db.query('insert into stock_table (title,stockQty,price,date,fk_vendor_id)values(?,?,?,?,?)',[item.title,item.stockQty,item.price,item.date,item.fk_vendor_id],callback);
    },
    deleteAll:function(item,callback){
        return db.query('delete from stock_table where stock_id in (?)',[item],callback);
    },
    updateStock:function(stock_id,item,callback){
        return db.query('update stock_table set stockQty=? where stock_id=?',[item,stock_id],callback);
    },
    getStockByName:function(title,callback){
        return db.query('select * from stock_table where title like ?',[title],callback);
    },
    updateStock_By_Vendor:function(stock_id,item,callback){
        console.log(item);
        console.log(stock_id);
        return db.query('update stock_table set stockQty=?,price=?,date=?,fk_vendor_id=? where stock_id=?',[item.stockQty,item.price,item.date,item.fk_vendor_id,stock_id],callback);
    }
}
module.exports=stock;