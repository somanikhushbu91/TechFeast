var email = require("emailjs/email");
var charity = {

   sendMail: function (demo, callback) {

      var server = email.server.connect({
         user: 'teachfeast123@gmail.com',
         password: 'tirthakshah',
         host: "smtp.gmail.com",
         ssl: true,
         port: 465
      });
      console.log(demo);

      server.send({
         text: demo.message,
         from: 'teachfeast123@gmail.com',
         to: demo.email_id,
         subject: demo.subject
      }, callback);
   }
}
module.exports = charity;
