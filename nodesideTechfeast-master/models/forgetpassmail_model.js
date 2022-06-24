var email = require("emailjs/email");
var forgetpassword = {

   sendMail: function (forgetpassword, callback) {

      var server = email.server.connect({
         user: 'teachfeast123@gmail.com',
         password: 'tirthakshah',
         host: "smtp.gmail.com",
         ssl: true,
         port: 465,
         service:'gmail'
      });
      console.log(forgetpassword);

      server.send({
         text: forgetpassword.message,
         from: 'teachfeast123@gmail.com',
         to: forgetpassword.email_id,
         subject: forgetpassword.subject
      }, callback);
   }
}
module.exports = forgetpassword;
