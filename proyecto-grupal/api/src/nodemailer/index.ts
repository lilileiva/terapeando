// var nodemailer = require('nodemailer');
// const {EMAIL, PASS} = process.env



// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: `${EMAIL}`,
//     pass: `${PASS}`
//   }
// });

// var mailOptions = {
//   from: `${EMAIL}`,
//   to: 'estebanlongo274@gmail.com',
//   subject: 'Sending Email using Node.js',
//   html: '<h1>That was easy!</h1>'
// };

// transporter.sendMail(mailOptions, function(error: any, info: any){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

import nodemailer  from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const nodemailer = require("nodemailer");

async function main() {
    const hostname = "smtp.gmail.com";
    const username = "terapeandohenry@gmail.com";
    const password = "pfhenry1234+";
  
    const transporter = nodemailer.createTransport({
      host: hostname,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: username,
        pass: password,
      },
      logger: true
    });



 // send mail with defined transport object
 const info = await transporter.sendMail({
    from: '"Sender Name" <from@example.net>',
    to: "sergiosalgado624@gmail.com",
    subject: "Hello from node",
    text: "Hello world?",
    html: "<strong>Hello world?</strong>",
    headers: { 'x-myheader': 'test header' }
  });

  console.log("Message sent: %s", info.response);
}


