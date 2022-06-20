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
const Admin_1 = __importDefault(require("../../models/Admin"));
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, adminPassword } = req.body;
    try {
        if (adminPassword === process.env.OWNER_PASSWORD) {
            const exist = yield Admin_1.default.findOne({ email: email });
            if (exist)
                res.status(200).send("Invalid email or password");
            else {
                const Admin = yield Admin_1.default.create({
                    firstName: firstname,
                    lastName: lastname,
                    email,
                    password,
                    role: "Admin",
                });
                res.status(201).send("Welcome to our community, now you can sign in");
            }
        }
    }
    catch (error) {
        res.status(401).send(error);
    }
});
module.exports = {
    registerAdmin,
};
