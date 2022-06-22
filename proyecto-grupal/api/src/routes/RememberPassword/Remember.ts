import {Request , Response} from "express";
import userPsychologistModel from "../../models/userPsychologist";
import * as nodemailer from "nodemailer";
const bcrypt = require('bcryptjs');
import * as crypto from "crypto";


const ForgotPassword = async (req: Request , res: Response) => {
  
    // const {email} = req.body;

           
    // try { 

        
        
    //     const user = await userPsychologistModel.find({"email": req.body})
    
    //     const transporter = nodemailer.createTransport({
    //         host: "smtp.mailtrap.io",
    //         port: 2525,
    //         auth: {
    //              user: "141410d3f4df36",
    //               pass: "aa94f4bdd30498"
    //               }           
    //         });

            
        
    
    //     const newPassword = crypto.randomBytes(4).toString('hex');
    //     console.log(crypto)
            
            
    //         transporter.sendMail({
    //             from: `Terapeando <i.e 9b701662a9-d663a8+1@inbox.mailtrap.io>`,
    //             to: "sergiosalgado624@gmail.com" ,
    //             subject: "Recuperación de contraseña Terapeando",
    //             text: `Hola tu nueva contraseña para iniciar sesión es: ${newPassword} `,
    //             html:`<strong>Hola! tu nueva contraseña para iniciar sesión es: ${newPassword} </strong><a href= http://localhost:3000/signin>ir a Terapeando</a>`,
    //             headers: {'x-myheader': 'test header'}
    //         }).then(
    //             () =>{
    
    //                 bcrypt.hash(newPassword , 8).then(
    //                      password=> {
                            
    //                         userPsychologistModel.findByIdAndUpdate( user._id ,{password});
    //                     }
    //                 ).then(
    //                     ()=>{
    //                         return res.status(200).json({msg: 'email sended'});
    //                     }
    //                 ).catch(
    //                     (error)=> {
    //                         console.log(error);
    //                         return res.status(404).json({msg: 'user not found'});
    //                     }
    //                 )
    
    //             }
    
    //         ).catch(
    //             ()=>{
    //                 return res.status(404).json({msg: 'Faild to send'});
    //             }
    //         )
    
    // } catch (error) {
    //     return res.status(404).json({msg: 'user not found'});

    // }
    
};

module.exports = {ForgotPassword}