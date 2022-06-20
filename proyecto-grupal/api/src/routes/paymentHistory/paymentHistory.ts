import { Request, Response } from "express";
import paymentHistoryModel from "../../models/paymentHistory";

const getAllPayments = async (req: Request, res: Response) => {
    try{
        const allPayments = await paymentHistoryModel.find();
        res.status(200).json(allPayments)
        console.log(allPayments)
    } catch (err) {
        res.status(404).json({ data: err })
    }
}

const createPayment = async (req: Request, res: Response) =>{
    const { amount, city, country, firstName, lastName, currency, celphone, email, address, psyName, idPsychologist, status } = req.body
    try{
        const newPayment =  new paymentHistoryModel({
            idPsychologist: idPsychologist,
            idClient: req.user,
            firstName: firstName,
            lastName: lastName,
            country: country,
            city: city,
            celphone: celphone,
            email: email,
            address: address,
            amount: amount,
            currency: currency,
            psyName: psyName,
            status: status,
        })

        console.log('This is newPayment: ',newPayment)
        await newPayment.save()
        res.status(201).send({message: 'Succesfull payment'})
        return newPayment

    }catch(error){
        res.status(404).send(error);
    }
}



const getPaymentByClientId = async (req: Request, res: Response) => {
    try {
     const payment = await paymentHistoryModel.find({idClient: req.user});
        res.status(200).json(payment);
    
    } catch (error) {
        res.status(404).send(error);
    }
};

const getPaymentByPsychologistId = async (req: Request, res: Response) => {
    req.user
    try{
     const payment = await paymentHistoryModel.find({idPsychologist: req.user});
     res.status(200).json(payment);
     console.log(payment);
    }catch(error){
        res.status(404).send(error);
    }
}

module.exports = {
    getPaymentByClientId,
    createPayment,
    getAllPayments,
    getPaymentByPsychologistId
}
