import { Router} from "express";
const { createPayment, getAllPayments, getPaymentByClientId} = require('./paymentHistory.ts');
const { createCheckoutSession } = require('./Stripe/checkout.js')

const paymentHistoryRouter: Router = Router();


paymentHistoryRouter.get('/', getAllPayments)
paymentHistoryRouter.get('/' ,getPaymentByClientId)
paymentHistoryRouter.post('/checkoutpayment' ,createPayment)
paymentHistoryRouter.post('/checkout', createCheckoutSession)

module.exports = paymentHistoryRouter;