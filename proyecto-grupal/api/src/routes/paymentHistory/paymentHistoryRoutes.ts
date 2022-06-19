import { Router} from "express";
const { createPayment, getAllPayments, getPaymentByClientId} = require('./paymentHistory.ts');
const { createCheckoutSession } = require('./Stripe/checkout.js')

const paymentHistoryRouter: Router = Router();
const validateClientOrAdmin = require('../../middleware/validateClientOrAdmin')

paymentHistoryRouter.get('/', getAllPayments)
paymentHistoryRouter.get('/', validateClientOrAdmin ,getPaymentByClientId)
paymentHistoryRouter.post('/checkoutpayment', validateClientOrAdmin ,createPayment)
paymentHistoryRouter.post('/checkout', createCheckoutSession)

module.exports = paymentHistoryRouter;