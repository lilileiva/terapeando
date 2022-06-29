"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paymentHistory_1 = __importDefault(require("../../models/paymentHistory"));
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPayments = yield paymentHistory_1.default.find();
        res.status(200).json(allPayments);
        console.log(allPayments);
    }
    catch (err) {
        res.status(404).json({ data: err });
    }
});
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, city, country, firstName, lastName, currency, celphone, email, address, psyName, idPsychologist, status } = req.body;
    try {
        const newPayment = new paymentHistory_1.default({
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
        });
        console.log('This is newPayment: ', newPayment);
        yield newPayment.save();
        res.status(201).send({ message: 'Succesfull payment' });
        return newPayment;
    }
    catch (error) {
        res.status(404).send(error);
    }
});
const getPaymentByClientId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield paymentHistory_1.default.find({ idClient: req.user });
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
const getPaymentByPsychologistId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.user;
    try {
        const payment = yield paymentHistory_1.default.find({ idPsychologist: req.user });
        res.status(200).json(payment);
        console.log(payment);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
module.exports = {
    getPaymentByClientId,
    createPayment,
    getAllPayments,
    getPaymentByPsychologistId
};
