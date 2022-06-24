var db=require('../dbconnection');
var category={
    getAllData:function(callback)
    {
       return db.query('select * from category_table',callback);
    },
    getDataById:function(cat_id,callback)
    {
        return db.query('select * from category_table where cat_id=?',[cat_id],callback);
    },
    deleteData:function(cat_id,callback)
    {
        return db.query('delete from category_table where cat_id= ?',[cat_id],callback);
    },
    addData:function(item,filename,callback)
    {
        console.log(item);
        console.log(filename); 
        return db.query('insert into category_table values (?,?,?)',[item.cat_id,item.cat_name,filename],callback);
    },
    updateData:function(cat_id,item,filename,callback)
    {
        return db.query('update category_table set cat_name=?,Image=? where cat_id=?',[item.cat_name,filename != null ? filename: item.Image,cat_id],callback)
    },
    deleteAll:function(item,callback){
        return db.query("delete from category_table where cat_id in (?)",[item],callback);
    }
};
module.exports=category;