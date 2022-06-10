import { Router} from "express";
const {getPaymentHistory} = require('./paymentHistory.ts');

const paymentHistoryRouter: Router = Router();

paymentHistoryRouter.get('/:IdUserPsychologist', getPaymentHistory)

module.exports = paymentHistoryRouter;