var db=require('../dbconnection');
var charity={
    getAllData:function(callback)
    {
       return db.query('select * from charity_table',callback);
    },
    getDataById:function(charity_id,callback)
    {
        return db.query('select * from charity_table where charity_id=?',[charity_id],callback);
    },
    deleteData:function(charity_id,callback)
    {
        return db.query('delete from charity_table where charity_id= ?',[charity_id],callback);
    },
    addData:function(item,callback)
    {
        return db.query('insert into charity_table (charity_name,location,contact_info,email_id) values (?,?,?,?)',[item.charity_name,item.location,item.contact_info,item.email_id],callback);
    },
    updateData:function(charity_id,item,callback)
    {
        return db.query('update charity_table set charity_name=?,location=?,contact_info=?,email_id=? where charity_id=?',[item.charity_name,item.location,item.contact_info,item.email_id,charity_id],callback)
    },
    deleteAll:function(item,callback){
        return db.query("delete from charity_table where charity_id in (?)",[item],callback);
     }
};
module.exports=charity;