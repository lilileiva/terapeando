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
    const { amount, city, country, firstName, lastName, currency, idClient, celphone, email, address, psyName, idPsychologist } = req.body
    try{
        const newPayment =  new paymentHistoryModel({
            idPsychologist: idPsychologist,
            idClient: idClient,
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
    const { clientId } = req.params;
    console.log(clientId)
    try {
     const payment = await paymentHistoryModel.find({idClient: clientId});
     console.log(payment)
        res.status(200).json(payment);

    } catch (error) {
        res.status(404).send(error);
    }
};

module.exports = {
    getPaymentByClientId,
    createPayment,
    getAllPayments
}
