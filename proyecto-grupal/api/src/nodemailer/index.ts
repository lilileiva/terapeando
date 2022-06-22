var nodemailer = require('nodemailer');
const {EMAIL, PASS} = process.env


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