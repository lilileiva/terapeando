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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.get('Authorization');
        let token = '';
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.substring(7);
        }
        const decodedToken = yield jwt.verify(token, process.env.SECRETWORD);
        //console.log(decodedToken)
        if (!token || !decodedToken.id || decodedToken.role !== 'Admin') {
            return res.status(401).json({ error: 'token missing or invalid' });
        }
        const { id } = decodedToken;
        req.user = id;
        next();
    }
    catch (error) {
        return res.status(401).send(error);
    }
});
