import { Request, Response } from "express";
import paymentHistoryModel from "../../models/paymentHistory";



const getPaymentHistory = async (req: Request, res: Response) => {

    const { IdUserPsychologist } = req.params;

    try {

        const getReview = await paymentHistoryModel.findById(IdUserPsychologist);
        res.status(200).send(getReview);

    } catch (error) {
        console.log(error)
    }

};

module.exports = {
    getPaymentHistory
}
