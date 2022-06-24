var db=require('../dbconnection');
var user={
    getAllData:function(callback)
    {
       return db.query('select * from employee_table',callback);
    },
    getDataById:function(email_id,callback)
    {
        return db.query('select * from employee_table where email_id=?',[email_id],callback);
    },
    loginData:function(item,callback)
    {
        return db.query('select * from employee_table where email_id=? and password=?',[item.email_id,item.password],callback)
    },
    deleteData:function(email_id,callback)
    {
        return db.query('delete from employee_table where email_id= ?',[email_id],callback);
    },
    addData:function(item,callback)
    {
        return db.query('insert into employee_table values (?,?,?,?,?,?,?,?,?)',[item.email_id,item.password,item.name,item.mobile_no,item.dob,item.address,item.salary,item.joining_date,item.employee_type],callback);
    },
    updateData:function(email_id,item,callback)
    {
        return db.query('update employee_table SET password=?,name=?,mobile_no=?,dob=?,address=?,salary=?,joining_date=?,employee_type=? WHERE email_id=?',[item.password,item.name,item.mobile_no,item.dob,item.address,item.salary,item.joining_date,item.employee_type,email_id],callback)
    },
    deleteAll:function(item,callback){
        return db.query('delete from employee_table where email_id in (?)',[item],callback);
     }
};
module.exports=user;