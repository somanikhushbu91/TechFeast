var mysql=require('mysql');

var connection=mysql.createPool({
host:'localhost',
user:'root',
password:'',
database:'admin_tables'
});
module.exports=connection;