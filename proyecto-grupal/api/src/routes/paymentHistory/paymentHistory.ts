import { Request, Response } from "express";
import paymentHistoryModel from "../../models/paymentHistory";



const getPaymentHistory = async (req: Request, res: Response) => {

    const { idUserPsychologist } = req.params;

    try {

        const getReview = await paymentHistoryModel.find({psychologist:idUserPsychologist});
        res.status(200).send(getReview);

    } catch (error) {
        console.error(error)
    }

};

module.exports = {
    getPaymentHistory
}
