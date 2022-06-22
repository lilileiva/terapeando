import { Request, Response } from "express";
const {EMAIL, PASS} = process.env

const postSendEmail = async (req: Request, res: Response) => {
    const { firstname, lastname, email } = req.body


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${EMAIL}`,
          pass: `${PASS}`
        }
      });
      
      let mailOptions = {
        from: `${EMAIL}`,
        to: 'estebanlongo274@gmail.com',
        subject: 'Sending Email using Node.js',
        html: '<h1>That was easy!</h1>'
      };
      
      const info = await transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    let contentHTML = `
        <h1>User Information</h1>
         <ul> 
            <li>Name: ${firstname} </li>
            <li>Last name: ${lastname} </li>
            <li>Email: ${email} </li>
         </ul>
    `;

    console.log(contentHTML)

    res.send('Succes')
}

module.exports = {
    postSendEmail
  }