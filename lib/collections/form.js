/*Meteor.startup(function(){
   Meteor.Mailgun.config({
     username: 'postmaster@sandbox7d972d2889ca479aa8e78a4cde4bdedc.mailgun.org',
     password: '0d8f26acd88886ce25da82421632f4d2'
   });
 });

 // In your server code: define a method that the client can call
 Meteor.methods({
   sendEmail: function (mailFields) {
       console.log("about to send email...");
       check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [String]);

       // Let other method calls from the same client start running,
       // without waiting for the email sending to complete.
       this.unblock();

       Meteor.Mailgun.send({
           to: mailFields.to,
           from: mailFields.from,
           subject: mailFields.subject,
           text: mailFields.text,
           html: mailFields.html
       });
       console.log("email sent!");
   }
 });
*/
