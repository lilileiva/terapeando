import { Request, Response } from "express";
const { EMAIL, PASS } = process.env;
import userClientModel from "../../models/userClients";
import userPsychologistModel from "../../models/userPsychologist";
var nodemailer = require("nodemailer");

const bcrypt = require("bcryptjs");
import * as crypto from "crypto";

const ForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await userPsychologistModel.find({ email: email });

    const transporter = nodemailer.createTransport({
      // aca tocaria ver como configurar un correo de gmail - hice la prueba con mail trap
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "141410d3f4df36",
        pass: "aa94f4bdd30498",
      },
    });

    const newPassword = crypto.randomBytes(8).toString('hex') // falta hashear la contraseña

    transporter
      .sendMail({
        from: `Terapeando <i.e 9b701662a9-d663a8+1@inbox.mailtrap.io>`,
        to: "sergiosalgado624@gmail.com",
        subject: "Recuperación de contraseña Terapeando",
        text: `Hola tu nueva contraseña para iniciar sesión es: ${newPassword} `,
        html: `<strong>Hola! tu nueva contraseña para iniciar sesión es: ${newPassword} </strong><a href= http://localhost:3000/signin>ir a Terapeando</a>`,
        headers: { "x-myheader": "test header" },
      })
      .then(() => {
        userPsychologistModel.findByIdAndUpdate(
          user[0]._id,
          { password: newPassword },
          { new: true }
        );
        res.send({ msg: "émail sended" });
      })
      .catch(() => {
        return res.status(404).json({ msg: "Failed to send" });
      });
  } catch (error) {
    return res.status(404).json({ msg: "user not found" });
  }
};

const registerConfirmationEmail = async (req: Request, res: Response) => {
  const { firstname, lastname, email } = req.body;
  console.log('email: ', email)
  const transporter = nodemailer.createTransport({
    // aca tocaria ver como configurar un correo de gmail - hice la prueba con mail trap
   // host: "smtp.mailtrap.io", // <------------------
    host: "smtp.gmail.com",
    //service: "gmail",
    //port: 2525,   // <------------------
    port: 465,
    secure: true,
    //requireTLS: false,
      // auth: {   // <------------------
      //   user: "141410d3f4df36",
      //   pass: "aa94f4bdd30498",
      // },
      // auth: {
      //   user: "estebanlongo274@gmail.com",
      //   pass: "voujhdkcdjwnhmgg", pass generada por google
      // },
      auth: {   // <------------------
        user: "terapeandoportal@gmail.com",
        pass: "pezufzhvclfbmuti",
      },
    // auth: {
    //   user: "terapeandoportal@gmail.com",
    //   pass: "C67cA/2},&c<R,x%",
    // },
  });

  transporter.verify().then(() => {
    console.log("Ready to send emails");
  });

  let mailOptions = {
    from: `Terapeando <i.e 9b701662a9-d663a8+1@inbox.mailtrap.io>`,
    to: `${email}`,
    subject: "Confirmacion de registro",
    html: `<h1>Bienvenido ${firstname} ${lastname} a Terapeando!</h1>
          <p>Ingresa con tu email: ${email} <a href= http://localhost:3000/signin>aqui<a/></p>
    `,
    headers: { "x-myheader": "test header" },
  };

  await transporter.sendMail(mailOptions, (error: any) => {
    if (error) {
      console.log("Hubo un error: ", error);
    } else {
      console.log("Email enviado!");
    }
  });

  res.send("Succes");
};

module.exports = {
  registerConfirmationEmail,
  ForgotPassword,
};
