import { Request, Response } from "express";
const { EMAIL, PASS } = process.env;
import userClientModel from "../../models/userClients";
import userPsychologistModel from "../../models/userPsychologist";
const nodemailer = require("nodemailer");

const bcrypt = require("bcryptjs");
import * as crypto from "crypto";

const ForgotPassword = async (req: Request, res: Response) => {

  const { email } = req.body;

  try {

    const user = await userPsychologistModel.find({ "email": email })

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "terapeandoportal@gmail.com",
        pass: "pezufzhvclfbmuti"
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    transporter.verify().then(
      () => {
        console.log('Ready for send email')
      })


    const newPassword = crypto.randomBytes(8).toString('hex')


    try {

      const sendEmail = await transporter.sendMail({
        from: `Terapeando <terapeandoportal@gmail.com>`,
        to: 'sergiosalgado624@gmail.com', // aca va el email que llega por body
        subject: "Recuperación de contraseña Terapeando",
        text: `Hola tu nueva contraseña para iniciar sesión es: ${newPassword}`,
        html: `<strong>Hola! tu nueva contraseña para iniciar sesión es: ${newPassword} </strong><a href= http://localhost:3000/signin>ir a Terapeando</a>`,
        headers: { 'x-myheader': 'test header' }
      }).then(async () => {

        const saltRounds = Number(process.env.SALTROUNDS)

        bcrypt.hash(newPassword, saltRounds, async (error: any, hashedPassword: any) => {

          if (error) {
            res.status(401).json({ msg: 'error hash' });

          } else {

            const update = await userPsychologistModel.findByIdAndUpdate(user[0]._id,
              { password: hashedPassword },
              { new: true });
            res.status(201).send("email sended");

          }
        })
      })

    } catch (error) {
      console.log(error);
      res.status(404).json({ msg: 'email not found' })
    }

  } catch (error) {
    return res.status(404).json({ msg: 'user not found' });

  }
};

// const registerConfirmationEmail = async (req: Request, res: Response) => {
//   const { firstname, lastname, email } = req.body;
//   console.log("email: ", email);
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     //requireTLS: false,
//     auth: {
//       // <------------------
//       user: "terapeandoportal@gmail.com",
//       pass: "pezufzhvclfbmuti",
//     },
//   });

//   transporter.verify().then(() => {
//     console.log("Ready to send emails");
//   });

//   let mailOptions = {
//     from: `Terapeando <terapeandoportal@gmail.com>`,
//     to: `${email}`,
//     subject: "Confirmacion de registro",
//     html: `<h1>Bienvenido ${firstname} ${lastname} a Terapeando!</h1>
//           <p>Ingresa con tu email: ${email} <a href= http://localhost:3000/signin>aqui<a/></p>
//     `,
//     headers: { "x-myheader": "test header" },
//   };

//   await transporter.sendMail(mailOptions, (error: any) => {
//     if (error) {
//       console.log("Hubo un error: ", error);
//     } else {
//       console.log("Email enviado!");
//     }
//   });

//   res.send("Succes");
// };

module.exports = {
  //registerConfirmationEmail,
  ForgotPassword,
};
