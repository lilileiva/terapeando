"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
try {
    app_1.default.listen(app_1.default.get('port'));
    console.log('server on port', app_1.default.get('port'));
    (0, db_1.default)();
}
catch (error) {
    console.error(error);
}
