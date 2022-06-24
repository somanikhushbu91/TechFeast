var db=require('../dbconnection');

var feedback={
    addFeedback(item,callback){
        console.log(item);
        return db.query('insert into feedback_table (Name,Mobile_no,feedback) values(?,?,?)',[item.Name,item.Mobile_no,item.feedback],callback);
    },
    getAllFeedbackCount:function(callback){
        return db.query("SELECT COUNT(*) as 'total' from feedback_table",callback);
    },
    getAllFeedBack:function(callback){
        return db.query("select * from feedback_table",callback);
    },
    deleteData:function(feedback_id,callback)
    {
        return db.query('delete from feedback_table where feedback_id= ?',[feedback_id],callback);
    }
}

module.exports=feedback;