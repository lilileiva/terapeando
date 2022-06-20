import { Router} from "express";
const { createPayment, getAllPayments, getPaymentByClientId, getPaymentByPsychologistId} = require('./paymentHistory.ts');
const { createCheckoutSession } = require('./Stripe/checkout.js')
const validatePychologist = require ('../../middleware/validatePsychologist')
const validateClient = require ('../../middleware/validateClient')
const validateAdmin = require ('../../middleware/validateAdminToken')

const paymentHistoryRouter: Router = Router();


paymentHistoryRouter.get('/', validateAdmin, getAllPayments)
paymentHistoryRouter.get('/paymentsclient', validateClient, getPaymentByClientId)
paymentHistoryRouter.post('/checkoutpayment' , validateClient, createPayment)
paymentHistoryRouter.post('/checkout', validateClient, createCheckoutSession)
paymentHistoryRouter.get('/paymentspsi', validatePychologist, getPaymentByPsychologistId)

module.exports = paymentHistoryRouter;