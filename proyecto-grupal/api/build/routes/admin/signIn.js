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
const userClients_1 = __importDefault(require("../../models/userClients"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logInAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, adminPassword } = req.body;
    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Email and Password are both required." });
        }
        else {
            let user = yield Admin_1.default.findOne({ email });
            user ? null : user = yield userClients_1.default.findOne({ email });
            const passwordCorrect = user === null ? false : yield bcrypt.compare(password, user.password);
            if (!(user && passwordCorrect)) {
                res.status(401).json({
                    error: "invalid user or password",
                });
            }
            else {
                const userForToken = {
                    id: user._id,
                    role: user.role
                };
                const token = jwt.sign(userForToken, process.env.SECRETWORD, {
                    expiresIn: 60 * 60 * 24 * 7,
                });
                res.send({
                    id: user._id,
                    token
                });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = logInAdmin;
